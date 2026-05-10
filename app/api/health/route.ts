// Health check endpoint for monitoring
import { NextRequest, NextResponse } from 'next/server'
import { CacheManager, RateLimiter, ConnectionPool } from '@/lib/fipe/scaling'

export async function GET(request: NextRequest) {
  try {
    const cacheStats = CacheManager.getInstance().getStats()
    const connStats = ConnectionPool.getInstance().getStats()

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
      cache: cacheStats,
      connections: connStats,
    }

    return NextResponse.json(health)
  } catch (error) {
    console.error('[v0] Health check error:', error)
    return NextResponse.json(
      { status: 'unhealthy', error: String(error) },
      { status: 500 }
    )
  }
}
