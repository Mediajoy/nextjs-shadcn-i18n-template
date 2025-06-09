/**
 * Performance monitoring utility for Next.js applications
 * 
 * Use this to track key metrics in your application such as:
 * - Page load times
 * - API response times
 * - Component render times
 * - Long tasks
 */

type PerformanceMetric = {
  name: string;
  value: number;
  timestamp: number;
  labels?: Record<string, string>;
};

type PerformanceMonitorOptions = {
  debug?: boolean;
  sampleRate?: number;
  reportTo?: string;
};

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private options: PerformanceMonitorOptions;
  private static instance: PerformanceMonitor;

  private constructor(options: PerformanceMonitorOptions = {}) {
    this.options = {
      debug: options.debug || process.env.NODE_ENV === 'development',
      sampleRate: options.sampleRate || 1.0, // 100% by default
      reportTo: options.reportTo || '/api/telemetry',
    };

    // Initialize performance observers if in browser
    if (typeof window !== 'undefined') {
      this.initPerformanceObservers();
    }
  }

  public static getInstance(options?: PerformanceMonitorOptions): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor(options);
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Track a custom performance metric
   * 
   * @param name Metric name
   * @param value Metric value (usually duration in ms)
   * @param labels Optional key-value pairs for additional context
   */
  public trackMetric(name: string, value: number, labels?: Record<string, string>): void {
    // Apply sampling
    if (Math.random() > this.options.sampleRate) {
      return;
    }

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      labels,
    };

    this.metrics.push(metric);
    
    if (this.options.debug) {
      console.log(`[Performance] ${name}: ${value}ms`, labels || '');
    }
  }

  /**
   * Start timing an operation
   * 
   * @param name Operation name
   * @returns Function to call when operation completes
   */
  public startTimer(name: string, labels?: Record<string, string>): () => void {
    const startTime = performance.now();
    
    return () => {
      const duration = Math.round(performance.now() - startTime);
      this.trackMetric(name, duration, labels);
    };
  }

  /**
   * Initialize web performance observers
   */
  private initPerformanceObservers(): void {
    // Observe page load metrics
    if ('PerformanceObserver' in window) {
      // Track largest contentful paint
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (lastEntry) {
            this.trackMetric('lcp', lastEntry.startTime, { 
              url: window.location.pathname 
            });
          }
        });
        
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        if (this.options.debug) {
          console.warn('LCP observer failed to initialize', e);
        }
      }
      
      // Track first input delay
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          
          for (const entry of entries) {
            this.trackMetric('fid', entry.processingStart - entry.startTime, {
              url: window.location.pathname
            });
          }
        });
        
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        if (this.options.debug) {
          console.warn('FID observer failed to initialize', e);
        }
      }
      
      // Track cumulative layout shift
      try {
        let clsValue = 0;
        let clsEntries: PerformanceEntry[] = [];
        
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          
          for (const entry of entries) {
            // Cast to any because TypeScript doesn't have the type
            const entryAny = entry as any;
            if (!entryAny.hadRecentInput) {
              const value = entryAny.value;
              clsValue += value;
              clsEntries.push(entry);
              
              this.trackMetric('cls_increment', value, {
                url: window.location.pathname
              });
            }
          }
          
          // Report final CLS when page is hidden or unloaded
          window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
              this.trackMetric('cls_final', clsValue, {
                url: window.location.pathname,
                entries: clsEntries.length.toString()
              });
            }
          }, { once: true });
        });
        
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        if (this.options.debug) {
          console.warn('CLS observer failed to initialize', e);
        }
      }
    }

    // Track page load events
    window.addEventListener('load', () => {
      // Use setTimeout to ensure this runs after other load handlers
      setTimeout(() => {
        if (performance && performance.timing) {
          const { navigationStart, loadEventEnd } = performance.timing;
          this.trackMetric('page_load', loadEventEnd - navigationStart, {
            url: window.location.pathname
          });
        }
      }, 0);
    });
  }

  /**
   * Send metrics to the server
   * Automatically batches metrics and sends periodically
   */
  public sendMetrics(): void {
    if (this.metrics.length === 0 || typeof window === 'undefined') {
      return;
    }

    const metrics = [...this.metrics];
    this.metrics = [];

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        this.options.reportTo as string,
        JSON.stringify({ metrics })
      );
    } else {
      fetch(this.options.reportTo as string, {
        method: 'POST',
        body: JSON.stringify({ metrics }),
        headers: {
          'Content-Type': 'application/json',
        },
        // Use keepalive to ensure the request completes even if the page is unloaded
        keepalive: true,
      }).catch(err => {
        if (this.options.debug) {
          console.error('Failed to send metrics:', err);
        }
      });
    }
  }
}

// Export a singleton instance
export const performance = PerformanceMonitor.getInstance();

// Set up metrics sending when page is hidden or unloaded
if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      performance.sendMetrics();
    }
  });

  window.addEventListener('pagehide', () => {
    performance.sendMetrics();
  });
}

/**
 * React hook for measuring component render time
 * 
 * @example
 * const Component = () => {
 *   usePerformanceMonitor('MyComponent');
 *   // Your component code...
 * };
 */
export function usePerformanceMonitor(componentName: string): void {
  if (typeof window === 'undefined') return;
  
  const renderStartTime = performance.now();
  
  // We'll use an effect to mark the render as complete
  React.useEffect(() => {
    const renderTime = Math.round(performance.now() - renderStartTime);
    performance.trackMetric(`component_render.${componentName}`, renderTime, {
      component: componentName,
      url: window.location.pathname
    });
  }, [componentName]);
}
