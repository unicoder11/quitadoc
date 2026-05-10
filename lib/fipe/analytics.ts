// Analytics tracking for FIPE feature
'use client'

import { useEffect } from 'react'

export interface AnalyticsEvent {
  category: 'fipe' | 'embed' | 'engagement'
  action: string
  label?: string
  value?: number
  timestamp?: number
}

export class FipeAnalytics {
  private static instance: FipeAnalytics

  private constructor() {}

  static getInstance(): FipeAnalytics {
    if (!this.instance) {
      this.instance = new FipeAnalytics()
    }
    return this.instance
  }

  // Track FIPE search
  trackSearch(brand: string, model: string, year: number) {
    this.trackEvent({
      category: 'fipe',
      action: 'search',
      label: `${brand}-${model}-${year}`,
    })
  }

  // Track embed generation
  trackEmbedGenerated(brandFilter?: string, modelFilter?: string) {
    this.trackEvent({
      category: 'embed',
      action: 'generate',
      label: `${brandFilter || 'none'}-${modelFilter || 'none'}`,
    })
  }

  // Track embed copy
  trackEmbedCopy() {
    this.trackEvent({
      category: 'embed',
      action: 'copy_code',
    })
  }

  // Track category view
  trackCategoryView(category: string) {
    this.trackEvent({
      category: 'fipe',
      action: 'view_category',
      label: category,
    })
  }

  // Track brand view
  trackBrandView(brand: string) {
    this.trackEvent({
      category: 'fipe',
      action: 'view_brand',
      label: brand,
    })
  }

  // Track model view
  trackModelView(model: string) {
    this.trackEvent({
      category: 'fipe',
      action: 'view_model',
      label: model,
    })
  }

  // Track page engagement time
  trackEngagementTime(page: string, seconds: number) {
    this.trackEvent({
      category: 'engagement',
      action: 'time_on_page',
      label: page,
      value: Math.round(seconds),
    })
  }

  // Generic event tracking
  private trackEvent(event: AnalyticsEvent) {
    try {
      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
        })
      }

      // Send to custom backend if needed
      this.sendToBackend(event)
    } catch (error) {
      console.error('[v0] Analytics tracking error:', error)
    }
  }

  private sendToBackend(event: AnalyticsEvent) {
    // This would connect to your backend analytics endpoint
    const payload = {
      ...event,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }

    // Example: POST to /api/analytics
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) })
  }
}

// React hook for analytics
export function useFipeAnalytics() {
  return FipeAnalytics.getInstance()
}

// Hook to track page time
export function usePageEngagementTime(page: string) {
  useEffect(() => {
    const startTime = Date.now()

    return () => {
      const engagementTime = (Date.now() - startTime) / 1000
      FipeAnalytics.getInstance().trackEngagementTime(page, engagementTime)
    }
  }, [page])
}
