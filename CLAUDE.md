# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler without emitting files

### Testing & Quality Assurance
- `npm run test` - Run tests in interactive mode with Vitest
- `npm run test:ui` - Run tests with Vitest UI interface
- `npm run test:run` - Run tests once (CI mode)
- `npm run test:watch` - Run tests in watch mode

### Analysis & Optimization
- `npm run analyze` - Run bundle analyzer (requires ANALYZE=true env var)
- `npm run build:production` - Production build with NODE_ENV=production
- `npm run test:lighthouse` - Run Lighthouse CI performance tests

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router and Server Components
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui + Radix UI primitives for component library
- **Content**: MDX for blog posts, docs, and releases
- **Internationalization**: next-intl with English and Japanese locales
- **Theme**: next-themes with system/dark/light mode support
- **Testing**: Vitest with React Testing Library for unit and integration tests

### Key Features
- **Performance**: Bundle splitting, image optimization, Core Web Vitals monitoring
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive a11y components
- **Security**: CSP headers, security middleware, input validation
- **SEO**: Structured data, meta tags, sitemap generation
- **PWA**: Service Worker, offline capabilities
- **CI/CD**: GitHub Actions with automated testing, building, and deployment

### Directory Structure
```
src/
├── app/                    # Next.js App Router (pages & API routes)
├── components/
│   ├── accessibility/      # A11y components (focus, screen reader support)
│   ├── analytics/         # GA4, Core Web Vitals tracking
│   ├── performance/       # Code splitting, lazy loading
│   ├── layout/           # Header, Footer
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
├── middleware.ts         # Security headers & i18n routing
├── test/                 # Test setup and configuration
└── types/               # TypeScript type definitions
```

### Content Management
- **MDX Files**: Located in `content/` directory
- **Supported Types**: blog posts, docs, releases
- **Frontmatter**: Includes title, description, tags, dates, category
- **Processing**: Uses next-mdx-remote with remark-gfm and rehype-highlight

### Internationalization
- **Locales**: `en` (English), `jp` (Japanese)
- **Translation System**: Dictionary-based with `getDictionary()` function
- **Routing**: Dynamic locale routing with `/[locale]/*` structure
- **Auto-detection**: Accept-Language header parsing with cookie persistence
- **SEO**: Complete hreflang, OpenGraph, and sitemap multilingual support
- **Configuration**: Handled via `src/lib/i18n.ts`

### Development Patterns
- **Component Organization**: Grouped by feature/domain
- **TypeScript**: Strict mode with comprehensive type definitions
- **Error Handling**: Error boundaries and graceful degradation
- **Testing**: Vitest for unit tests, accessibility and performance testing integrated

## Important Notes

### Code Style
- Uses TypeScript strict mode - all types must be properly defined
- Tailwind CSS with utility-first approach
- Component-based architecture with clear separation of concerns
- Accessibility-first development with WCAG 2.1 AA compliance

### Content Guidelines
- All MDX content must include proper frontmatter
- Images should use optimized formats (WebP/AVIF)
- All new pages automatically support both English and Japanese via `/[locale]/*` structure
- Translation keys must be added to `src/lib/i18n.ts` dictionary
- Blog posts and docs support code highlighting and GFM

### Creating New Multilingual Pages
1. Create page at `src/app/[locale]/page-name/page.tsx`
2. Add `generateMetadata()` function with `getDictionary()` integration
3. Add translation keys to `src/lib/i18n.ts` for both `en` and `jp`
4. Pages automatically generate `/en/page-name` and `/jp/page-name` routes

## Detailed Guides

For comprehensive guidelines on specific aspects of development, refer to these specialized guides:

- **[Documentation Guide](docs/DOCUMENTATION_GUIDE.md)** - Content creation standards, writing style, and formatting guidelines
- **[Design System Guide](docs/DESIGN_SYSTEM.md)** - UI/UX patterns, component guidelines, and color system rules
- **[Performance Guide](docs/PERFORMANCE_GUIDE.md)** - Optimization strategies, build configuration, and monitoring
- **[Multilingual Implementation](docs/MULTILINGUAL_IMPLEMENTATION.md)** - Complete guide for international/multilingual development

---

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.