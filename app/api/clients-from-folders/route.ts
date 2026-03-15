import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const areaId = searchParams.get('areaId')

    // التحقق من وجود مجلد pdfs (للتطوير المحلي فقط)
    const pdfsPath = path.join(process.cwd(), 'public', 'pdfs')
    const pdfsExists = fs.existsSync(pdfsPath)

    if (!pdfsExists) {
      // على Vercel - لا يوجد مجلد pdfs، نرجع بيانات فارغة
      console.log('PDFs folder not found - running on Vercel, returning empty data')
      return NextResponse.json({ success: true, clients: [] })
    }

    // محلياً - نقرأ من المجلد
    const { scanClientsFromFolders, getClientsByAreaFromFolders } = await import('@/lib/scan-clients-folders')
    
    if (areaId) {
      const clients = getClientsByAreaFromFolders(parseInt(areaId))
      return NextResponse.json({ success: true, clients })
    }

    const allClients = scanClientsFromFolders()
    return NextResponse.json({ success: true, clients: allClients })
  } catch (error) {
    console.error('Error fetching clients from folders:', error)
    return NextResponse.json({ success: true, clients: [] })
  }
}
