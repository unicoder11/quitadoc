// API endpoint for analytics data collection
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate event
    if (!body.category || !body.action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log analytics event (in production, send to analytics service)
    console.log('[v0] Analytics Event:', {
      ...body,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
    })

    // Placeholder for sending to analytics service (Posthog, Mixpanel, etc.)
    // await analyticsService.track(body)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
