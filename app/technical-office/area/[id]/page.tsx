"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, UserCircle, ArrowRight, FileText, Loader2, Lock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Client {
  id: string
  name: string
  code: string
  package: string
  areaId: number
  gender?: string
  files: any[]
}

// أسماء إناث شائعة للتعرف التلقائي
const femaleNames = [
  'ندي', 'ندى', 'نادية', 'ميادة', 'شيريهان', 'سوزان', 'سوسن', 'منى', 'مني', 'هبة', 'هبه',
  'نهى', 'نهي', 'سارة', 'ساره', 'فاطمة', 'فاطمه', 'عائشة', 'عايشة', 'خديجة', 'خديجه',
  'مريم', 'ياسمين', 'ياسمينا', 'دينا', 'دينة', 'رانيا', 'رانية', 'إيمان', 'ايمان',
  'سلمى', 'سلمي', 'نور', 'نورا', 'نوره', 'لمياء', 'لمياؤ', 'إسراء', 'اسراء', 'آية', 'ايه',
  'ريم', 'ريهام', 'داليا', 'دالية', 'علياء', 'علياؤ', 'شيماء', 'شيماؤ', 'أسماء', 'اسماء'
]

// دالة للتعرف على الجنس من الاسم
function detectGender(name: string): 'male' | 'female' {
  const nameLower = name.toLowerCase().trim()
  const firstName = nameLower.split(' ')[0]
  
  // تحقق من الأسماء النسائية
  for (const femaleName of femaleNames) {
    if (firstName.includes(femaleName.toLowerCase()) || nameLower.includes(femaleName.toLowerCase())) {
      return 'female'
    }
  }
  
  return 'male'
}


// بيانات المناطق مع روابط Google Drive
const areasData: Record<number, { name: string; driveLink: string }> = {
  1: { 
    name: "العاصمة الإدارية",
    driveLink: "https://drive.google.com/drive/folders/1gbY2L__atgj4ldTAst5kt0MUk-UPECua?usp=drive_link"
  },
  2: { 
    name: "القاهرة الجديدة",
    driveLink: "https://drive.google.com/drive/folders/1FQx824rbptTI5XnerU1yL8jgr-exNJ28?usp=sharing"
  },
  3: { 
    name: "التجمع الخامس",
    driveLink: "https://drive.google.com/drive/folders/1rjRXzPYnBRvH781XMREKmT4a1lw4ksib?usp=sharing"
  },
  4: { 
    name: "وسط",
    driveLink: "https://drive.google.com/drive/folders/1PuuDkHNHADwikE14_cycaDjNeXJk3ia5?usp=sharing"
  },
  5: { 
    name: "أكتوبر",
    driveLink: "https://drive.google.com/drive/folders/16tr64CqiMXODWqet3foBkX3s5LUMu7Pj?usp=sharing"
  },
  6: { 
    name: "الأقاليم",
    driveLink: "https://drive.google.com/drive/folders/14RA5_-P6fG06u39LRpoYy_H9kTA9Xr1d?usp=sharing"
  },
}

export default function AreaPage() {
  const router = useRouter()
  const params = useParams()
  const areaId = Number(params.id)

  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const areaInfo = areasData[areaId]
  const areaName = areaInfo?.name || `المنطقة ${areaId}`

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem(`area_${areaId}_auth`)
      const timestamp = localStorage.getItem(`area_${areaId}_timestamp`)
      
      if (auth === "true" && timestamp) {
        const loginTime = parseInt(timestamp)
        const currentTime = Date.now()
        const hoursPassed = (currentTime - loginTime) / (1000 * 60 * 60)
        
        // الجلسة صالحة لمدة 24 ساعة
        if (hoursPassed < 24) {
          setIsAuthenticated(true)
        } else {
          // انتهت صلاحية الجلسة
          localStorage.removeItem(`area_${areaId}_auth`)
          localStorage.removeItem(`area_${areaId}_timestamp`)
          router.push(`/technical-office/login?area=${areaId}`)
        }
      } else {
        // غير مسجل دخول
        router.push(`/technical-office/login?area=${areaId}`)
      }
    }

    checkAuth()
  }, [areaId, router])

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/clients-from-folders?areaId=${areaId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.clients) {
            setClients(data.clients)
          }
        }
      } catch (error) {
        console.error('Failed to load clients:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [areaId, isAuthenticated])

  const handleLogout = () => {
    localStorage.removeItem(`area_${areaId}_auth`)
    localStorage.removeItem(`area_${areaId}_timestamp`)
    router.push('/technical-office')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">جاري تحميل العملاء...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={areaName} description={`${clients.length} عميل`} icon={User} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <Link href="/technical-office">
            <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary bg-transparent">
              <ArrowRight className="w-4 h-4" />
              العودة للمناطق
            </Button>
          </Link>
          
          <div className="flex gap-3">
            {areaInfo?.driveLink && (
              <Button 
                onClick={() => window.open(areaInfo.driveLink, '_blank')}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <FileText className="w-4 h-4" />
                فتح Google Drive
              </Button>
            )}
            
            <Button 
              onClick={handleLogout}
              variant="destructive"
              className="gap-2"
            >
              <Lock className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((client) => {
            const gender = detectGender(client.name)
            const isFemale = gender === 'female'
            
            return (
              <Link key={client.id} href={`/technical-office/client/${client.id}`}>
                <Card className="group relative overflow-hidden bg-gradient-to-br from-card to-card/80 border-2 border-border hover:border-primary/60 transition-all duration-500 p-6 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                          {client.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 font-medium">
                          كود: <span className="text-primary font-mono">{client.code}</span>
                        </p>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 flex-shrink-0 ml-3">
                        {isFemale ? (
                          <UserCircle className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                          <User className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border/50 group-hover:border-primary/30 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-medium">عدد الملفات</span>
                        <div className="flex items-center gap-2 bg-primary/10 group-hover:bg-primary/20 px-3 py-1.5 rounded-full border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-bold text-primary text-sm">{client.files.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
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
