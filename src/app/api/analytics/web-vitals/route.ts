import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate the incoming data
    const requiredFields = ['name', 'value', 'id', 'url']
    for (const field of requiredFields) {
      if (!(field in data)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Log the web vital metric
    // In a real application, you would:
    // 1. Store in a database
    // 2. Send to analytics service (e.g., Google Analytics, DataDog)
    // 3. Alert if metrics are poor
    
    // Example: Store in database
    // await storeWebVital(data)
    
    // Example: Send to external analytics
    // await sendToAnalyticsService(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve web vitals data
export async function GET() {
  return NextResponse.json({
    message: 'Web vitals endpoint',
    description: 'POST web vitals data to this endpoint for collection',
  })
}