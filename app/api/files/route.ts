import { NextResponse } from 'next/server'

// Database disabled - using Google Drive links only
export async function POST() {
  return NextResponse.json({ message: 'Database disabled - using Google Drive links' })
}

export async function DELETE() {
  return NextResponse.json({ message: 'Database disabled - using Google Drive links' })
}
