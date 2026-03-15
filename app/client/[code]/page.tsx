"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { FileText, Download, User, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ClientPage() {
  const params = useParams()
  const code = params.code as string
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clients-from-folders')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('Looking for code:', code)
          console.log('Available clients:', data.clients.length)
          const foundClient = data.clients.find((c: any) => {
            console.log('Comparing:', c.code, 'with', code)
            return String(c.code) === String(code)
          })
          console.log('Found client:', foundClient)
          setClient(foundClient)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching clients:', err)
        setLoading(false)
      })
  }, [code])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="text-center py-12">
          <p className="text-xl text-primary">جاري التحميل...</p>
        </div>
      </main>
    )
  }

  if (!client) {
    return (
      <main className="min-h-screen bg-background">
        <div className="text-center py-12">
          <p className="text-xl text-red-500 mb-4">العميل غير موجود</p>
          <p className="text-sm text-muted-foreground mb-2">الكود المطلوب: {code}</p>
          <p className="text-sm text-muted-foreground mb-4">
            تحقق من console في المتصفح لمزيد من التفاصيل (F12)
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/technical-office" className="text-primary underline">
              العودة للمكتب الفني
            </Link>
            <Link href="/test-client" className="text-primary underline">
              صفحة الاختبار
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        title={client.name} 
        description={`كود: ${client.code} | المنطقة: ${client.areaName}`} 
        icon={User} 
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/technical-office" className="text-primary hover:underline">
            ← العودة للمكتب الفني
          </Link>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">معلومات العميل</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">الاسم</p>
              <p className="text-lg font-semibold text-foreground">{client.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الكود</p>
              <p className="text-lg font-semibold text-foreground">{client.code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">المنطقة</p>
              <p className="text-lg font-semibold text-foreground">{client.areaName}</p>
            </div>
          </div>
        </Card>

        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          ملفات PDF ({client.filesCount})
        </h2>

        {client.filesCount === 0 ? (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">لا توجد ملفات لهذا العميل</p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {client.files?.map((fileName: string, index: number) => {
              const filePath = `${client.folderPath}/${fileName}`
              return (
                <Card key={index} className="p-4 hover:border-primary transition-all group">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm mb-2 truncate" title={fileName}>
                        {fileName}
                      </h3>
                      <div className="flex gap-2">
                        <a
                          href={filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          فتح
                        </a>
                        <a
                          href={filePath}
                          download
                          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          تحميل
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
