"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    const loginTime = localStorage.getItem("adminLoginTime")

    if (adminLoggedIn === "true" && loginTime) {
      // التحقق من أن الجلسة لم تنتهي (24 ساعة)
      const loginDate = new Date(loginTime)
      const now = new Date()
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)

      if (hoursDiff < 24) {
        setIsAuthenticated(true)
      } else {
        // انتهت الجلسة
        localStorage.removeItem("adminLoggedIn")
        localStorage.removeItem("adminLoginTime")
        router.push("/admin/login")
      }
    } else {
      router.push("/admin/login")
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-500 text-lg font-bold">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
