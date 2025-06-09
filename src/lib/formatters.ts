/**
 * Utility functions for formatting dates, numbers, currencies, etc.
 */

import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Format a date in a human-readable format
 * 
 * @param date Date to format
 * @param formatStr Optional format string (defaults to MMM d, yyyy)
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number | null | undefined,
  formatStr = 'MMM d, yyyy'
): string {
  if (!date) return 'N/A';

  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  
  if (!isValid(dateObj)) return 'Invalid date';
  
  try {
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Error';
  }
}

/**
 * Format a date as a relative time (e.g., "2 days ago")
 * 
 * @param date Date to format
 * @param addSuffix Whether to add a suffix (defaults to true)
 * @returns Relative time string
 */
export function formatRelativeTime(
  date: Date | string | number | null | undefined,
  addSuffix = true
): string {
  if (!date) return 'N/A';

  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  
  if (!isValid(dateObj)) return 'Invalid date';
  
  try {
    return formatDistanceToNow(dateObj, { addSuffix });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Error';
  }
}

/**
 * Format a number with thousands separators
 * 
 * @param num Number to format
 * @param maximumFractionDigits Maximum fraction digits
 * @returns Formatted number string
 */
export function formatNumber(
  num: number | null | undefined,
  maximumFractionDigits = 0
): string {
  if (num === null || num === undefined) return 'N/A';
  
  try {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits,
    }).format(num);
  } catch (error) {
    console.error('Number formatting error:', error);
    return String(num);
  }
}

/**
 * Format a number as currency
 * 
 * @param amount Amount to format
 * @param currency Currency code (defaults to USD)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency = 'USD'
): string {
  if (amount === null || amount === undefined) return 'N/A';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return String(amount);
  }
}

/**
 * Format a percentage
 * 
 * @param value Value to format as percentage
 * @param maximumFractionDigits Maximum fraction digits
 * @returns Formatted percentage string
 */
export function formatPercent(
  value: number | null | undefined,
  maximumFractionDigits = 1
): string {
  if (value === null || value === undefined) return 'N/A';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits,
    }).format(value);
  } catch (error) {
    console.error('Percentage formatting error:', error);
    return String(value);
  }
}

/**
 * Format a file size in bytes to a human-readable format
 * 
 * @param bytes Bytes to format
 * @returns Human-readable file size
 */
export function formatFileSize(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined) return 'N/A';
  
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Truncate a string if it's longer than the specified length
 * 
 * @param str String to truncate
 * @param length Maximum length before truncating
 * @param ending String to append when truncated (defaults to "...")
 * @returns Truncated string
 */
export function truncateText(
  str: string | null | undefined,
  length = 30,
  ending = '...'
): string {
  if (!str) return '';
  
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  
  return str;
}
