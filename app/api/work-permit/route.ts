import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// مسار ملف التصاريح
const PERMITS_FILE = join(process.cwd(), "data", "work-permits.json")

// قراءة جميع التصاريح
async function readPermits() {
  try {
    if (!existsSync(PERMITS_FILE)) {
      return []
    }
    const data = await readFile(PERMITS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading permits:", error)
    return []
  }
}

// حفظ التصاريح
async function savePermits(permits: any[]) {
  try {
    const dataDir = join(process.cwd(), "data")
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }
    await writeFile(PERMITS_FILE, JSON.stringify(permits, null, 2))
  } catch (error) {
    console.error("Error saving permits:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // استخراج البيانات
    const permitData: any = {
      permitId: `permit_${Date.now()}`,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      siteName: formData.get("siteName") as string,
      siteCode: formData.get("siteCode") as string,
      region: formData.get("region") as string,
      contractorName: formData.get("contractorName") as string,
      engineerName: formData.get("engineerName") as string,
      engineerPhone: formData.get("engineerPhone") as string,
      workPhase: formData.get("workPhase") as string,
      notes: formData.get("notes") as string,
      status: "pending",
      submittedAt: new Date().toISOString(),
      workers: [] as Array<{ name: string; nationalIdPath: string }>,
    }

    // إنشاء مجلد للتصريح
    const uploadsDir = join(process.cwd(), "public", "uploads", "work-permits", permitData.permitId)
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // حفظ صورة الرقم القومي للمقاول
    const contractorId = formData.get("contractorNationalId") as File
    if (contractorId) {
      const bytes = await contractorId.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const ext = contractorId.name.split('.').pop()
      const contractorIdPath = join(uploadsDir, `contractor_id.${ext}`)
      await writeFile(contractorIdPath, buffer)
      permitData.contractorNationalId = `/uploads/work-permits/${permitData.permitId}/contractor_id.${ext}`
    }

    // حفظ بيانات العمال وصورهم
    let workerIndex = 0
    while (formData.has(`worker_${workerIndex}_name`)) {
      const workerName = formData.get(`worker_${workerIndex}_name`) as string
      const workerIdFile = formData.get(`worker_${workerIndex}_id`) as File
      
      if (workerName && workerIdFile) {
        const bytes = await workerIdFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const ext = workerIdFile.name.split('.').pop()
        const workerIdPath = join(uploadsDir, `worker_${workerIndex}_id.${ext}`)
        await writeFile(workerIdPath, buffer)
        
        permitData.workers.push({
          name: workerName,
          nationalIdPath: `/uploads/work-permits/${permitData.permitId}/worker_${workerIndex}_id.${ext}`,
        })
      }
      
      workerIndex++
    }

    // قراءة التصاريح الحالية وإضافة التصريح الجديد
    const permits = await readPermits()
    permits.push(permitData)
    await savePermits(permits)

    return NextResponse.json({
      success: true,
      message: "تم إرسال طلب التصريح بنجاح",
      permitId: permitData.permitId,
    })
  } catch (error) {
    console.error("Error processing work permit:", error)
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    )
  }
}

// GET: جلب جميع التصاريح
export async function GET() {
  try {
    const permits = await readPermits()
    
    return NextResponse.json({
      success: true,
      permits: permits,
    })
  } catch (error) {
    console.error("Error fetching permits:", error)
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء جلب التصاريح" },
      { status: 500 }
    )
  }
}

// PUT: تحديث حالة التصريح (موافقة/رفض)
export async function PUT(request: NextRequest) {
  try {
    const { permitId, status, rejectionReason, approvedBy } = await request.json()
    
    const permits = await readPermits()
    const permitIndex = permits.findIndex((p: any) => p.permitId === permitId)
    
    if (permitIndex === -1) {
      return NextResponse.json(
        { success: false, message: "التصريح غير موجود" },
        { status: 404 }
      )
    }
    
    permits[permitIndex].status = status
    permits[permitIndex].updatedAt = new Date().toISOString()
    
    if (status === "approved") {
      permits[permitIndex].approvedBy = approvedBy
      permits[permitIndex].approvedAt = new Date().toISOString()
    } else if (status === "rejected") {
      permits[permitIndex].rejectionReason = rejectionReason
      permits[permitIndex].rejectedAt = new Date().toISOString()
    }
    
    await savePermits(permits)
    
    return NextResponse.json({
      success: true,
      message: status === "approved" ? "تم الموافقة على التصريح" : "تم رفض التصريح",
    })
  } catch (error) {
    console.error("Error updating permit:", error)
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء تحديث التصريح" },
      { status: 500 }
    )
  }
}
