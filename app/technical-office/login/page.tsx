"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, User, MapPin } from "lucide-react"

// بيانات تسجيل الدخول لكل منطقة مع روابط Google Drive
const areaCredentials: Record<number, { username: string; password: string; name: string; driveLink: string }> = {
  1: { 
    username: "cap", 
    password: "cap", 
    name: "العاصمة الإدارية",
    driveLink: "https://drive.google.com/drive/folders/1HbwL6NKJhIbPqONsczTWK7sXBl5l2qGv?usp=drive_link"
  },
  2: { 
    username: "new", 
    password: "new", 
    name: "القاهرة الجديدة",
    driveLink: "https://drive.google.com/drive/folders/1hk92APPjFUGfWbWv_FdPZ6SRLGW01cOz?usp=sharing"
  },
  3: { 
    username: "tag", 
    password: "tag", 
    name: "التجمع الخامس",
    driveLink: "https://drive.google.com/drive/folders/1szoma6_PqGnsMmWtZkxL7PT51rMIfbRF?usp=sharing"
  },
  4: { 
    username: "dow", 
    password: "dow", 
    name: "وسط",
    driveLink: "https://drive.google.com/drive/folders/161L8kXX93ZTVG9xHY0xuedQ1G01tB7Wp?usp=sharing"
  },
  5: { 
    username: "oct", 
    password: "oct", 
    name: "أكتوبر",
    driveLink: "https://drive.google.com/drive/folders/1wohvwk2TZMEhwoaXW9YeKVZumBJn3l8-?usp=sharing"
  },
  6: { 
    username: "reg", 
    password: "reg", 
    name: "الأقاليم",
    driveLink: "https://drive.google.com/drive/folders/1gp2s_AyuGdj1vFgLyy2GW1F8r_IQ3Dh0?usp=sharing"
  },
}

// يوزرات المهندسين لكل منطقة مع معلومات إضافية
const engineerCredentials: Record<number, { username: string; password: string; areaId: number }[]> = {
  1: [{ username: "ahmed.elazaby", password: "273742", areaId: 1 }], // العاصمة
  2: [{ username: "mostafa.kamal", password: "589130", areaId: 2 }], // القاهرة الجديدة
  3: [{ username: "mohamed.medhat", password: "593094", areaId: 3 }], // التجمع
  4: [{ username: "ahmed.bassyouni", password: "221382", areaId: 4 }], // وسط
  5: [{ username: "ahmed.hamed", password: "426815", areaId: 5 }], // أكتوبر
  6: [{ username: "mohamed.salah", password: "416769", areaId: 6 }], // الأقاليم
}

// قائمة المديرين الذين لهم صلاحيات كاملة
const adminCredentials = [
  { username: "gm", password: "9528" }, // رئيس مجلس الإدارة
  { username: "QTY", password: "mm212" }, // مدير الجودة
  { username: "QTY2", password: "mm2123" }, // مهندس الجودة
]

export default function TechnicalOfficeLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-t-primary border-primary/20 rounded-full animate-spin" /></div>}>
      <TechnicalOfficeLoginContent />
    </Suspense>
  )
}

function TechnicalOfficeLoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const areaId = searchParams.get("area")
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const areaInfo = areaId ? areaCredentials[parseInt(areaId)] : null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!areaId || !areaInfo) {
      setError("منطقة غير صحيحة")
      setLoading(false)
      return
    }

    const currentAreaId = parseInt(areaId)

    // التحقق من المديرين (صلاحيات كاملة)
    const isAdmin = adminCredentials.some(admin => admin.username === username && admin.password === password)
    
    // التحقق من المهندس المسؤول عن المنطقة
    const areaEngineers = engineerCredentials[currentAreaId] || []
    const isAreaEngineer = areaEngineers.some(eng => eng.username === username && eng.password === password)
    
    // التحقق من بيانات الدخول العامة للمنطقة
    const isAreaCredential = username === areaInfo.username && password === areaInfo.password

    // Master account
    const isMasterAccount = username === "admin" && password === "admin2026"

    if (isMasterAccount || isAdmin || isAreaCredential) {
      // المديرين والـ Master account يدخلون مباشرة بدون تسجيل دخول
      // حفظ صلاحيات جميع المناطق
      for (let i = 1; i <= 6; i++) {
        localStorage.setItem(`area_${i}_auth`, "true")
        localStorage.setItem(`area_${i}_timestamp`, Date.now().toString())
      }
      
      // الانتقال مباشرة إلى Google Drive
      window.location.href = areaInfo.driveLink
    } else if (isAreaEngineer) {
      // المهندس يدخل على منطقته مباشرة بدون تسجيل دخول
      localStorage.setItem(`area_${currentAreaId}_auth`, "true")
      localStorage.setItem(`area_${currentAreaId}_timestamp`, Date.now().toString())
      
      // الانتقال مباشرة إلى Google Drive
      window.location.href = areaInfo.driveLink
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }
    
    setLoading(false)
  }

  if (!areaId || !areaInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <p className="text-red-500 text-lg">منطقة غير صحيحة</p>
          <Button 
            onClick={() => router.push("/technical-office")} 
            className="mt-4"
          >
            العودة للمكتب الفني
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="p-8 max-w-md w-full shadow-2xl border-2 border-primary/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-4">
            <MapPin className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">تسجيل الدخول</h1>
          <p className="text-lg text-muted-foreground font-semibold">{areaInfo.name}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              اسم المستخدم
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="أدخل اسم المستخدم"
              className="h-12 text-xl font-semibold text-gray-900"
              required
              dir="ltr"
              style={{ fontSize: '1.25rem', fontWeight: '600' }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4" />
              كلمة المرور
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              className="h-12 text-xl font-semibold text-gray-900"
              required
              dir="ltr"
              style={{ fontSize: '1.25rem', fontWeight: '600' }}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-center font-semibold">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold"
            disabled={loading}
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => router.push("/technical-office")}
          >
            العودة للمكتب الفني
          </Button>
        </form>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            للحصول على بيانات الدخول، يرجى التواصل مع الإدارة
          </p>
        </div>
      </Card>
    </div>
  )
}