import { NextResponse } from "next/server"

// in-memory store
const announcements: any[] = []

export async function GET() {
  return NextResponse.json({
    success: true,
    announcements: [...announcements].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, content, title, message, fileData, fileName } = body

    const newAnnouncement = {
      id: Date.now().toString(),
      type: type || "text",
      title: title || "",
      content: content || message || "",
      fileData,
      fileName,
      senderName: "م/ أحمد شوقي",
      senderTitle: "رئيس مجلس الإدارة",
      senderImage: "/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg",
      createdAt: new Date().toISOString(),
    }

    announcements.unshift(newAnnouncement)
    if (announcements.length > 50) announcements.splice(50)

    return NextResponse.json({ success: true, announcement: newAnnouncement })
  } catch {
    return NextResponse.json({ success: false, error: "فشل في إرسال الرسالة" }, { status: 500 })
  }
}
