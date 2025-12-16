import { NextRequest, NextResponse } from 'next/server'

/**
 * API endpoint for receiving client-side error reports
 * This endpoint collects errors from the client and can forward them to external services
 */

interface ErrorReport {
  timestamp: string
  error: {
    name: string
    message: string
    stack?: string
    severity?: string
    category?: string
    code?: string
    context?: Record<string, any>
  }
  url: string
  userAgent: string
}

export async function POST(request: NextRequest) {
  try {
    const errorReport: ErrorReport = await request.json()

    // Validate the error report
    if (!errorReport.error || !errorReport.error.message) {
      return NextResponse.json(
        { error: 'Invalid error report format' },
        { status: 400 }
      )
    }

    // Log error server-side (in production, you'd send to external service)
    console.error('Client Error Report:', {
      timestamp: errorReport.timestamp,
      message: errorReport.error.message,
      severity: errorReport.error.severity || 'unknown',
      category: errorReport.error.category || 'unknown',
      url: errorReport.url,
      userAgent: errorReport.userAgent,
    })

    // In production, you would forward to services like:
    // - Sentry
    // - LogRocket
    // - Datadog
    // - Custom logging service

    if (process.env.NODE_ENV === 'production') {
      // Example: Forward to external service
      // await forwardToExternalService(errorReport)
    }

    return NextResponse.json(
      { success: true, message: 'Error report received' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to process error report:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Example function for forwarding to external service
async function forwardToExternalService(errorReport: ErrorReport) {
  // Example: Send to Sentry
  // if (process.env.SENTRY_DSN) {
  //   await fetch('https://sentry.io/api/errors', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${process.env.SENTRY_TOKEN}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(errorReport)
  //   })
  // }
  // Example: Send to custom logging service
  // if (process.env.LOGGING_ENDPOINT) {
  //   await fetch(process.env.LOGGING_ENDPOINT, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${process.env.LOGGING_TOKEN}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(errorReport)
  //   })
  // }
}
