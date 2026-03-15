"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, LogIn, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PageBackgroundSlideshow } from "@/components/page-background-slideshow"

export default function LoginPage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // التحقق من بيانات الدخول
    if (userId && password) {
      localStorage.setItem("userLoggedIn", "true")
      localStorage.setItem("userId", userId)
      localStorage.setItem("loginTime", new Date().toISOString())
      router.push("/")
    } else {
      setError("يرجى إدخال ID وكلمة المرور")
    }

    setIsLoading(false)
  }

  return (
    <main className="relative min-h-screen" dir="rtl">
      {/* Background Slideshow */}
      <PageBackgroundSlideshow />

      {/* زر لوحة التحكم - في الأعلى على اليسار */}
      <div className="fixed top-8 left-8 z-50">
        <div className="relative group">
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/70 transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-amber-300/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Settings className="w-8 h-8 animate-spin-slow" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-black leading-tight">لوحة التحكم</p>
                <p className="text-sm text-amber-100 font-bold">Dashboard</p>
              </div>
            </div>
          </div>
          
          {/* القائمة المنسدلة */}
          <div className="absolute top-full left-0 mt-2 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="bg-white rounded-xl shadow-2xl border-2 border-amber-300 overflow-hidden">
              <Link href="/admin/dashboard/login?role=admin">
                <div className="px-6 py-4 hover:bg-amber-50 transition-colors cursor-pointer border-b border-gray-200">
                  <p className="font-black text-gray-900 text-lg">المدير العام</p>
                  <p className="text-sm text-gray-600">General Manager</p>
                </div>
              </Link>
              <Link href="/admin/dashboard/login?role=developer">
                <div className="px-6 py-4 hover:bg-amber-50 transition-colors cursor-pointer">
                  <p className="font-black text-gray-900 text-lg">المطور</p>
                  <p className="text-sm text-gray-600">Developer</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src="/placeholder-logo.png"
                  alt="شوقي جروب"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
              <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">دليل شوقي جروب</h1>
              <p className="text-amber-200 text-xl font-bold drop-shadow-md">منصة الموظفين الداخلية</p>
            </div>

            {/* Login Card */}
            <Card className="p-10 shadow-2xl border-4 border-amber-300 bg-white/95 backdrop-blur-md">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <LogIn className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">تسجيل الدخول</h2>
                <p className="text-gray-600 text-lg">مرحباً بك في دليل الموظف</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="userId" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                    <User className="w-5 h-5 text-amber-600" />
                    ID
                  </Label>
                  <Input
                    id="userId"
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="أدخل الـ ID الخاص بك"
                    className="h-14 text-lg border-2 border-gray-300 focus:border-amber-500 font-bold"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                    <Lock className="w-5 h-5 text-amber-600" />
                    كلمة المرور
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="h-14 text-lg border-2 border-gray-300 focus:border-amber-500 font-bold"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 text-center">
                    <p className="text-red-700 font-bold">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 text-2xl font-black bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/70 transition-all duration-300"
                >
                  {isLoading ? "جاري التحقق..." : "دخول"}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  للحصول على بيانات الدخول، التواصل مع AI Developer
                </p>
              </div>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white text-sm mb-4 drop-shadow-lg font-bold">
                © 2026 شوقي جروب - جميع الحقوق محفوظة
              </p>
              <div className="flex items-center justify-center gap-4">
                <a href="tel:01111119528" className="text-amber-200 hover:text-amber-100 font-bold text-sm drop-shadow-md">
                  📞 01111119528
                </a>
                <span className="text-white/50">|</span>
                <a href="mailto:info@shawkygroup.com" className="text-amber-200 hover:text-amber-100 font-bold text-sm drop-shadow-md">
                  ✉️ info@shawkygroup.com
                </a>
              </div>
              <div className="mt-4">
                <p className="text-amber-300 text-xs font-bold drop-shadow-md">
                  الإصدار v0.1.1
                </p>
              </div>
            </div>
          </div>
        </div>
    </main>
  )
}
