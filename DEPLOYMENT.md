# Deployment Guide

This guide covers deployment strategies for the BoxLog Marketing Website across different environments.

## 🌍 Environment Overview

| Environment | URL | Branch | Auto Deploy | Purpose |
|-------------|-----|--------|-------------|---------|
| Development | `localhost:3000` | `dev` | ❌ | Local development |
| Staging | `staging.yoursite.com` | `staging` | ✅ | Testing and QA |
| Production | `yoursite.com` | `main` | ✅ | Live site |

## 🚀 Vercel Deployment (Recommended)

### Initial Setup

1. **Connect Repository**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the project root directory

2. **Configure Build Settings**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "framework": "nextjs"
   }
   ```

3. **Environment Variables**
   Set up the following in Vercel dashboard:
   
   **Production:**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://yoursite.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NODE_ENV=production
   CONTACT_EMAIL=contact@yoursite.com
   ```
   
   **Staging:**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://staging.yoursite.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-STAGING-ID
   NODE_ENV=staging
   CONTACT_EMAIL=staging@yoursite.com
   ```

### Branch Configuration

1. **Production Branch**: `main`
   - Automatic deployments
   - Custom domain: `yoursite.com`
   - Production environment variables

2. **Staging Branch**: `staging`
   - Automatic deployments
   - Preview domain: `staging.yoursite.com`
   - Staging environment variables

3. **Development Branch**: `dev`
   - Manual deployments only
   - Preview domains for testing

### Custom Domains

1. **Add Domain** in Vercel dashboard
2. **Configure DNS** records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.61
   ```
3. **SSL Certificate** - Automatic via Vercel

## 🔧 Alternative Deployment Options

### Netlify

1. **Build Settings**
   ```toml
   [build]
     command = "npm run build && npm run export"
     publish = "out"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

2. **Redirects** (`_redirects` file)
   ```
   /api/* /.netlify/functions/:splat 200
   /* /index.html 200
   ```

### AWS Amplify

1. **Build Specification** (`amplify.yml`)
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Docker Deployment

1. **Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   COPY --from=deps /app/node_modules ./node_modules
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json

   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t boxlog-web .
   docker run -p 3000:3000 boxlog-web
   ```

## ⚙️ Environment Configuration

### Environment Variables by Environment

#### Development (`.env.local`)
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DEV-ID
ANALYZE=false
NEXT_PUBLIC_ENABLE_BETA_FEATURES=true
SKIP_TYPE_CHECK=false
```

#### Staging
```bash
NEXT_PUBLIC_SITE_URL=https://staging.yoursite.com
NODE_ENV=staging
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-STAGING-ID
CONTACT_EMAIL=staging@yoursite.com
NEXT_PUBLIC_ENABLE_BETA_FEATURES=true
```

#### Production
```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NODE_ENV=production
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PROD-ID
CONTACT_EMAIL=contact@yoursite.com
SENDGRID_API_KEY=SG.production-key
SENTRY_DSN=https://production@sentry.io/project
```

## 🔐 Security Configuration

### Production Security Headers

Ensure these headers are configured in your deployment:

```javascript
// Security headers (configured in middleware.ts)
{
  "X-DNS-Prefetch-Control": "on",
  "X-XSS-Protection": "1; mode=block",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-eval' https://www.googletagmanager.com;",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload"
}
```

### SSL/TLS Configuration

- **TLS 1.2+** minimum
- **HTTP/2** enabled
- **HSTS** with preload
- **Certificate transparency** logging

## 📊 Performance Optimization

### Build Optimization

1. **Bundle Analysis**
   ```bash
   npm run analyze
   ```

2. **Type Checking**
   ```bash
   npm run type-check
   ```

3. **Linting**
   ```bash
   npm run lint
   ```

### CDN Configuration

#### Vercel Edge Network
- Automatic global CDN
- Edge functions support
- Image optimization

#### CloudFront (for AWS)
```json
{
  "cacheBehaviors": [
    {
      "pathPattern": "/_next/static/*",
      "cachePolicyId": "caching-optimized",
      "compress": true
    },
    {
      "pathPattern": "/api/*",
      "cachePolicyId": "caching-disabled"
    }
  ]
}
```

## 🧪 Pre-deployment Testing

### Automated Testing Pipeline

1. **Run Test Suite**
   ```bash
   npm run test
   npm run test:a11y
   npm run type-check
   npm run lint
   ```

2. **Performance Testing**
   ```bash
   npm run test:lighthouse
   ```

3. **Security Scanning**
   ```bash
   npm audit
   npm run security:scan
   ```

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Search functionality works
- [ ] Forms submit properly
- [ ] Mobile responsiveness
- [ ] Accessibility with screen reader
- [ ] Performance scores (90+ Lighthouse)
- [ ] SEO metadata correct
- [ ] Analytics tracking

## 🚨 Monitoring & Alerts

### Performance Monitoring

1. **Core Web Vitals**
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

2. **Uptime Monitoring**
   - Status page checks
   - API endpoint monitoring
   - Geographic monitoring

### Error Tracking

1. **Sentry Configuration**
   ```javascript
   import * as Sentry from "@sentry/nextjs"
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   })
   ```

2. **Alert Configuration**
   - Error rate > 1%
   - Performance degradation
   - Uptime < 99.9%

## 🔄 Rollback Strategy

### Vercel Rollback

1. **Via Dashboard**
   - Go to Deployments tab
   - Select previous deployment
   - Click "Promote to Production"

2. **Via CLI**
   ```bash
   vercel --prod --force
   ```

### Emergency Procedures

1. **Immediate Rollback**
   - Revert to last known good deployment
   - Communicate to stakeholders
   - Investigate issue

2. **Hotfix Process**
   - Create hotfix branch from main
   - Apply minimal fix
   - Fast-track through testing
   - Deploy to production

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Code review completed
- [ ] Tests passing
- [ ] Performance metrics verified
- [ ] Security scan completed
- [ ] Environment variables updated
- [ ] Database migrations (if any)

### Deployment
- [ ] Deploy to staging
- [ ] Smoke testing on staging
- [ ] Deploy to production
- [ ] Verify production deployment
- [ ] Monitor for errors

### Post-deployment
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] User feedback monitoring
- [ ] Analytics verification
- [ ] SEO indexing status

## 📞 Support & Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Verify environment variables
   - Clear build cache

2. **Performance Issues**
   - Run bundle analyzer
   - Check image optimization
   - Verify CDN configuration

3. **SEO Issues**
   - Verify meta tags
   - Check sitemap generation
   - Validate structured data

### Getting Help

- **Documentation**: Internal wiki
- **Support**: DevOps team
- **Emergency**: On-call engineer

---

For more detailed information, refer to the main [README.md](README.md) or contact the development team.