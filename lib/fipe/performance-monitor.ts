// Performance monitoring for FIPE feature
'use client'

export interface PerformanceMetrics {
  pageLoadTime: number
  timeToFirstByte: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  timeToInteractive: number
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, PerformanceMetrics> = new Map()

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeWebVitals()
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!this.instance) {
      this.instance = new PerformanceMonitor()
    }
    return this.instance
  }

  private initializeWebVitals() {
    // Observe different performance metrics
    try {
      // First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach((entry) => {
        console.log(`[v0] Performance: ${entry.name} - ${Math.round(entry.startTime)}ms`)
      })

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            console.log(`[v0] Performance: LCP - ${Math.round(lastEntry.renderTime || lastEntry.loadTime)}ms`)
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (e) {
          console.warn('[v0] LCP observer not supported')
        }
      }
    } catch (error) {
      console.warn('[v0] Web Vitals monitoring not available:', error)
    }
  }

  recordMetrics(pageName: string, metrics: Partial<PerformanceMetrics>) {
    const existingMetrics = this.metrics.get(pageName) || {}
    this.metrics.set(pageName, { ...existingMetrics, ...metrics } as PerformanceMetrics)
    this.sendMetricsToBackend(pageName, this.metrics.get(pageName)!)
  }

  private sendMetricsToBackend(pageName: string, metrics: PerformanceMetrics) {
    try {
      // Send to backend for monitoring
      const payload = {
        pageName,
        metrics,
        timestamp: Date.now(),
        url: typeof window !== 'undefined' ? window.location.href : '',
      }

      // Example: POST to /api/performance-metrics
      // fetch('/api/performance-metrics', { method: 'POST', body: JSON.stringify(payload) })
    } catch (error) {
      console.error('[v0] Performance metrics error:', error)
    }
  }

  getMetrics(pageName: string): PerformanceMetrics | undefined {
    return this.metrics.get(pageName)
  }

  getAllMetrics(): Map<string, PerformanceMetrics> {
    return this.metrics
  }
}

// React hook for performance monitoring
export function usePerformanceMonitoring(pageName: string) {
  const monitor = PerformanceMonitor.getInstance()

  // Record page load metrics
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const perfData = performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
      const timeToFirstByte = perfData.responseStart - perfData.navigationStart

      monitor.recordMetrics(pageName, {
        pageLoadTime,
        timeToFirstByte,
      })
    })
  }

  return monitor
}
