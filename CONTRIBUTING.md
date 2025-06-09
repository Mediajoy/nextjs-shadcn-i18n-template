# Contributing to Next.js + shadcn/ui Template

Thank you for considering contributing to this project! This document outlines the guidelines for contributing to this Next.js + shadcn/ui template.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please:

- Be respectful and considerate in your communication
- Be open to different viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community and the project

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR-USERNAME/nextjs-shadcn-template.git
cd nextjs-shadcn-template
```
3. Add the original repository as a remote to keep your fork in sync:
```bash
git remote add upstream https://github.com/original-owner/nextjs-shadcn-template.git
```
4. Install dependencies:
```bash
npm install
```
5. Create a new branch for your feature or bugfix:
```bash
git checkout -b feature/your-feature-name
```

## Development Workflow

1. Make sure your branch is up to date with the main branch:
```bash
git pull upstream main
```
2. Implement your changes, following the [style guidelines](#style-guidelines)
3. Add, commit, and push your changes:
```bash
git add .
git commit -m "feat: add new feature XYZ"
git push origin feature/your-feature-name
```
4. Create a pull request against the main branch

## Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation as needed
3. Add tests for new features or bugfixes
4. Ensure all tests pass locally
5. Create a detailed PR description explaining:
   - What the PR does
   - Why it's needed
   - Any relevant screenshots
   - Any related issues it addresses
6. Request a review from a maintainer
7. Address any feedback provided by reviewers

## Style Guidelines

### Coding Style

- Follow the existing code style and structure
- Use ESLint and Prettier configurations provided in the project
- Use TypeScript for all new code
- Ensure all code is properly typed with no `any` types unless absolutely necessary

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat: add new feature`
- `fix: resolve issue with component X`
- `docs: update README`
- `style: format code`
- `refactor: restructure component Y`
- `test: add tests for feature Z`
- `chore: update dependencies`

## Testing

- Add tests for new features using Jest and React Testing Library
- Ensure all existing tests pass before submitting a PR
- Run tests with:
```bash
npm test
```

## Documentation

- Update README.md with details of changes to the interface
- Update or add documentation for new features in the `src/app/docs/` directory
- Use clear and concise language in documentation
- Include code examples where appropriate

---

Thank you for contributing to make this project better!
