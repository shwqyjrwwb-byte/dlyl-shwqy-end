import fs from 'fs'
import path from 'path'

export interface ClientFromFolder {
  id: string
  name: string
  code: string
  areaId: number
  areaName: string
  folderPath: string
  filesCount: number
  files?: string[]
}

// Map folder names to area IDs
const areaMapping: Record<string, { id: number; name: string }> = {
  'عملاء العاصمه': { id: 1, name: 'العاصمة الإدارية' },
  'منطقة القاهرة الجديدةo': { id: 2, name: 'القاهرة الجديدة' },
  'new-cairo': { id: 2, name: 'القاهرة الجديدة' },
  'منطقة التجمع o': { id: 3, name: 'التجمع الخامس' },
  'fifth-settlement': { id: 3, name: 'التجمع الخامس' },
  'عملاء وسط': { id: 4, name: 'وسط - مدينة نصر' },
  'downtown': { id: 4, name: 'وسط - مدينة نصر' },
  'منطقة اكتوبرo': { id: 5, name: 'أكتوبر' },
  'october': { id: 5, name: 'أكتوبر' },
  'عملاء اقاليم': { id: 6, name: 'الأقاليم' },
}

export function scanClientsFromFolders(): ClientFromFolder[] {
  const clients: ClientFromFolder[] = []
  const pdfsPath = path.join(process.cwd(), 'public', 'pdfs')

  try {
    // Read all area folders
    const areaFolders = fs.readdirSync(pdfsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const areaFolder of areaFolders) {
      const areaInfo = areaMapping[areaFolder]
      if (!areaInfo) {
        console.warn(`⚠️ مجلد غير معرّف تم تخطيه: ${areaFolder}`)
        continue // Skip unmapped folders
      }

      const areaPath = path.join(pdfsPath, areaFolder)
      
      // Read client folders in this area
      const clientFolders = fs.readdirSync(areaPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())

      console.log(`📁 جاري فحص منطقة: ${areaInfo.name} (${areaFolder}) - ${clientFolders.length} عميل`)

      for (const clientFolder of clientFolders) {
        const clientFolderName = clientFolder.name
        const clientPath = path.join(areaPath, clientFolderName)
        
        // Extract client name and code from folder name
        // Formats supported:
        // 1. "name code" (e.g., "أحمد محمد 123")
        // 2. "code name" (e.g., "123 أحمد محمد")
        // 3. "codename" (e.g., "704اسلام وهبه")
        // 4. "name code1--code2" (e.g., "ممدوح مصباح 722--723")
        let clientName = clientFolderName
        let clientCode = clientFolderName
        
        // Try pattern: "name code" or "name code1--code2" (e.g., "أحمد محمد 123" or "ممدوح مصباح 722--723")
        const matchNameCode = clientFolderName.match(/^(.+?)\s+([\d\-]+)$/)
        if (matchNameCode) {
          clientName = matchNameCode[1].trim()
          clientCode = matchNameCode[2]
        } else {
          // Try pattern: "code name" (e.g., "123 أحمد محمد")
          const matchCodeName = clientFolderName.match(/^(\d+)\s+(.+)$/)
          if (matchCodeName) {
            clientCode = matchCodeName[1]
            clientName = matchCodeName[2].trim()
          } else {
            // Try pattern: "codename" without space (e.g., "704اسلام وهبه")
            const matchCodeNoSpace = clientFolderName.match(/^(\d+)(.+)$/)
            if (matchCodeNoSpace) {
              clientCode = matchCodeNoSpace[1]
              clientName = matchCodeNoSpace[2].trim()
            }
          }
        }

        // Count files in folder
        const files = fs.readdirSync(clientPath, { withFileTypes: true })
          .filter(f => f.isFile() && (f.name.endsWith('.pdf') || f.name.endsWith('.PDF')))
        
        const fileNames = files.map(f => f.name)
        
        clients.push({
          id: `${areaInfo.id}-${clientCode}`,
          name: clientName,
          code: clientCode,
          areaId: areaInfo.id,
          areaName: areaInfo.name,
          folderPath: `/pdfs/${areaFolder}/${clientFolderName}`,
          filesCount: files.length,
          files: fileNames
        })
      }
    }
    
    // تسجيل ملخص العملاء حسب المنطقة
    const summary = clients.reduce((acc: Record<number, number>, client) => {
      acc[client.areaId] = (acc[client.areaId] || 0) + 1
      return acc
    }, {})
    console.log('✅ ملخص العملاء حسب المنطقة:', summary)
  } catch (error) {
    console.error('Error scanning client folders:', error)
  }

  return clients
}

export function getClientsByAreaFromFolders(areaId: number): ClientFromFolder[] {
  const allClients = scanClientsFromFolders()
  return allClients.filter(client => client.areaId === areaId)
}

export function getAllClientsFromFolders(): ClientFromFolder[] {
  return scanClientsFromFolders()
}
