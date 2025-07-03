# BoxLog Marketing Website

A modern, high-performance marketing website built with Next.js 14, featuring comprehensive accessibility compliance (WCAG 2.1 AA), advanced performance optimizations, and enterprise-level security.

## 🚀 Features

### Core Features
- **Next.js 14** with App Router and Server Components
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first styling
- **MDX** for rich content with React components
- **SEO Optimized** with structured data and meta tags

### Performance Optimizations
- **Core Web Vitals** monitoring and optimization
- **Dynamic imports** with code splitting
- **Image optimization** with responsive sizes and WebP/AVIF support
- **Font preloading** for critical typefaces
- **Bundle analysis** with size optimization
- **Critical CSS** inlining for above-the-fold content
- **Service Worker** for offline capabilities

### Accessibility (WCAG 2.1 AA Compliant)
- **Smart alt attributes** with context-aware generation
- **Focus management** with trap and restore functionality
- **Color contrast validation** with real-time checking
- **Screen reader support** with comprehensive ARIA labels
- **Keyboard navigation** with full directional support
- **Reduced motion** respect for user preferences

### Security Features
- **Content Security Policy (CSP)** with strict headers
- **Input validation** and sanitization
- **XSS protection** with HTML escaping
- **CSRF protection** with token validation
- **Rate limiting** implementation
- **Security headers** for production deployment

### Developer Experience
- **TypeScript** strict mode configuration
- **ESLint** with Next.js recommended rules
- **Error boundaries** for graceful error handling
- **Hot reload** with fast refresh
- **Bundle analyzer** for optimization insights

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── docs/              # Documentation pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── accessibility/     # Accessibility components
│   ├── analytics/         # Analytics and tracking
│   ├── layout/           # Layout components
│   ├── performance/      # Performance optimization
│   ├── search/           # Search functionality
│   ├── seo/              # SEO components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── accessibility.ts  # Accessibility utilities
│   ├── analytics.ts      # Analytics configuration
│   ├── metadata.ts       # SEO metadata generation
│   ├── performance.ts    # Performance utilities
│   └── security.ts       # Security utilities
└── middleware.ts         # Next.js middleware
```

## 🛠 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/boxlog-web.git
   cd boxlog-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration values.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |
| `npm run analyze` | Analyze bundle size |
| `npm run test:lighthouse` | Run Lighthouse CI |

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional
CONTACT_EMAIL=contact@yoursite.com
SENDGRID_API_KEY=your-sendgrid-key
```

See `.env.example` for all available configuration options.

### Content Management

Content is managed through MDX files located in:
- `content/blog/` - Blog posts
- `content/docs/` - Documentation
- `content/releases/` - Release notes

Each file should include frontmatter metadata:

```markdown
---
title: "Your Post Title"
description: "Post description"
date: "2024-01-01"
tags: ["tag1", "tag2"]
---

Your content here...
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - automatic deployments on push to main branch

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

### Environment-specific Builds

```bash
# Production build with optimizations
npm run build:production

# Development build with debugging
NODE_ENV=development npm run build
```

## 📊 Performance Monitoring

### Core Web Vitals

The site includes comprehensive Core Web Vitals monitoring:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### Bundle Analysis

Run bundle analysis to identify optimization opportunities:

```bash
npm run analyze
```

### Lighthouse Testing

Automated Lighthouse testing for performance, accessibility, and SEO:

```bash
npm run test:lighthouse
```

## ♿ Accessibility

This project is fully compliant with WCAG 2.1 AA standards:

### Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management
- Reduced motion support

### Testing
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Automated accessibility testing with axe-core
- Color contrast validation

## 🔒 Security

### Security Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Strict-Transport-Security

### Input Validation
- XSS prevention
- SQL injection protection
- CSRF token validation
- File upload restrictions
- Rate limiting

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run accessibility tests
npm run test:a11y

# Run performance tests
npm run test:lighthouse
```

### Test Coverage

The project includes:
- Unit tests for utility functions
- Component tests with React Testing Library
- Accessibility tests with axe-core
- Performance tests with Lighthouse CI

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript strict mode requirements
- Maintain 100% accessibility compliance
- Ensure all performance metrics pass
- Add tests for new functionality
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Vercel** for deployment and hosting
- **Tailwind CSS** for the utility-first CSS framework
- **Web Accessibility Initiative** for WCAG guidelines

## 📞 Support

- **Documentation**: [docs.yoursite.com](https://docs.yoursite.com)
- **Email**: support@yoursite.com
- **Issues**: [GitHub Issues](https://github.com/your-username/boxlog-web/issues)

---

Built with ❤️ using [Next.js](https://nextjs.org/), [TypeScript](https://typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/)