# Testing & CI/CD Guide

This document provides comprehensive guidance on testing strategies, CI/CD workflows, and development practices for the Boxlog Web project.

## Overview

The project implements a robust testing and continuous integration/deployment (CI/CD) system using:
- **Vitest** for unit and integration testing
- **React Testing Library** for component testing
- **GitHub Actions** for automated CI/CD pipelines
- **ESM modules** for modern JavaScript compatibility

## Testing Infrastructure

### Test Framework Stack

- **Vitest** - Fast unit test runner with native ESM support
- **React Testing Library** - Component testing utilities
- **jsdom** - Browser environment simulation
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom Jest matchers

### Test Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

### Test Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run tests in interactive watch mode |
| `npm run test:run` | Run all tests once (CI mode) |
| `npm run test:ui` | Launch Vitest UI interface |
| `npm run test:watch` | Run tests in watch mode |

## Test Structure

### Current Test Coverage

```
src/components/__tests__/
├── sample.test.tsx          # Basic test setup verification
├── button.test.tsx          # Button component tests
├── theme-toggle.test.tsx    # Theme toggle functionality
└── error-boundary.test.tsx  # Error boundary behavior
```

**Total Test Count**: 17 tests across 4 test files

### Test Categories

#### 1. **Component Tests**
- **Button Component**: Variants, sizes, accessibility, user interactions
- **Theme Toggle**: Theme switching, mounting behavior, accessibility
- **Error Boundary**: Error handling, fallback UI, recovery mechanisms

#### 2. **Integration Tests**
- Component interaction with external libraries (next-themes)
- Error state management and recovery
- User event simulation and responses

#### 3. **Accessibility Tests**
- Proper ARIA attributes
- Keyboard navigation
- Screen reader compatibility

### Writing Tests

#### Best Practices

```typescript
// Example: Component test structure
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ComponentName } from '@/components/ui/component-name'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<ComponentName onClick={handleClick} />)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

#### Testing Guidelines

1. **Test Behavior, Not Implementation**
   - Focus on user-visible behavior
   - Test component outputs and side effects
   - Avoid testing internal state or implementation details

2. **Use Proper Queries**
   - Prefer `getByRole()` over `getByTestId()`
   - Use semantic queries that match user interaction
   - Follow React Testing Library query priority

3. **Mock External Dependencies**
   - Mock third-party libraries when necessary
   - Use `vi.mock()` for module-level mocking
   - Provide realistic mock implementations

4. **Test Accessibility**
   - Verify proper ARIA attributes
   - Test keyboard navigation
   - Ensure screen reader compatibility

## CI/CD Pipeline

### Workflow Overview

The project uses three main GitHub Actions workflows:

#### 1. **CI Workflow** (`ci.yml`)
**Triggers**: Push to `dev`/`main`, Pull Requests to `dev`/`main`

**Jobs**:
- **Test Job** (Node.js 18.x & 20.x matrix)
  - Install dependencies (`npm ci`)
  - Run linting (`npm run lint`)
  - Run type checking (`npm run type-check`)
  - **Run Vitest tests** (`npm run test:run`)
  - Build application (`npm run build`)

- **Lighthouse Job** (after tests pass)
  - Performance auditing
  - SEO analysis
  - Best practices verification

- **Accessibility Job** (after tests pass)
  - WCAG compliance checking
  - Screen reader compatibility
  - Color contrast validation

- **Performance Job** (after tests pass)
  - Bundle size analysis
  - Core Web Vitals measurement
  - Performance regression detection

#### 2. **Deploy Workflow** (`deploy.yml`)
**Triggers**: Push to `main` branch, Manual dispatch

**Jobs**:
- **Deploy Job**
  - Production build preparation
  - Vercel deployment
  - Environment configuration

- **Post-Deploy Job**
  - Production environment testing
  - Lighthouse audit on live site
  - Accessibility validation

#### 3. **PR Preview Workflow** (`pr-preview.yml`)
**Triggers**: Pull Request events (opened, synchronized, reopened)

**Jobs**:
- **Preview Job**
  - Build preview version
  - Deploy to Vercel preview environment
  - Comment PR with preview URL

### Automated Quality Gates

#### Test Requirements
- All Vitest tests must pass (17/17)
- TypeScript compilation must succeed
- ESLint must pass with no errors
- Build process must complete successfully

#### Performance Requirements
- Lighthouse performance score > 90
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1

#### Accessibility Requirements
- WCAG 2.1 AA compliance
- Color contrast ratio > 4.5:1
- Keyboard navigation support
- Screen reader compatibility

### Branch Protection Rules

#### For `main` branch:
- Require PR reviews
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes to specific roles

#### For `dev` branch:
- Require status checks to pass
- Allow merge commits and squash merging
- Automatic deployment to staging environment

## Development Workflow

### 1. **Local Development**

```bash
# Start development server
npm run dev

