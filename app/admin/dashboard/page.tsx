"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, FileText, LogOut, Settings, 
  MessageSquare, Download, Activity,
  CheckCircle, XCircle, Clock, Smile
} from "lucide-react"
import Image from "next/image"
import { SendMessageModal } from "@/components/send-message-modal"
import { PlaylistManager } from "@/components/playlist-manager"
import { OnlineEmployeesWidget } from "@/components/online-employees-widget"

export default function DashboardPage() {
  const router = useRouter()
  const [role, setRole] = useState<"admin" | "developer" | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [permits, setPermits] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const loggedIn = localStorage.getItem("dashboardLoggedIn")
    const userRole = localStorage.getItem("dashboardRole") as "admin" | "developer"
    const loginTime = localStorage.getItem("dashboardLoginTime")

    if (loggedIn === "true" && userRole && loginTime) {
      const loginDate = new Date(loginTime)
      const now = new Date()
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)

      if (hoursDiff < 24) {
        setRole(userRole)
        loadDashboardData()
        setIsLoading(false)
      } else {
        handleLogout()
      }
    } else {
      router.push("/admin/dashboard/login")
    }
  }, [router])

  const loadDashboardData = async () => {
    // تحميل التصاريح
    try {
      const response = await fetch("/api/work-permit")
      const data = await response.json()
      if (data.success) {
        setPermits(data.permits || [])
        
        // إنشاء النشاط الأخير من التصاريح
        const activity = (data.permits || []).slice(0, 5).map((permit: any) => ({
          type: 'permit',
          title: 'تصريح عمل جديد',
          description: `الموقع: ${permit.siteName} - المهندس: ${permit.engineerName}`,
          date: permit.submittedAt
        }))
        setRecentActivity(activity)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }

    // تحميل الموظفين الأونلاين
    try {
      const response = await fetch("/api/users/online")
      const data = await response.json()
      if (data.success && data.users.length > 0) {
        setEmployees(data.users.map((user: any) => ({
          name: user.userName,
          position: user.userPosition || "موظف"
        })))
      } else {
        // إذا لم يكن هناك موظفين أونلاين، عرض القائمة الافتراضية
        const employeesList = [
          { name: "م/ أحمد شوقي", position: "رئيس مجلس الإدارة" },
          { name: "م/ إيمان", position: "نائب رئيس مجلس الإدارة" },
          { name: "محمد عبد المنعم", position: "مدير الموارد البشرية" },
          { name: "إسلام خالد", position: "مدير المكتب الفني" },
          { name: "محمد شوقي", position: "مدير النجارة" },
          { name: "أحمد عبد الغني", position: "مدير الفرش والديكور" },
          { name: "وائل رأفت", position: "مدير الحسابات" },
          { name: "زينب عنتر", position: "مدير خدمة العملاء" }
        ]
        setEmployees(employeesList)
      }
    } catch (error) {
      console.error("Error loading online users:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("dashboardLoggedIn")
    localStorage.removeItem("dashboardRole")
    localStorage.removeItem("dashboardLoginTime")
    router.push("/admin/dashboard/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
          <p className="text-xl font-bold text-amber-500">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  const pendingPermits = permits.filter(p => p.status === "pending").length
  const approvedPermits = permits.filter(p => p.status === "approved").length
  const rejectedPermits = permits.filter(p => p.status === "rejected").length

  return (
    <div className="min-h-screen bg-black py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* زر الرجوع */}
        <div className="mb-6">
          <Button
            onClick={() => router.push('/home')}
            variant="outline"
            className="gap-2 h-12 px-6 bg-gray-900 border-2 border-amber-500 text-amber-500 hover:bg-amber-600 hover:text-black font-bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            رجوع للدليل
          </Button>
        </div>

        {/* Header with Welcome */}
        <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white p-8 rounded-3xl shadow-2xl shadow-amber-500/30 mb-8 border-4 border-amber-500 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-transparent"></div>
          </div>
          
          <div className="relative flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              {/* صورة المهندس أحمد أو المطور */}
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl shadow-amber-500/50">
                  <Image
                    src={role === "admin" ? "/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg" : "/placeholder-user.jpg"}
                    alt={role === "admin" ? "م/ أحمد شوقي" : "Omar Abdeen"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-5xl font-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                    {role === "admin" ? "مرحباً م/ أحمد" : "مرحباً Omar"}
                  </h1>
                  <Smile className="w-12 h-12 text-amber-500 animate-bounce" />
                </div>
                <p className="text-2xl font-bold text-amber-400 mb-1">
                  {role === "admin" ? "رئيس مجلس الإدارة" : "مطور النظام - Developer"}
                </p>
                <p className="text-lg text-amber-300">
                  {role === "admin" ? "كيف حالك اليوم؟ 🌟" : "How are you today? 🚀"}
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleLogout}
              className="gap-3 h-14 px-8 shadow-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black border-2 border-amber-400 font-black text-lg transition-all duration-300 hover:scale-105"
            >
              <LogOut className="w-6 h-6" />
              تسجيل الخروج
            </Button>
          </div>
        </div>

        {/* Admin Dashboard */}
        {role === "admin" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative p-6 bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl shadow-amber-500/20 border-2 border-amber-500 overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between mb-4">
                  <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-500/50">
                    <Users className="w-10 h-10 text-amber-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-amber-500">{employees.length}</p>
                    <p className="text-amber-400 font-bold text-lg">موظف</p>
                  </div>
                </div>
                <p className="relative text-sm font-bold text-amber-300">إجمالي الموظفين</p>
              </Card>

              <Card className="relative p-6 bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl shadow-yellow-500/20 border-2 border-yellow-500 overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between mb-4">
                  <div className="bg-yellow-500/20 p-3 rounded-xl border border-yellow-500/50">
                    <Clock className="w-10 h-10 text-yellow-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-yellow-500">{pendingPermits}</p>
                    <p className="text-yellow-400 font-bold text-lg">تصريح</p>
                  </div>
                </div>
                <p className="relative text-sm font-bold text-yellow-300">قيد المراجعة</p>
              </Card>

              <Card className="relative p-6 bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl shadow-green-500/20 border-2 border-green-500 overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between mb-4">
                  <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/50">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-green-500">{approvedPermits}</p>
                    <p className="text-green-400 font-bold text-lg">تصريح</p>
                  </div>
                </div>
                <p className="relative text-sm font-bold text-green-300">موافق عليها</p>
              </Card>

              <Card className="relative p-6 bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl shadow-red-500/20 border-2 border-red-500 overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-between mb-4">
                  <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/50">
                    <XCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-red-500">{rejectedPermits}</p>
                    <p className="text-red-400 font-bold text-lg">تصريح</p>
                  </div>
                </div>
                <p className="relative text-sm font-bold text-red-300">مرفوضة</p>
              </Card>
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Playlist Manager */}
              <PlaylistManager />

              {/* Online Employees */}
              <OnlineEmployeesWidget />
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Employees Section */}
              <Card className="p-6 shadow-xl shadow-amber-500/20 bg-gray-900 border-2 border-amber-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-600 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-2xl font-black text-amber-500">الموظفين المتصلين</h2>
                </div>
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {employees.length > 0 ? (
                    employees.map((emp, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-black p-3 rounded-lg border border-amber-600/30 hover:border-amber-500 transition-all">
                        <div className="bg-amber-600 text-black font-black w-8 h-8 rounded-full flex items-center justify-center text-sm relative">
                          {idx + 1}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-amber-100 block">{emp.name}</span>
                          <span className="text-xs text-amber-600">{emp.position}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400 font-bold">متصل</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-amber-600 text-center py-8 font-bold">لا يوجد موظفين متصلين</p>
                  )}
                </div>
                <Button 
                  onClick={() => router.push('/job-descriptions')}
                  className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-black font-bold"
                >
                  <Users className="w-5 h-5" />
                  عرض جميع الموظفين المتصلين
                </Button>
              </Card>

              {/* Management Chat */}
              <Card className="p-6 shadow-xl shadow-amber-500/20 bg-gray-900 border-2 border-amber-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-600 p-2 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-2xl font-black text-amber-500">قرارات الإدارة</h2>
                </div>
                <div className="bg-black border-2 border-amber-600/30 rounded-xl p-4 mb-4 min-h-[200px]">
                  <p className="text-amber-600 text-center py-8 font-bold">قريباً - سيتم إضافة نظام الرسائل</p>
                </div>
                <Button 
                  onClick={() => setIsMessageModalOpen(true)}
                  className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-black font-bold"
                >
                  <MessageSquare className="w-5 h-5" />
                  إرسال رسالة جديدة
                </Button>
              </Card>
            </div>

            {/* Activity Section */}
            <Card className="p-6 shadow-xl shadow-amber-500/20 bg-gray-900 border-2 border-amber-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-600 p-2 rounded-lg">
                  <Activity className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-2xl font-black text-amber-500">النشاط الأخير</h2>
              </div>
              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-black p-4 rounded-lg border border-amber-600/30 hover:border-amber-500 transition-all">
                      <Download className="w-5 h-5 text-amber-500" />
                      <div className="flex-1">
                        <p className="font-bold text-amber-100">{activity.title}</p>
                        <p className="text-sm text-amber-600">{activity.description}</p>
                      </div>
                      <span className="text-xs text-amber-700">{new Date(activity.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-amber-600 text-center py-8 font-bold">لا يوجد نشاط حالياً</p>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Developer Dashboard */}
        {role === "developer" && (
          <div className="space-y-6">
            {/* Online Employees Widget */}
            <OnlineEmployeesWidget />

            {/* User Management */}
            <Card className="p-6 shadow-xl shadow-amber-500/20 bg-gray-900 border-2 border-amber-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-600 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-2xl font-black text-amber-500">إدارة اليوزرات</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => router.push('/admin/users')}
                  className="h-20 gap-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black text-lg font-black shadow-xl"
                >
                  <Users className="w-8 h-8" />
                  <div className="text-right">
                    <p className="text-xl">يوزرات الموظفين</p>
                    <p className="text-sm text-amber-900">إنشاء وإدارة حسابات الموظفين</p>
                  </div>
                </Button>
                <Button 
                  onClick={() => router.push('/admin/special-users')}
                  className="h-20 gap-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white text-lg font-black shadow-xl"
                >
                  <FileText className="w-8 h-8" />
                  <div className="text-right">
                    <p className="text-xl">يوزرات خاصة</p>
                    <p className="text-sm text-purple-200">حسابات مخصصة للإدارة</p>
                  </div>
                </Button>
              </div>
            </Card>

            {/* System Status */}
            <Card className="p-6 shadow-xl shadow-amber-500/20 bg-gray-900 border-2 border-amber-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-600 p-2 rounded-lg">
                  <Activity className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-2xl font-black text-amber-500">حالة النظام</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-green-900 border-2 border-green-500 rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-black" />
                  </div>
                  <p className="font-black text-2xl text-green-400 mb-2">النظام يعمل بشكل طبيعي</p>
                  <p className="text-green-300 text-sm">جميع الخدمات متاحة</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black border border-amber-600/30 rounded-lg p-4 text-center">
                    <p className="text-amber-600 text-sm mb-1">المستخدمين النشطين</p>
                    <p className="text-3xl font-black text-amber-500">{employees.length}</p>
                  </div>
                  <div className="bg-black border border-amber-600/30 rounded-lg p-4 text-center">
                    <p className="text-amber-600 text-sm mb-1">وقت التشغيل</p>
                    <p className="text-3xl font-black text-amber-500">24/7</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Message Modal */}
      <SendMessageModal 
        isOpen={isMessageModalOpen} 
        onClose={() => setIsMessageModalOpen(false)} 
      />
    </div>
  )
}
