"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function WorkPermitAdminAuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // التحقق من تسجيل الدخول للتصاريح
    const workPermitAdminLoggedIn = localStorage.getItem("workPermitAdminLoggedIn")
    const loginTime = localStorage.getItem("workPermitAdminLoginTime")

    if (workPermitAdminLoggedIn === "true" && loginTime) {
      // التحقق من أن الجلسة لم تنتهي (24 ساعة)
      const loginDate = new Date(loginTime)
      const now = new Date()
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)

      if (hoursDiff < 24) {
        setIsAuthenticated(true)
      } else {
        // انتهت الجلسة
        localStorage.removeItem("workPermitAdminLoggedIn")
        localStorage.removeItem("workPermitAdminLoginTime")
        router.push("/admin/work-permits/login")
      }
    } else {
      router.push("/admin/work-permits/login")
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-500 text-lg font-bold">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