# Run tests in watch mode
npm run test

# Run full quality check
npm run lint && npm run type-check && npm run test:run && npm run build
```

### 2. **Feature Development**

```bash
# Create feature branch
git checkout -b feat/your-feature-name

# Implement feature with tests
# Run local tests
npm run test:run

# Commit changes
git add .
git commit -m "feat: add your feature description"

# Push and create PR
git push origin feat/your-feature-name
```

### 3. **Pull Request Process**

1. **Create PR** targeting `dev` branch
2. **Automated Checks** run automatically:
   - CI pipeline executes all tests
   - Preview deployment created
   - Quality gates evaluated
3. **Code Review** by team members
4. **Merge** after approval and successful checks

### 4. **Release Process**

1. **Feature Complete** on `dev` branch
2. **Create Release PR** from `dev` to `main`
3. **Production Testing** in staging environment
4. **Deploy to Production** via merge to `main`
5. **Post-Deploy Verification** via automated tests

## Monitoring and Maintenance

### Test Maintenance

#### Regular Tasks
- **Weekly**: Review test coverage reports
- **Monthly**: Update testing dependencies
- **Per Release**: Add integration tests for new features
- **Quarterly**: Performance test review and optimization

#### Test Expansion Areas
1. **API Integration Tests**
   - Route handler testing
   - Database integration
   - External service mocking

2. **E2E Tests** (Future)
   - User journey testing
   - Cross-browser compatibility
   - Mobile responsiveness

3. **Visual Regression Tests** (Future)
   - Component visual consistency
   - Theme switching verification
   - Responsive design validation

### CI/CD Monitoring

#### Key Metrics
- **Build Success Rate**: Target 95%+
- **Test Execution Time**: Target <2 minutes
- **Deployment Frequency**: Track and optimize
- **Recovery Time**: Monitor incident response

#### Alerting
- Failed builds notify development team
- Performance regressions trigger alerts
- Security vulnerabilities block deployments
- Accessibility issues prevent merges

## Troubleshooting

### Common Issues

#### 1. **Test Failures in CI**
```bash
# Check local test execution
npm run test:run

# Verify ESM compatibility
node --version  # Should be 18.x or 20.x

# Check dependency installation
rm -rf node_modules package-lock.json
npm install
```

#### 2. **Build Failures**
```bash
# Verify TypeScript compilation
npm run type-check

# Check for ESLint errors
npm run lint

# Verify all dependencies
npm audit --audit-level=moderate
```

#### 3. **ESM Module Issues**
- Ensure `"type": "module"` in `package.json`
- Use ES import/export syntax in config files
- Check `vitest.config.ts` path resolution

#### 4. **Flaky Tests**
- Use `user.setup()` for user events
- Properly mock external dependencies
- Add appropriate `waitFor()` for async operations

### Getting Help

#### Documentation Resources
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [GitHub Actions](https://docs.github.com/en/actions)

#### Internal Resources
- `CLAUDE.md` - Project overview and commands
- `docs/DESIGN_SYSTEM.md` - Component guidelines
- `docs/PERFORMANCE_GUIDE.md` - Optimization strategies

## Future Roadmap

### Short Term (1-2 months)
- [ ] Expand component test coverage to 90%+
- [ ] Add API route integration tests
- [ ] Implement visual regression testing
- [ ] Set up performance budgets

### Medium Term (3-6 months)
- [ ] Full E2E test suite with Playwright
- [ ] Automated security scanning
- [ ] Multi-environment testing (staging/prod)
- [ ] Test result analytics dashboard

### Long Term (6+ months)
- [ ] AI-powered test generation
- [ ] Chaos engineering practices
- [ ] Advanced performance monitoring
- [ ] Cross-platform testing automation

---

*This guide is maintained alongside the codebase. For questions or improvements, please create an issue or submit a pull request.*