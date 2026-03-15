"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { MapPin, Map, Users, FolderOpen } from "lucide-react"

export default function AreasPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    console.log("useEffect started")
    
    fetch('/api/clients-from-folders')
      .then(res => {
        console.log("Response received:", res.status)
        return res.json()
      })
      .then(data => {
        console.log("Data parsed:", data)
        if (data.success && data.clients) {
          console.log("Setting clients:", data.clients.length)
          setClients(data.clients)
        } else {
          setError("No clients data")
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const areas = [
    { 
      id: 1, 
      name: "الشيخ زايد", 
      description: "عملاء منطقة الشيخ زايد",
      driveLink: "" // سيتم إضافة الرابط لاحقاً
    },
    { 
      id: 2, 
      name: "القاهرة الجديدة", 
      description: "عملاء منطقة القاهرة الجديدة",
      driveLink: "https://drive.google.com/drive/folders/1FQx824rbptTI5XnerU1yL8jgr-exNJ28?usp=sharing"
    },
    { 
      id: 3, 
      name: "التجمع الخامس", 
      description: "عملاء منطقة التجمع الخامس",
      driveLink: "https://drive.google.com/drive/folders/1rjRXzPYnBRvH781XMREKmT4a1lw4ksib?usp=sharing"
    },
    { 
      id: 4, 
      name: "وسط - مدينة نصر", 
      description: "عملاء منطقة وسط ومدينة نصر",
      driveLink: "https://drive.google.com/drive/folders/1PuuDkHNHADwikE14_cycaDjNeXJk3ia5?usp=sharing"
    },
    { 
      id: 5, 
      name: "أكتوبر", 
      description: "عملاء منطقة أكتوبر",
      driveLink: "https://drive.google.com/drive/folders/16tr64CqiMXODWqet3foBkX3s5LUMu7Pj?usp=sharing"
    },
    { 
      id: 6, 
      name: "الأقاليم", 
      description: "عملاء الأقاليم",
      driveLink: "https://drive.google.com/drive/folders/14RA5_-P6fG06u39LRpoYy_H9kTA9Xr1d?usp=sharing"
    },
    { 
      id: 7, 
      name: "العاصمة الإدارية", 
      description: "عملاء منطقة العاصمة الإدارية",
      driveLink: "https://drive.google.com/drive/folders/1gbY2L__atgj4ldTAst5kt0MUk-UPECua?usp=drive_link"
    },
  ]

  console.log("Render - loading:", loading, "clients:", clients.length, "error:", error)

  return (
    <main className="min-h-screen bg-background">
      <PageHeader title="المناطق" description="معلومات وتفاصيل المناطق والعملاء" icon={MapPin} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-primary">جاري تحميل العملاء...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-xl text-red-500">خطأ: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 text-center">
              <p className="text-2xl text-primary font-bold">إجمالي العملاء: {clients.length}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {areas.map((area) => {
                const areaClients = clients.filter(c => c.areaId === area.id)
                
                return (
                  <Card key={area.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-xl">
                    {/* عدد العملاء في الأعلى */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
                          <Map className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{area.name}</h3>
                          <p className="text-sm text-muted-foreground">{area.description}</p>
                        </div>
                      </div>
                      
                      {/* عدد العملاء بشكل بارز */}
                      <div className="flex flex-col items-center bg-gradient-to-br from-primary/20 to-primary/10 px-6 py-3 rounded-xl border-2 border-primary/30">
                        <Users className="w-6 h-6 text-primary mb-1" />
                        <span className="text-3xl font-bold text-primary">{areaClients.length}</span>
                        <span className="text-xs text-muted-foreground font-semibold">عميل</span>
                      </div>
                    </div>
                    
                    {/* رابط جوجل درايف */}
                    {area.driveLink ? (
                      <a
                        href={area.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105 duration-300"
                      >
                        <FolderOpen className="w-6 h-6" />
                        <span className="text-lg">فتح ملفات العملاء</span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gray-200 text-gray-500 rounded-xl font-semibold">
                        <FolderOpen className="w-6 h-6" />
                        <span>لا يوجد رابط متاح</span>
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
