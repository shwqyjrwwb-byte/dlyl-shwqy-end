import { NextResponse } from 'next/server'

// Database disabled - using Google Drive links only
export async function POST() {
  return NextResponse.json({ 
    success: false,
    message: 'Database disabled - using Google Drive links only' 
  })
}
