import { NextResponse } from "next/server"

// تخزين مؤقت للمستخدمين الأونلاين
let onlineUsers: any[] = []

export async function GET() {
  try {
    // تنظيف المستخدمين القدامى (أكثر من 5 دقائق)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
    onlineUsers = onlineUsers.filter(user => user.lastSeen > fiveMinutesAgo)

    return NextResponse.json({
      success: true,
      users: onlineUsers,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في جلب المستخدمين" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, userName, userPosition } = body

    // تحديث أو إضافة المستخدم
    const existingUserIndex = onlineUsers.findIndex(u => u.userId === userId)
    
    if (existingUserIndex >= 0) {
      onlineUsers[existingUserIndex].lastSeen = Date.now()
    } else {
      onlineUsers.push({
        userId,
        userName,
        userPosition,
        lastSeen: Date.now(),
      })
    }

    return NextResponse.json({
      success: true,
      users: onlineUsers,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في تحديث الحالة" },
      { status: 500 }
    )
  }
}
