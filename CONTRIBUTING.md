# Contributing Guidelines

Thank you for your interest in contributing to **react-cache-refresh**! We welcome contributions from everyone and appreciate your help in making this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/your-username/react-cache-refresh.git
   cd react-cache-refresh
   ```

3. Add the original repository as upstream:

   ```bash
   git remote add upstream https://github.com/aravindkarteekr/react-cache-refresh.git
   ```

## Development Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Git

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

### Project Structure

```text
src/
├── cache-buster.ts    # Main cache busting functionality
├── index.ts          # Main entry point
└── utils.ts          # Utility functions

test-app/             # Test application for development
├── src/
└── public/
```

## How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **Bug fixes**: Fix issues and improve stability
- **Features**: Add new functionality
- **Documentation**: Improve or add documentation
- **Performance**: Optimize existing code
- **Tests**: Add or improve test coverage

### Before You Start

1. Check the [issues](https://github.com/aravindkarteekr/react-cache-refresh/issues) to see if your bug/feature is already being tracked
2. For major changes, please open an issue first to discuss the proposed changes
3. Make sure your changes align with the project's goals and scope

## Pull Request Process

1. **Create a branch** for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:

   ```bash
   npm run build
   # Test in the test-app if applicable
   ```

4. **Commit your changes** with a clear message:

   ```bash
   git commit -m "feat: add new cache invalidation strategy"
   # or
   git commit -m "fix: resolve memory leak in cache cleanup"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with:
   - Clear title and description
   - Reference any related issues
   - Include screenshots/examples if applicable
   - List any breaking changes

### Commit Message Convention

We follow conventional commits format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Provide proper type annotations
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Follow existing code patterns in the project
- Keep functions small and focused
- Add comments for complex logic

### Example Code Style

```typescript
// Good
export const clearCache = (options: CacheOptions): Promise<void> => {
  const { timeout = 5000, force = false } = options;

  if (force) {
    // Force clear all cache types
    return forceClearCache(timeout);
  }

  return standardClearCache(timeout);
};

// Avoid
export const clearCache = (options: any) => {
  // Implementation without proper typing
};
```

## Testing

### Running Tests

Currently, the project uses a test application for manual testing:

```bash
cd test-app
npm install
npm run dev
```

### Adding Tests

We encourage adding tests for new features:

1. Test your changes in the test-app
2. Verify functionality across different browsers
3. Test edge cases and error scenarios

## Documentation

### README Updates

If your changes affect usage:

1. Update the main README.md
2. Include code examples
3. Update API documentation
4. Add troubleshooting notes if applicable

### Code Documentation

- Add JSDoc comments for public APIs
- Include usage examples in comments
- Document any complex algorithms or logic

## Reporting Issues

When reporting issues, please include:

1. **Description**: Clear description of the problem
2. **Steps to reproduce**: Minimal steps to reproduce the issue
3. **Expected behavior**: What you expected to happen
4. **Actual behavior**: What actually happened
5. **Environment**: Browser, Node.js version, etc.
6. **Code sample**: Minimal code that demonstrates the issue

### Issue Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Environment:**

- Browser: [e.g. Chrome, Firefox]
- Version: [e.g. 1.0.1]
- Node.js: [e.g. 18.0.0]
```

## Feature Requests

For feature requests:

1. Search existing issues to avoid duplicates
2. Describe the problem you're trying to solve
3. Explain your proposed solution
4. Consider alternative solutions
5. Provide use cases and examples

## Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Open a new issue with the "question" label
3. Contact the maintainers

## Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file (if we create one)
- Release notes for significant contributions
- GitHub contributors section

Thank you for contributing to react-cache-refresh! 🚀
