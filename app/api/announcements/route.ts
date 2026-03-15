import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const ANNOUNCEMENTS_FILE = path.join(process.cwd(), "data", "announcements.json")

// التأكد من وجود مجلد data
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// قراءة الرسائل من الملف
function readAnnouncements() {
  try {
    ensureDataDir()
    if (fs.existsSync(ANNOUNCEMENTS_FILE)) {
      const data = fs.readFileSync(ANNOUNCEMENTS_FILE, "utf-8")
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error("Error reading announcements:", error)
    return []
  }
}

// حفظ الرسائل في الملف
function saveAnnouncements(announcements: any[]) {
  try {
    ensureDataDir()
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(announcements, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("Error saving announcements:", error)
    return false
  }
}

export async function GET() {
  try {
    const announcements = readAnnouncements()
    return NextResponse.json({
      success: true,
      announcements: announcements.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في جلب الرسائل" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, content, fileData, fileName } = body

    const newAnnouncement = {
      id: Date.now().toString(),
      type, // text, voice, image, video
      content,
      fileData, // base64 data للصور والفيديوهات
      fileName,
      senderName: "م/ أحمد شوقي",
      senderTitle: "رئيس مجلس الإدارة",
      senderImage: "/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg",
      createdAt: new Date().toISOString(),
    }

    const announcements = readAnnouncements()
    announcements.push(newAnnouncement)
    
    if (saveAnnouncements(announcements)) {
      return NextResponse.json({
        success: true,
        announcement: newAnnouncement,
      })
    } else {
      return NextResponse.json(
        { success: false, error: "فشل في حفظ الرسالة" },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في إرسال الرسالة" },
      { status: 500 }
    )
  }
}
