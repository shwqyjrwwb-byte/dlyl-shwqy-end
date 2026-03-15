"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Lock } from "lucide-react"
import Image from "next/image"

export default function DashboardLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<"admin" | "developer">("admin")

  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam === "developer") {
      setRole("developer")
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // التحقق من كلمة المرور
    if (role === "admin" && password === "9528") {
      localStorage.setItem("dashboardLoggedIn", "true")
      localStorage.setItem("dashboardRole", "admin")
      localStorage.setItem("dashboardLoginTime", new Date().toISOString())
      router.push("/admin/dashboard")
    } else if (role === "developer" && password === "dev1") {
      localStorage.setItem("dashboardLoggedIn", "true")
      localStorage.setItem("dashboardRole", "developer")
      localStorage.setItem("dashboardLoginTime", new Date().toISOString())
      router.push("/admin/dashboard")
    } else {
      setError("كلمة المرور غير صحيحة")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-transparent"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Profile */}
        <div className="text-center mb-8">
          {/* صورة المهندس أحمد أو المطور */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl shadow-amber-500/50 mx-auto">
              <Image
                src={role === "admin" ? "/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg" : "/placeholder-user.jpg"}
                alt={role === "admin" ? "م/ أحمد شوقي" : "Developer"}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent mb-3">
            لوحة التحكم
          </h1>
          <p className="text-amber-300 text-xl font-bold mb-4">دليل شوقي جروب</p>
          
          <div className="mt-4 inline-block bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-3 rounded-full shadow-xl shadow-amber-500/50 border-2 border-amber-400">
            <p className="text-black font-black text-2xl">
              {role === "admin" ? "رئيس مجلس الإدارة" : "المطور"}
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-2xl shadow-amber-500/30 border-4 border-amber-500 bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-amber-500 mb-2">تسجيل الدخول</h2>
            <p className="text-amber-300 font-bold">أدخل كلمة المرور للوصول</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="password" className="text-lg font-bold flex items-center gap-2 mb-3 text-amber-400">
                <Lock className="w-5 h-5 text-amber-500" />
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="h-14 text-lg border-2 border-amber-600 bg-black text-amber-100 placeholder:text-amber-700 focus:border-amber-500 focus:ring-amber-500"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-4 text-center">
                <p className="text-red-400 font-bold text-lg">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 text-xl font-black bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black shadow-xl shadow-amber-500/50 border-2 border-amber-400 transition-all duration-300 hover:scale-105"
            >
              {isLoading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t-2 border-amber-600/30">
            <p className="text-sm text-amber-400 text-center font-bold">
              للحصول على صلاحيات الدخول، يرجى التواصل مع الإدارة
            </p>
          </div>
        </Card>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-amber-300 text-sm font-bold">
            © 2026 شوقي جروب - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </div>
  )
}
