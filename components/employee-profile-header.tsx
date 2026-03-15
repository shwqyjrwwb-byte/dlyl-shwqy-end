"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User, Settings } from "lucide-react"
import Image from "next/image"

interface EmployeeData {
  name: string
  position: string
  department: string
  image?: string
}

export function EmployeeProfileHeader() {
  const router = useRouter()
  const [employee, setEmployee] = useState<EmployeeData | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const employeeData = localStorage.getItem("employeeData")
    
    if (!userId) {
      router.push("/")
      return
    }

    if (employeeData) {
      const data = JSON.parse(employeeData)
      setEmployee(data)
      // التحقق إذا كان المدير (اليوزر: gm)
      setIsAdmin(userId === "gm")
    }
  }, [router])

  const handleLogout = async () => {
    const userId = localStorage.getItem("userId")
    
    // إزالة المستخدم من الأونلاين
    if (userId) {
      try {
        await fetch("/api/users/online", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        })
      } catch (error) {
        console.error("Error updating online status:", error)
      }
    }

    // حذف بيانات الجلسة فقط (نبقي على userId و userPassword للتسجيل التلقائي)
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("employeeData")
    localStorage.removeItem("loginTime")
    
    // حذف صلاحيات المناطق
    for (let i = 1; i <= 6; i++) {
      localStorage.removeItem(`area_${i}_auth`)
      localStorage.removeItem(`area_${i}_timestamp`)
    }
    
    router.push("/")
  }

  if (!employee) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-black via-gray-900 to-black border-b-4 border-amber-500 shadow-2xl shadow-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-amber-500 shadow-xl">
                {employee.image ? (
                  <Image
                    src={employee.image}
                    alt={employee.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-amber-600 text-black">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-amber-500">{employee.name}</h2>
              <p className="text-amber-300 font-bold">{employee.position}</p>
              <p className="text-amber-600 text-sm">{employee.department}</p>
            </div>
          </div>

          <div className="flex gap-3">
            {isAdmin && (
              <Button
                onClick={() => router.push('/admin/dashboard')}
                className="gap-2 h-12 px-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-bold shadow-xl"
              >
                <Settings className="w-5 h-5" />
                لوحة التحكم
              </Button>
            )}
            <Button
              onClick={handleLogout}
              className="gap-2 h-12 px-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold shadow-xl"
            >
              <LogOut className="w-5 h-5" />
              تسجيل خروج
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
