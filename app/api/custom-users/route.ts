import { NextResponse } from "next/server"

// in-memory store for custom users added from dashboard
const customUsers: any[] = []

export async function GET() {
  return NextResponse.json({ success: true, users: customUsers })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, password, name, position, department } = body
    if (!userId || !password || !name) {
      return NextResponse.json({ success: false, error: "بيانات ناقصة" }, { status: 400 })
    }
    // Check duplicate
    const exists = customUsers.find(u => u.userId === userId)
    if (exists) {
      return NextResponse.json({ success: false, error: "اليوزر موجود بالفعل" }, { status: 400 })
    }
    const newUser = { userId, password, name, position: position || "", department: department || "", createdAt: new Date().toISOString() }
    customUsers.push(newUser)
    return NextResponse.json({ success: true, user: newUser })
  } catch {
    return NextResponse.json({ success: false, error: "خطأ في الإضافة" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json()
    const idx = customUsers.findIndex(u => u.userId === userId)
    if (idx === -1) return NextResponse.json({ success: false, error: "غير موجود" }, { status: 404 })
    customUsers.splice(idx, 1)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: "خطأ في الحذف" }, { status: 500 })
  }
}
