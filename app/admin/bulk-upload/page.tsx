"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "../../../components/page-header"
import { Card } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Upload, FolderOpen, CheckCircle, AlertCircle, FileText, Loader2 } from "lucide-react"
import Link from "next/link"

interface Client {
  id: string
  name: string
  code: string
  areaId: number
}

interface UploadedFile {
  file: File
  clientId: string
  clientName: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

const areas = [
  { id: 1, name: "العاصمة الإدارية" },
  { id: 2, name: "القاهرة الجديدة" },
  { id: 3, name: "التجمع الخامس" },
  { id: 4, name: "وسط" },
  { id: 5, name: "أكتوبر" },
  { id: 6, name: "الأقاليم" }
]

export default function BulkUploadPage() {
  const [selectedArea, setSelectedArea] = useState<string>("")
  const [clients, setClients] = useState<Client[]>([])
  const [loadingClients, setLoadingClients] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Load clients when area is selected
  useEffect(() => {
    if (selectedArea) {
      loadClients(parseInt(selectedArea))
    } else {
      setClients([])
    }
  }, [selectedArea])

  const loadClients = async (areaId: number) => {
    setLoadingClients(true)
    try {
      const response = await fetch(`/api/clients?areaId=${areaId}`)
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      }
    } catch (error) {
      console.error("Failed to load clients:", error)
    } finally {
      setLoadingClients(false)
    }
  }

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList || fileList.length === 0) return

    const newFiles: UploadedFile[] = []

    // Process each file
    Array.from(fileList).forEach((file) => {
      // Extract client code from filename
      // Expected format: "code-filename.ext" or just match with client codes
      const fileName = file.name
      
      // Try to match with existing clients
      const matchedClient = clients.find(client => 
        fileName.includes(client.code) || 
        fileName.includes(client.name) ||
        fileName.startsWith(client.code)
      )

      if (matchedClient) {
        newFiles.push({
          file,
          clientId: matchedClient.id,
          clientName: matchedClient.name,
          status: 'pending'
        })
      } else {
        // If no match, add to first client or show error
        newFiles.push({
          file,
          clientId: clients[0]?.id || '',
          clientName: 'غير محدد',
          status: 'pending',
          error: 'لم يتم العثور على عميل مطابق'
        })
      }
    })

    setFiles(prev => [...prev, ...newFiles])
  }

  const handleClientChange = (index: number, clientId: string) => {
    setFiles(prev => {
      const updated = [...prev]
      const client = clients.find(c => c.id === clientId)
      if (client) {
        updated[index] = {
          ...updated[index],
          clientId: client.id,
          clientName: client.name,
          error: undefined
        }
      }
      return updated
    })
  }

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUploadAll = async () => {
    setIsUploading(true)

    for (let i = 0; i < files.length; i++) {
      const fileData = files[i]
      
      if (!fileData.clientId) {
        setFiles(prev => {
          const updated = [...prev]
          updated[i] = { ...updated[i], status: 'error', error: 'لم يتم تحديد عميل' }
          return updated
        })
        continue
      }

      // Update status to uploading
      setFiles(prev => {
        const updated = [...prev]
        updated[i] = { ...updated[i], status: 'uploading' }
        return updated
      })

      try {
        // Create file URL (in real app, upload to storage)
        const fileUrl = URL.createObjectURL(fileData.file)
        
        const response = await fetch('/api/files', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientId: fileData.clientId,
            name: fileData.file.name,
            url: fileUrl,
            size: formatFileSize(fileData.file.size),
            type: getFileType(fileData.file.name)
          })
        })

        if (response.ok) {
          setFiles(prev => {
            const updated = [...prev]
            updated[i] = { ...updated[i], status: 'success' }
            return updated
          })
        } else {
          throw new Error('فشل في رفع الملف')
        }
      } catch (error) {
        setFiles(prev => {
          const updated = [...prev]
          updated[i] = { 
            ...updated[i], 
            status: 'error', 
            error: error instanceof Error ? error.message : 'خطأ غير معروف'
          }
          return updated
        })
      }
    }

    setIsUploading(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    
    switch (extension) {
      case 'pdf': return 'تأسيسات'
      case 'bdf':
      case 'bdgf': return 'ملفات BDF'
      case 'dwg':
      case 'dxf': return 'رسوم هندسية'
      case 'doc':
      case 'docx': return 'مستندات'
      case 'xls':
      case 'xlsx': return 'جداول'
      case 'jpg':
      case 'jpeg':
      case 'png': return 'صور'
      case 'zip':
      case 'rar': return 'ملفات مضغوطة'
      default: return 'ملفات أخرى'
    }
  }

  const successCount = files.filter(f => f.status === 'success').length
  const errorCount = files.filter(f => f.status === 'error').length
  const pendingCount = files.filter(f => f.status === 'pending').length

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="رفع ملفات جماعي" 
        description="رفع ملفات BDF وغيرها لعدة عملاء دفعة واحدة" 
        icon={Upload} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/technical-office">
            <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary">
              العودة للمكتب الفني
            </Button>
          </Link>
        </div>

        {/* Step 1: Select Area */}
        <Card className="p-6 bg-card border-border mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">1. اختر المنطقة</h3>
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="bg-secondary border-border text-foreground">
              <SelectValue placeholder="اختر المنطقة" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.id.toString()}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {loadingClients && (
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>جاري تحميل العملاء...</span>
            </div>
          )}

          {clients.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                ✓ تم تحميل {clients.length} عميل من {areas.find(a => a.id.toString() === selectedArea)?.name}
              </p>
            </div>
          )}
        </Card>

        {/* Step 2: Upload Files */}
        {selectedArea && clients.length > 0 && (
          <Card className="p-6 bg-card border-border mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4">2. اختر مجلد الملفات</h3>
            
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                // @ts-ignore - webkitdirectory is not in TypeScript types yet
                webkitdirectory=""
                // @ts-ignore
                directory=""
                onChange={handleFolderSelect}
                className="hidden"
                id="folder-input"
                accept=".pdf,.bdf,.bdgf,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
              />
              <label htmlFor="folder-input" className="cursor-pointer">
                <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold text-foreground mb-2">اختر مجلد الملفات</p>
                <p className="text-sm text-muted-foreground mb-4">
                  سيتم مطابقة الملفات تلقائياً مع العملاء حسب الكود أو الاسم
                </p>
                <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <FolderOpen className="w-4 h-4 ml-2" />
                  اختر المجلد
                </Button>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">
                    الملفات المحددة ({files.length})
                  </h4>
                  <div className="flex gap-4 text-sm">
                    {pendingCount > 0 && (
                      <span className="text-amber-600">⏳ {pendingCount} في الانتظار</span>
                    )}
                    {successCount > 0 && (
                      <span className="text-green-600">✓ {successCount} نجح</span>
                    )}
                    {errorCount > 0 && (
                      <span className="text-red-600">✗ {errorCount} فشل</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {files.map((fileData, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-lg border ${
                        fileData.status === 'success' ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' :
                        fileData.status === 'error' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' :
                        fileData.status === 'uploading' ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' :
                        'bg-secondary/50 border-border'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {fileData.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {fileData.status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                        {fileData.status === 'uploading' && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
                        {fileData.status === 'pending' && <FileText className="w-5 h-5 text-muted-foreground" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{fileData.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(fileData.file.size)} • {getFileType(fileData.file.name)}
                        </p>
                        {fileData.error && (
                          <p className="text-xs text-red-600 mt-1">{fileData.error}</p>
                        )}
                      </div>

                      <div className="flex-shrink-0 w-48">
                        <Select
                          value={fileData.clientId}
                          onValueChange={(value: string) => handleClientChange(index, value)}
                          disabled={fileData.status === 'uploading' || fileData.status === 'success'}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="اختر العميل" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name} ({client.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {fileData.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveFile(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          حذف
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={handleUploadAll}
                    disabled={isUploading || files.length === 0 || files.every(f => f.status === 'success')}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        جاري الرفع...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 ml-2" />
                        رفع جميع الملفات ({pendingCount})
                      </>
                    )}
                  </Button>
                  
                  {(successCount > 0 || errorCount > 0) && (
                    <Button
                      onClick={() => setFiles([])}
                      variant="outline"
                      className="border-border text-foreground hover:bg-secondary"
                    >
                      مسح القائمة
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Instructions */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">تعليمات الاستخدام</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• اختر المنطقة أولاً لتحميل عملاء تلك المنطقة</li>
            <li>• اختر مجلد يحتوي على ملفات BDF أو أي ملفات أخرى</li>
            <li>• سيحاول النظام مطابقة الملفات تلقائياً مع العملاء حسب الكود أو الاسم</li>
            <li>• يمكنك تغيير العميل المخصص لكل ملف يدوياً</li>
            <li>• اضغط "رفع جميع الملفات" لحفظها في قاعدة البيانات</li>
            <li>• الأنواع المدعومة: PDF, BDF, BDGF, DWG, DXF, Word, Excel, صور، ZIP</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
