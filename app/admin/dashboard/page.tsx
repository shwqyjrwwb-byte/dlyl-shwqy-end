"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard, Users, Activity, LogOut, Music, MapPin,
  ChevronRight, Bell, Code2, Lock, Menu, X, Home, Palette
} from "lucide-react"

import { DevOverview }      from "@/components/dev-dashboard/overview"
import { DevUsersManager }  from "@/components/dev-dashboard/users-manager"
import { DevContentEditor } from "@/components/dev-dashboard/content-editor"
import { DevAreasManager }  from "@/components/dev-dashboard/areas-manager"
import { DevAccessControl } from "@/components/dev-dashboard/access-control"
import { DevSystemMonitor } from "@/components/dev-dashboard/system-monitor"
import { DevPlaylist }      from "@/components/dev-dashboard/playlist"

const NAV_ITEMS = [
  { id: "overview", label: "نظرة عامة",       icon: LayoutDashboard, color: "text-amber-400" },
  { id: "users",    label: "المستخدمين",       icon: Users,           color: "text-blue-400" },
  { id: "content",  label: "محرر المحتوى",     icon: Palette,         color: "text-purple-400" },
  { id: "areas",    label: "المناطق",          icon: MapPin,          color: "text-green-400" },
  { id: "access",   label: "الوصول",           icon: Lock,            color: "text-red-400" },
  { id: "system",   label: "النظام",           icon: Activity,        color: "text-cyan-400" },
  { id: "playlist", label: "الموسيقى",         icon: Music,           color: "text-orange-400" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [role, setRole]               = useState<"admin" | "developer" | null>(null)
  const [isLoading, setIsLoading]     = useState(true)
  const [activeSection, setActive]    = useState("overview")
  const [sidebarOpen, setSidebar]     = useState(true)
  const [mobileOpen, setMobile]       = useState(false)
  const [notifications]               = useState(3)

  useEffect(() => {
    if (window.innerWidth < 768) setSidebar(false)
    const loggedIn  = localStorage.getItem("dashboardLoggedIn")
    const userRole  = localStorage.getItem("dashboardRole") as "admin" | "developer"
    const loginTime = localStorage.getItem("dashboardLoginTime")
    if (loggedIn === "true" && userRole && loginTime) {
      const h = (Date.now() - new Date(loginTime).getTime()) / 3600000
      if (h < 24) { setRole(userRole); setIsLoading(false); return }
    }
    router.push("/admin/dashboard/login")
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("dashboardLoggedIn")
    localStorage.removeItem("dashboardRole")
    localStorage.removeItem("dashboardLoginTime")
    router.push("/admin/dashboard/login")
  }

  const navigate = (id: string) => { setActive(id); setMobile(false) }

  if (isLoading) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-ping" />
          <div className="absolute inset-1 rounded-full border-4 border-t-amber-500 border-r-amber-500 border-b-transparent border-l-transparent animate-spin" />
          <Code2 className="absolute inset-0 m-auto w-6 h-6 text-amber-500" />
        </div>
        <p className="text-amber-400 font-bold tracking-widest text-sm">LOADING...</p>
      </div>
    </div>
  )

  const activeNav = NAV_ITEMS.find(n => n.id === activeSection)

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex" dir="rtl">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/70 z-30 md:hidden" onClick={() => setMobile(false)} />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className={`
        fixed top-0 right-0 h-full z-40 flex flex-col
        bg-[#0d0d14] border-l border-amber-500/20
        transition-all duration-300
        ${sidebarOpen ? "w-56" : "w-14"}
        ${mobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 p-3 border-b border-amber-500/20 min-h-[56px]">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-black" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-[#0d0d14] animate-pulse" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-amber-400 font-black text-xs leading-tight">لوحة التحكم</p>
              <p className="text-amber-700 text-[10px]">Developer Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 space-y-0.5 px-1.5 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button key={item.id} onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all group
                  ${isActive ? "bg-amber-500/15 border border-amber-500/30" : "hover:bg-white/5 border border-transparent"}`}>
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-amber-400" : item.color}`} />
                {sidebarOpen && (
                  <span className={`text-xs font-semibold truncate flex-1 ${isActive ? "text-amber-300" : "text-gray-400 group-hover:text-gray-200"}`}>
                    {item.label}
                  </span>
                )}
                {isActive && sidebarOpen && <ChevronRight className="w-3 h-3 text-amber-500 flex-shrink-0" />}
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-1.5 border-t border-amber-500/20 space-y-0.5">
          <button onClick={() => router.push("/home")}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-all group">
            <Home className="w-4 h-4 text-gray-600 group-hover:text-gray-300 flex-shrink-0" />
            {sidebarOpen && <span className="text-xs text-gray-600 group-hover:text-gray-300">الرئيسية</span>}
          </button>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-red-500/10 transition-all group">
            <LogOut className="w-4 h-4 text-red-500/50 group-hover:text-red-400 flex-shrink-0" />
            {sidebarOpen && <span className="text-xs text-red-500/50 group-hover:text-red-400">خروج</span>}
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "md:mr-56" : "md:mr-14"}`}>

        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#0d0d14]/90 backdrop-blur-xl border-b border-amber-500/20 px-3 md:px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Mobile hamburger */}
            <button onClick={() => setMobile(!mobileOpen)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-all md:hidden">
              <Menu className="w-5 h-5" />
            </button>
            {/* Desktop toggle */}
            <button onClick={() => setSidebar(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-all hidden md:flex">
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div>
              <h1 className="text-white font-bold text-sm">{activeNav?.label}</h1>
              <p className="text-gray-600 text-[10px] hidden md:block">Developer Control Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-gray-200 transition-all">
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2 py-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs font-bold">{role === "developer" ? "Dev" : "Admin"}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-3 md:p-5 overflow-auto">
          {activeSection === "overview" && <DevOverview role={role} onNavigate={navigate} />}
          {activeSection === "users"    && <DevUsersManager />}
          {activeSection === "content"  && <DevContentEditor />}
          {activeSection === "areas"    && <DevAreasManager />}
          {activeSection === "access"   && <DevAccessControl />}
          {activeSection === "system"   && <DevSystemMonitor />}
          {activeSection === "playlist" && <DevPlaylist />}
        </div>
      </main>
    </div>
  )
}
