// Performance utilities for FIPE
export const CACHE_CONFIG = {
  // Cache strategy for FIPE pages
  FIPE_HUB: {
    revalidate: 3600, // 1 hour
    staleWhileRevalidate: 86400, // 1 day
  },
  FIPE_CATEGORIES: {
    revalidate: 3600,
    staleWhileRevalidate: 86400,
  },
  FIPE_BRANDS: {
    revalidate: 7200, // 2 hours
    staleWhileRevalidate: 172800, // 2 days
  },
  FIPE_MODELS: {
    revalidate: 7200,
    staleWhileRevalidate: 172800,
  },
  FIPE_PRICES: {
    revalidate: 1800, // 30 minutes
    staleWhileRevalidate: 86400,
  },
}

// Image optimization for FIPE pages
export const IMAGE_OPTIMIZATION = {
  quality: 80,
  formats: ['image/webp', 'image/avif'],
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw',
}

// Performance metrics tracking
export interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
}

// API response caching
export const createCacheKey = (type: string, id: string) => `fipe:${type}:${id}`

// Database query optimization
export const BATCH_SIZE = 100
export const MAX_CONCURRENT_QUERIES = 5
