# Project Rules - Next.js with shadcn/ui Template

This document outlines the rules and best practices to follow when developing this template.

## CRITICAL SETUP RULES

1. **ALWAYS use Next.js 14.x** - Version 15 has known compatibility issues with shadcn
2. **Initialize project first, then add shadcn** - Never use create-next-app with shadcn templates
3. **Use npm, not yarn/pnpm/bun** - Better compatibility with shadcn dependencies
4. **Install dependencies in correct order** - Follow the exact sequence in instructions.txt

## COMPATIBILITY & VERSION REQUIREMENTS
- **Next.js**: Use version 14.x (NOT 15.x due to compatibility issues)
- **React**: Use version 18.x (avoid React 19 for now)
- **Node.js**: Use version 18.x or 20.x
- **Package Manager**: Use npm (avoid bun/pnpm for better compatibility)
- **TypeScript**: Enable TypeScript for better development experience

## Code Structure

1. **Organized File Structure**:
   - Group related components by functionality
   - Use feature-based organization for routes
   - Keep utilities and helpers in separate directories
   - Follow Next.js App Router conventions

2. **Component Architecture**:
   - Use the shadcn/ui component library for UI elements
   - Create wrapper components for complex UI interactions
   - Implement proper prop typing and validation
   - Use React Context for global state management

3. **Form Handling**:
   - Use React Hook Form with Zod validation
   - Break down Zod schemas into smaller, reusable pieces
   - Implement proper error handling and feedback
   - Use uncontrolled inputs for file uploads

## Styling

1. **Tailwind CSS**:
   - Follow shadcn/ui styling conventions
   - Ensure tailwind.config.js includes all shadcn paths
   - Use CSS variables for theming
   - Implement responsive design for all components

## TypeScript

1. **Type Safety**:
   - Use proper typing for all variables, props, and state
   - Implement type guards where necessary
   - Create reusable type definitions
   - Use proper typing for FileList and uncontrolled inputs

## Error Handling

1. **Robust Error Handling**:
   - Implement error boundaries for component failures
   - Provide meaningful error messages
   - Handle form validation errors gracefully
   - Implement fallback UI for failed network requests

## Performance

1. **Optimization**:
   - Implement proper code splitting
   - Use Next.js Image component for image optimization
   - Lazy load non-critical components
   - Minimize bundle size with proper imports

## Testing

1. **Comprehensive Testing**:
   - Write unit tests for utility functions
   - Implement integration tests for form submissions
   - Test responsive design across multiple viewport sizes
   - Verify form validation logic works correctly

## Deployment

1. **Production Readiness**:
   - Document all environment variables
   - Implement build optimization settings
   - Configure proper CORS settings
   - Verify SEO metadata is correctly configured

## Database Connections

1. **Best Practices**:
   - Use singleton instances for database connections
   - Implement connection pooling
   - Proper error handling for database operations
   - Close connections when no longer needed

## Email Integration

1. **Email Service**:
   - Configure CORS for EmailJS in production
   - Implement proper error handling for failed email sends
   - Validate email templates

## File Uploads

1. **File Handling**:
   - Implement both client and server-side validation
   - Use proper typing for FileList
   - Handle upload progress indicators
   - Implement file size and type restrictions

## Notifications

1. **Toast Notifications**:
   - Wrap toast notifications with a provider in the root layout
   - Provide meaningful feedback
   - Implement proper dismissal functionality

## Summary of Common Issues to Avoid

1. Styles not applying correctly after shadcn installation
2. TypeScript errors with file input types
3. Zod schemas becoming unmanageable
4. Improper file upload handling
5. Missing database connection optimization
6. Toasts not appearing due to missing provider
