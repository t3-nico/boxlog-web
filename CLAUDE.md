# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler without emitting files

### Analysis & Optimization
- `npm run analyze` - Run bundle analyzer (requires ANALYZE=true env var)
- `npm run build:production` - Production build with NODE_ENV=production
- `npm run test:lighthouse` - Run Lighthouse CI performance tests

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router and Server Components
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with CSS variables for theming
- **Content**: MDX for blog posts, docs, and releases
- **Internationalization**: next-intl with English and Japanese locales
- **Theme**: next-themes with system/dark/light mode support

### Key Features
- **Performance**: Bundle splitting, image optimization, Core Web Vitals monitoring
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive a11y components
- **Security**: CSP headers, security middleware, input validation
- **SEO**: Structured data, meta tags, sitemap generation
- **PWA**: Service Worker, offline capabilities

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
└── types/               # TypeScript type definitions
```

### Content Management
- **MDX Files**: Located in `content/` directory
- **Supported Types**: blog posts, docs, releases
- **Frontmatter**: Includes title, description, tags, dates, category
- **Processing**: Uses next-mdx-remote with remark-gfm and rehype-highlight

### Internationalization
- **Locales**: `en` (English), `jp` (Japanese)
- **Messages**: Stored in `messages/` directory as JSON files
- **Routing**: Automatic locale detection with fallback to English
- **Configuration**: Handled via `src/lib/i18n.ts`

### Performance Architecture
- **Bundle Analysis**: Webpack bundle analyzer with vendor chunk splitting
- **Image Optimization**: WebP/AVIF formats with responsive sizes
- **Font Loading**: Preloaded Inter font variants
- **Code Splitting**: Dynamic imports for non-critical components
- **Core Web Vitals**: Real-time monitoring and optimization

### Security Features
- **CSP**: Strict Content Security Policy in production
- **Headers**: X-Frame-Options, X-XSS-Protection, HSTS
- **Middleware**: Security headers applied via Next.js middleware
- **Input Validation**: XSS prevention and CSRF protection

### Accessibility Implementation
- **Focus Management**: Comprehensive focus trap and restoration
- **Screen Readers**: ARIA labels and semantic HTML structure
- **Keyboard Navigation**: Full directional support
- **Color Contrast**: Real-time validation
- **Motion**: Respects user's reduced motion preferences

### Theming System
- **CSS Variables**: Custom properties for consistent theming
- **Tailwind Config**: Extended with semantic color tokens
- **Theme Toggle**: Supports system, dark, and light modes
- **Persistence**: Theme preference stored in localStorage

### Development Patterns
- **Component Organization**: Grouped by feature/domain
- **TypeScript**: Strict mode with comprehensive type definitions
- **Error Handling**: Error boundaries and graceful degradation
- **Testing**: Accessibility and performance testing integrated

### Build & Deployment
- **Platform**: Optimized for Vercel deployment
- **Environments**: Development, staging, production configurations
- **Caching**: Strategic caching for static assets and API routes
- **Monitoring**: Built-in analytics and performance tracking

## Important Notes

### Code Style
- Uses TypeScript strict mode - all types must be properly defined
- Tailwind CSS with utility-first approach
- Component-based architecture with clear separation of concerns
- Accessibility-first development with WCAG 2.1 AA compliance

### Content Guidelines
- All MDX content must include proper frontmatter
- Images should use optimized formats (WebP/AVIF)
- Internationalization keys should be defined in message files
- Blog posts and docs support code highlighting and GFM

### Performance Requirements
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Bundle size monitoring with automatic analysis
- Image optimization and lazy loading by default
- Critical CSS inlined for above-the-fold content