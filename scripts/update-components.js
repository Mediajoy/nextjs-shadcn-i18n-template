#!/usr/bin/env node

/**
 * This script helps update shadcn/ui components to their latest versions
 * Usage: node scripts/update-components.js
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// List of all available shadcn/ui components
const components = [
  'accordion',
  'alert',
  'alert-dialog',
  'aspect-ratio',
  'avatar',
  'badge',
  'button',
  'calendar',
  'card',
  'checkbox',
  'collapsible',
  'combobox',
  'command',
  'context-menu',
  'dialog',
  'drawer',
  'dropdown-menu',
  'form',
  'hover-card',
  'input',
  'label',
  'menubar',
  'navigation-menu',
  'pagination',
  'popover',
  'progress',
  'radio-group',
  'scroll-area',
  'select',
  'separator',
  'sheet',
  'skeleton',
  'slider',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toast',
  'toggle',
  'toggle-group',
  'tooltip',
];

// Helper functions
function checkComponentExists(componentName) {
  const componentPath = path.join('./src/components/ui', `${componentName}.tsx`);
  return fs.existsSync(componentPath);
}

function updateAllComponents() {
  console.log('Updating all installed components...');
  const installedComponents = components.filter(checkComponentExists);
  
  if (installedComponents.length === 0) {
    console.log('No components found to update.');
    process.exit(0);
  }
  
  console.log(`Found ${installedComponents.length} components to update.`);
  
  installedComponents.forEach(component => {
    try {
      console.log(`Updating ${component}...`);
      execSync(`npx shadcn-ui@latest add ${component} --overwrite`, { stdio: 'inherit' });
      console.log(`✅ ${component} updated successfully.`);
    } catch (error) {
      console.error(`❌ Failed to update ${component}:`, error.message);
    }
  });
}

function updateSpecificComponent(componentName) {
  if (!components.includes(componentName)) {
    console.error(`❌ "${componentName}" is not a valid shadcn/ui component.`);
    console.log('Available components:', components.join(', '));
    process.exit(1);
  }
  
  try {
    console.log(`Updating ${componentName}...`);
    execSync(`npx shadcn-ui@latest add ${componentName} --overwrite`, { stdio: 'inherit' });
    console.log(`✅ ${componentName} updated successfully.`);
  } catch (error) {
    console.error(`❌ Failed to update ${componentName}:`, error.message);
    process.exit(1);
  }
}

// Main CLI interface
console.log('📦 shadcn/ui Component Updater');
console.log('============================');

rl.question('Update all components or specify a component name? (all/component-name): ', (answer) => {
  if (answer.toLowerCase() === 'all') {
    updateAllComponents();
  } else {
    updateSpecificComponent(answer.toLowerCase());
  }
  rl.close();
});
