# Next.js + shadcn/ui Enterprise Template

A production-grade template for building robust web applications with Next.js 14, TypeScript, and shadcn/ui components. This template prioritizes compatibility, maintainability, and real-world functionality.

## 🚀 Features

- ⚡ Next.js 14 with App Router
- 🎨 shadcn/ui components
- 🛠 TypeScript
- 🎨 Tailwind CSS with CSS variables
- 🔄 React Hook Form with Zod validation
- 📝 Server Actions for form handling
- 📱 Responsive design with mobile-friendly navigation
- 🔍 SEO optimized
- 🌓 Dark/light theme support with theme toggle
- 🌐 Internationalization with multiple languages (English, Spanish)
- 🔎 Search functionality and results page
- 📝 Comprehensive documentation
- 📊 Dashboard demo with data visualization
- 🚀 Optimized for production

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS + shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Context
- **Icons**: Lucide React
- **Type Checking**: TypeScript
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Database**: Prisma (optional)
- **Authentication**: NextAuth.js
- **Internationalization**: Custom i18n solution with next-intl

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nextjs-shadcn-template.git
   cd nextjs-shadcn-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables in `.env.local`

4. **Run migrations (if using database)**
   ```bash
   npx prisma migrate dev
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗 Project Structure

```
src/
  /app
    /api               # API routes
      /forms          # Form submission API routes
      /upload         # File upload API routes
    /(auth)            # Authentication routes
    /dashboard         # Dashboard demo with data visualization
    /docs              # Documentation pages with tabs
    /getting-started   # Getting started guide
    /search            # Search results page
    /form              # Form demo page
    /upload            # File upload demo page
    /email             # Email demo page
    /database          # Database demo page
    /error.tsx         # Error boundary
    /loading.tsx       # Loading state
    /not-found.tsx     # 404 page
    /layout.tsx        # Root layout with ThemeProvider
    /page.tsx          # Home page
    /globals.css       # Global styles
  /components          # Reusable components
    /ui               # shadcn/ui components
      /code-block     # Syntax highlighting component
    /forms            # Form components with validation
    /layout           # Layout components (header, footer)
    /theme            # Theme components for dark/light mode
    /search.tsx       # Reusable search component
  /lib                # Utility functions
    /database.ts      # Database client singleton
    /email.ts         # Email utilities
    /utils.ts         # General utilities
    /validations.ts   # Zod schemas
  /middleware.ts      # Authentication middleware
  /types              # TypeScript types
  /scripts            # Helper scripts
  /public             # Static files
  /prisma             # Database schema
  /tests              # Test files
  /.github            # GitHub templates and workflows
```

## 📝 Form Handling

This template uses React Hook Form with Zod for type-safe form validation. Example form components are provided in `src/components/forms`.

### Key Features:
- Type-safe form validation with Zod
- Form error handling
- File upload support
- Conditional field validation
- Form state management

## 🎨 Theming

The template supports light and dark mode using `next-themes`. The theme is implemented through:

- **ThemeProvider**: Wraps your application in `src/components/theme/theme-provider.tsx`
- **ThemeToggle**: Button component in the site header for switching themes
- **CSS Variables**: Theme colors defined in Tailwind CSS configuration
- **Persistent Theme**: User preference is saved in local storage

## 🌐 Internationalization

The template includes a comprehensive internationalization system:

- **Multiple Languages**: Support for English and Spanish (easily extendable)
- **Translation Files**: JSON-based translation files for all UI text
- **Language Switcher**: Component for changing the application language
- **Client Hooks**: Simple `useTranslation` hook for accessing translations
- **Server Utilities**: Server-side translation capabilities
- **Route-Based i18n**: Example middleware for internationalized routing
- **Example Page**: Visit `/dashboard/i18n-example` for a live demonstration

## 🧪 Testing

Run tests with:
```bash
npm test
```

### Testing Checklist:
- [ ] Form submission with all field types
- [ ] Conditional field rendering
- [ ] File upload functionality
- [ ] Form validation (client & server)
- [ ] Responsive design on mobile/desktop
- [ ] Error handling for all scenarios
- [ ] Database operations (if implemented)

## 🚀 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fnextjs-shadcn-template)

### Environment Variables
Ensure these are set in your deployment:
```
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=your-production-url
DATABASE_URL=your-database-url
```

## 🔧 Troubleshooting

### Common Issues

1. **Styles Not Loading**
   - Ensure `tailwind.config.js` includes all shadcn paths
   - Check for proper PostCSS configuration

2. **TypeScript Errors**
   - Ensure all types are properly imported
   - Check for type conflicts in form components

3. **Form Validation Issues**
   - Verify Zod schemas are properly defined
   - Check for proper error handling in form components

## 📚 Documentation

### Built-in Documentation

- **Docs Page**: Visit `/docs` for comprehensive documentation with tab navigation
- **Getting Started**: Visit `/getting-started` for detailed setup instructions
- **Component Examples**: Working examples of all included components
- **Internationalization**: See [internationalization.md](docs/internationalization.md) for i18n implementation details

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Next-themes](https://github.com/pacocoursey/next-themes)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- [EmailJS](https://www.emailjs.com/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please check our [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📝 IDE Configuration

For optimal development experience, add this to your VS Code settings:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "emmet.includeLanguages": {
    "typescript": "html",
    "javascript": "html"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "['\"`]([^'\"`]*).*?['\"`]"],
    ["cn\\(([^)]*)\\)", "['\"`]([^'\"`]*).*?['\"`]"],
  ]
}
```

## 🔍 Development Notes

### Best Practices

- Always use uncontrolled inputs for file uploads with React Hook Form
- Use `.refine()` or `.superRefine()` for conditional validation in Zod schemas
- Configure CORS for EmailJS in production
- Use singleton instances for database connections in Next.js
- Wrap toast notifications with a provider in the root layout
- Implement both client and server-side validation for file uploads

### Helper Scripts

- **Update Components**: Use `npm run update-components` to easily update shadcn/ui components
- **Type Check**: Run `npm run typecheck` to check TypeScript errors

### GitHub Workflow

This template includes:
- CI workflow with linting, type checking, and testing
- Issue templates for bug reports and feature requests
- Pull request templates
- Contributing guidelines
