"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Download, Trash2, X, Save } from "lucide-react"

interface PDFFile {
  id: string
  name: string
  size: number
  uploadDate: string
  url: string
  type?: string
}

interface PDFUploadSectionProps {
  clientId?: string
  onFileUpload?: (file: PDFFile) => void
}

export function PDFUploadSection({ clientId, onFileUpload }: PDFUploadSectionProps) {
  const [files, setFiles] = useState<PDFFile[]>([])
  const [pendingFiles, setPendingFiles] = useState<PDFFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    // قبول جميع أنواع الملفات
    const allowedTypes = [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "image/jpeg",
      "image/png",
      "image/jpg",
      "text/plain", // .txt
      "application/zip", // .zip
      "application/x-rar-compressed", // .rar
    ]

    // قبول الملفات المسموحة أو أي ملف بامتداد محدد
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.txt', '.zip', '.rar', '.bdgf', '.dwg', '.dxf']
    
    const validFiles = Array.from(fileList).filter((file) => {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      return allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)
    })

    if (validFiles.length === 0) {
      alert("نوع الملف غير مدعوم. الأنواع المدعومة: PDF, Word, Excel, صور, TXT, ZIP, RAR, BDGF, DWG, DXF")
      return
    }

    const newFiles: PDFFile[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      uploadDate: new Date().toLocaleString("ar-EG"),
      url: URL.createObjectURL(file),
      type: getFileType(file.name), // تحديد نوع الملف تلقائياً
    }))

    // إضافة الملفات للقائمة المعلقة (في انتظار الحفظ)
    setPendingFiles((prev) => [...prev, ...newFiles])
  }

  // دالة لتحديد نوع الملف حسب الامتداد
  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    
    switch (extension) {
      case 'pdf':
        return 'تأسيسات'
      case 'doc':
      case 'docx':
        return 'مستندات'
      case 'xls':
      case 'xlsx':
        return 'جداول'
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'صور'
      case 'dwg':
      case 'dxf':
        return 'رسوم هندسية'
      case 'bdgf':
        return 'ملفات BDGF'
      case 'zip':
      case 'rar':
        return 'ملفات مضغوطة'
      case 'txt':
        return 'ملفات نصية'
      default:
        return 'ملفات أخرى'
    }
  }

  const handleDelete = (id: string, isPending: boolean = false) => {
    if (isPending) {
      const file = pendingFiles.find((f) => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.url)
      }
      setPendingFiles((prev) => prev.filter((f) => f.id !== id))
    } else {
      const file = files.find((f) => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.url)
      }
      setFiles((prev) => prev.filter((f) => f.id !== id))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const handleSaveFiles = async () => {
    if (pendingFiles.length === 0) {
      alert("لا توجد ملفات جديدة للحفظ")
      return
    }

    if (!clientId) {
      alert("معرف العميل غير موجود")
      return
    }

    setIsSaving(true)

    try {
      // حفظ كل ملف في قاعدة البيانات
      const savedFiles = []
      
      for (const file of pendingFiles) {
        const response = await fetch('/api/files', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientId,
            name: file.name,
            url: file.url,
            size: formatFileSize(file.size),
            type: file.type || "تأسيسات"
          })
        })

        if (response.ok) {
          const savedFile = await response.json()
          savedFiles.push(savedFile)
        } else {
          throw new Error('فشل في حفظ الملف: ' + file.name)
        }
      }

      // نقل الملفات من المعلقة إلى المحفوظة
      setFiles((prev) => [...prev, ...pendingFiles])
      
      // استدعاء callback إذا كان موجوداً
      if (onFileUpload) {
        pendingFiles.forEach(file => onFileUpload(file))
      }

      // مسح الملفات المعلقة
      setPendingFiles([])
      
      alert(`تم حفظ ${savedFiles.length} ملف بنجاح في قاعدة البيانات!`)
    } catch (error) {
      alert("حدث خطأ أثناء حفظ الملفات: " + (error instanceof Error ? error.message : 'خطأ غير معروف'))
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">ملفات المشروع</h3>
          <span className="text-sm text-muted-foreground">{files.length} ملف محفوظ</span>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt,.zip,.rar,.bdgf,.dwg,.dxf" multiple onChange={handleChange} className="hidden" />

          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold text-foreground mb-2">اسحب وأفلت الملفات هنا</p>
          <p className="text-xs text-muted-foreground mb-4">PDF, Word, Excel, صور, BDGF, DWG, ZIP وأكثر</p>
          <Button onClick={onButtonClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
            اختر الملفات
          </Button>
        </div>

        {/* Pending Files (في انتظار الحفظ) */}
        {pendingFiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">ملفات جديدة (في انتظار الحفظ):</h4>
              <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded">
                {pendingFiles.length} ملف
              </span>
            </div>
            <div className="space-y-2">
              {pendingFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-2 border-amber-200 dark:border-amber-800"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-8 h-8 text-amber-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {file.uploadDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(file.id, true)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* زر الحفظ */}
            <Button
              onClick={handleSaveFiles}
              disabled={isSaving}
              className="w-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 ml-2" />
              {isSaving ? "جاري الحفظ..." : `حفظ ${pendingFiles.length} ملف في قاعدة البيانات`}
            </Button>
          </div>
        )}

        {/* Saved Files */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">الملفات المحفوظة:</h4>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {file.uploadDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <a href={file.url} download={file.name}>
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(file.id, false)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
