import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['@/components', '@/lib', 'lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Simplified webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Add explicit file extensions for better module resolution
    config.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.json']
    
    // Only apply optimizations in production
    if (!dev && !isServer) {
      // Enhanced code splitting optimization
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 30,
          cacheGroups: {
            // React and core libs
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              name: 'vendor',
              chunks: 'all',
              priority: 10,
            },
            // UI library chunk
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|class-variance-authority|clsx|tailwind-merge)[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 9,
            },
            // Form libraries
            form: {
              test: /[\\/]node_modules[\\/](@hookform|zod|react-hook-form)[\\/]/,
              name: 'form',
              chunks: 'all',
              priority: 8,
            },
            // MDX and content
            content: {
              test: /[\\/]node_modules[\\/](next-mdx-remote|gray-matter|remark|rehype|web-vitals)[\\/]/,
              name: 'content',
              chunks: 'all',
              priority: 7,
            },
            // Common components chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    return config
  },
  poweredByHeader: false,
}

export default withBundleAnalyzer(nextConfig)