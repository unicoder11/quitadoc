// Scaling utilities for handling high traffic
import { BATCH_SIZE, MAX_CONCURRENT_QUERIES } from './performance'

export interface CacheEntry<T> {
  data: T
  expiresAt: number
  hits: number
}

export class CacheManager {
  private static instance: CacheManager
  private cache: Map<string, CacheEntry<any>> = new Map()
  private hits = 0
  private misses = 0

  private constructor() {
    // Cleanup expired entries every minute
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
      setInterval(() => this.cleanup(), 60000)
    }
  }

  static getInstance(): CacheManager {
    if (!this.instance) {
      this.instance = new CacheManager()
    }
    return this.instance
  }

  set<T>(key: string, data: T, ttl: number = 3600000): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttl,
      hits: 0,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      this.misses++
      return null
    }

    if (entry.expiresAt < Date.now()) {
      this.cache.delete(key)
      this.misses++
      return null
    }

    entry.hits++
    this.hits++
    return entry.data as T
  }

  private cleanup(): void {
    const now = Date.now()
    let cleaned = 0

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt < now) {
        this.cache.delete(key)
        cleaned++
      }
    }

    console.log(`[v0] Cache cleanup: removed ${cleaned} expired entries`)
  }

  getStats() {
    const total = this.hits + this.misses
    const hitRate = total > 0 ? ((this.hits / total) * 100).toFixed(2) : '0.00'

    return {
      size: this.cache.size,
      hits: this.hits,
      misses: this.misses,
      total,
      hitRate: `${hitRate}%`,
    }
  }

  clear(): void {
    this.cache.clear()
    this.hits = 0
    this.misses = 0
  }
}

// Rate limiter for API endpoints
export class RateLimiter {
  private static instance: RateLimiter
  private requests: Map<string, number[]> = new Map()
  private readonly windowMs: number
  private readonly maxRequests: number

  private constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  static getInstance(windowMs?: number, maxRequests?: number): RateLimiter {
    if (!this.instance) {
      this.instance = new RateLimiter(windowMs, maxRequests)
    }
    return this.instance
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []

    // Remove requests outside the window
    const validRequests = requests.filter((time) => now - time < this.windowMs)

    if (validRequests.length >= this.maxRequests) {
      return false
    }

    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    return true
  }

  getRemainingRequests(identifier: string): number {
    const requests = this.requests.get(identifier) || []
    const now = Date.now()
    const validRequests = requests.filter((time) => now - time < this.windowMs)
    return Math.max(0, this.maxRequests - validRequests.length)
  }
}

// Connection pooling for database queries
export class ConnectionPool {
  private static instance: ConnectionPool
  private activeConnections = 0
  private queuedRequests: Array<() => Promise<any>> = []
  private readonly maxConnections: number

  private constructor(maxConnections: number = MAX_CONCURRENT_QUERIES) {
    this.maxConnections = maxConnections
  }

  static getInstance(maxConnections?: number): ConnectionPool {
    if (!this.instance) {
      this.instance = new ConnectionPool(maxConnections)
    }
    return this.instance
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.activeConnections < this.maxConnections) {
      this.activeConnections++
      try {
        return await fn()
      } finally {
        this.activeConnections--
        this.processQueue()
      }
    } else {
      return new Promise((resolve, reject) => {
        this.queuedRequests.push(async () => {
          try {
            resolve(await fn())
          } catch (error) {
            reject(error)
          }
        })
      })
    }
  }

  private async processQueue(): Promise<void> {
    if (this.queuedRequests.length === 0) return

    const request = this.queuedRequests.shift()
    if (request) {
      this.activeConnections++
      try {
        await request()
      } finally {
        this.activeConnections--
        this.processQueue()
      }
    }
  }

  getStats() {
    return {
      activeConnections: this.activeConnections,
      maxConnections: this.maxConnections,
      queuedRequests: this.queuedRequests.length,
      utilization: `${((this.activeConnections / this.maxConnections) * 100).toFixed(2)}%`,
    }
  }
}
