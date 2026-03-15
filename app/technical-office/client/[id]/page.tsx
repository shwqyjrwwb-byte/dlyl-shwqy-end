"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PDFUploadSection } from "@/components/pdf-upload-section"
import { UserCircle, ArrowRight, FileText, Download, Package, Code, Trash2, Loader2, Upload } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface ClientFile {
  id: string
  name: string
  url: string
  uploadedAt: string
  size: string
  type: string
}

interface Client {
  id: string
  name: string
  code: string
  package: string
  areaId: number
  files: ClientFile[]
}

export default function ClientPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string

  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Load client data from database
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`/api/clients/${clientId}`)
        if (response.ok) {
          const data = await response.json()
          setClient(data)
        } else {
          setError("العميل غير موجود")
        }
      } catch (err) {
        setError("فشل في تحميل بيانات العميل")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [clientId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">جاري تحميل بيانات العميل...</p>
        </div>
      </div>
    )
  }

  if (error || !client) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{error || "العميل غير موجود"}</h2>
          <Link href="/technical-office">
            <Button>العودة للمكتب الفني</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFileUpload = async (file: { id: string; name: string; size: number; uploadDate: string; url: string; type?: string }) => {
    // Reload client data to get updated files from database
    try {
      const response = await fetch(`/api/clients/${clientId}`)
      if (response.ok) {
        const data = await response.json()
        setClient(data)
      }
    } catch (err) {
      console.error("Failed to reload client data:", err)
    }
  }

  const handleOpenFile = (url: string) => {
    // Open file in new tab
    window.open(url, '_blank')
  }

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الملف؟")) {
      return
    }

    try {
      const response = await fetch(`/api/files?id=${fileId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Update local state
        setClient(prev => {
          if (!prev) return prev
          return {
            ...prev,
            files: prev.files.filter(f => f.id !== fileId)
          }
        })
        alert("تم حذف الملف بنجاح")
      } else {
        alert("فشل في حذف الملف")
      }
    } catch (err) {
      alert("حدث خطأ أثناء حذف الملف")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={client.name} description={`معلومات المشروع والملفات`} icon={UserCircle} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="gap-2 border-border text-foreground hover:bg-secondary"
          >
            <ArrowRight className="w-4 h-4" />
            العودة
          </Button>
          <Link href="/technical-office">
            <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary bg-transparent">
              المناطق
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Client Information Card */}
          <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-2 border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <UserCircle className="w-6 h-6 text-primary" />
              </div>
              معلومات العميل
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 bg-background/60 rounded-lg border border-border/50">
                <span className="text-sm text-muted-foreground font-medium">الاسم</span>
                <span className="text-lg font-bold text-foreground">{client.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-background/60 rounded-lg border border-border/50">
                <span className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                  <Code className="w-4 h-4" />
                  كود العميل
                </span>
                <span className="text-lg font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {client.code}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-background/60 rounded-lg border border-border/50">
                <span className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                  <Package className="w-4 h-4" />
                  الباقة
                </span>
                <span className="text-lg font-bold text-primary bg-gradient-to-r from-primary/15 to-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  {client.package}
                </span>
              </div>
            </div>
          </Card>

          {/* Project Files Card */}
          <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-2 border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              ملفات المشروع
              <span className="text-sm bg-primary/15 text-primary px-3 py-1 rounded-full font-bold">
                {client.files.length}
              </span>
            </h3>
            {client.files.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {client.files.map((file) => (
                  <div
                    key={file.id}
                    className="group flex items-center justify-between p-4 bg-background/60 hover:bg-primary/5 rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="p-2 bg-primary/10 group-hover:bg-primary/20 rounded-lg transition-colors">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="bg-primary/15 text-primary px-2 py-1 rounded-md font-medium">
                            {file.type}
                          </span>
                          <span className="font-medium">{file.size}</span>
                          <span className="font-medium">
                            {new Date(file.uploadedAt).toLocaleDateString("ar-EG")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenFile(file.url)}
                        className="text-primary hover:text-primary hover:bg-primary/15 border border-primary/20 hover:border-primary/40 transition-all"
                        title="فتح الملف"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/15 border border-destructive/20 hover:border-destructive/40 transition-all"
                        title="حذف الملف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-background/30 rounded-xl border border-border/50">
                <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground font-medium">لا توجد ملفات مرفوعة حتى الآن</p>
                <p className="text-sm text-muted-foreground/70 mt-1">استخدم القسم أدناه لرفع ملفات جديدة</p>
              </div>
            )}
          </Card>
        </div>

        <div className="mb-6 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/15 rounded-full">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            رفع ملفات جديدة
          </h2>
          <p className="text-sm text-muted-foreground">
            يمكنك رفع ملفات PDF إضافية للمشروع - سيتم إضافتها تلقائياً إلى ملفات 
            <span className="font-semibold text-primary mx-1">{client.name}</span>
          </p>
        </div>

        <PDFUploadSection clientId={clientId} onFileUpload={handleFileUpload} />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.8);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
