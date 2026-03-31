"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, CheckCircle, XCircle, Clock, RefreshCw, Zap, Globe, Database, Users, Server } from "lucide-react"

interface ApiStatus {
  name: string
  endpoint: string
  status: "ok" | "error" | "loading"
  latency?: number
}

interface OnlineUser {
  userId: string
  userName: string
  userPosition: string
  lastSeen: string
}

export function DevSystemMonitor() {
  const [apis, setApis] = useState<ApiStatus[]>([
    { name: "Work Permits",    endpoint: "/api/work-permit",          status: "loading" },
    { name: "Online Users",    endpoint: "/api/users/online",         status: "loading" },
    { name: "Announcements",   endpoint: "/api/announcements",        status: "loading" },
    { name: "Clients Folders", endpoint: "/api/clients-from-folders", status: "loading" },
    { name: "All Employees",   endpoint: "/api/all-employees",        status: "loading" },
  ])
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [checking, setChecking] = useState(false)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)
  const [permits, setPermits] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 })

  useEffect(() => { checkAll() }, [])

  const checkAll = async () => {
    setChecking(true)
    const results = await Promise.all(
      apis.map(async (api) => {
        const start = Date.now()
        try {
          const r = await fetch(api.endpoint)
          const latency = Date.now() - start
          if (r.ok) {
            const d = await r.json()
            // Load extra data
            if (api.endpoint === "/api/users/online" && d.success) setOnlineUsers(d.users || [])
            if (api.endpoint === "/api/work-permit" && d.success) {
              const p = d.permits || []
              setPermits({ total: p.length, pending: p.filter((x: any) => x.status === "pending").length, approved: p.filter((x: any) => x.status === "approved").length, rejected: p.filter((x: any) => x.status === "rejected").length })
            }
            return { ...api, status: "ok" as const, latency }
          }
          return { ...api, status: "error" as const, latency }
        } catch {
          return { ...api, status: "error" as const, latency: Date.now() - start }
        }
      })
    )
    setApis(results)
    setLastCheck(new Date())
    setChecking(false)
  }

  const allOk = apis.every(a => a.status === "ok")
  const okCount = apis.filter(a => a.status === "ok").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-white">مراقبة النظام</h2>
          <p className="text-gray-500 text-sm">حالة الـ APIs والمستخدمين المتصلين</p>
        </div>
        <Button onClick={checkAll} disabled={checking} className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2 font-bold">
          <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
          {checking ? "جاري الفحص..." : "فحص الآن"}
        </Button>
      </div>

      {/* Overall Status */}
      <Card className={`p-5 border ${allOk ? "bg-green-500/5 border-green-500/30" : "bg-red-500/5 border-red-500/30"}`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${allOk ? "bg-green-500/20" : "bg-red-500/20"}`}>
            {allOk ? <CheckCircle className="w-8 h-8 text-green-400" /> : <XCircle className="w-8 h-8 text-red-400" />}
          </div>
          <div>
            <p className={`text-xl font-black ${allOk ? "text-green-400" : "text-red-400"}`}>
              {allOk ? "جميع الخدمات تعمل بشكل طبيعي ✓" : `${okCount}/${apis.length} خدمات تعمل`}
            </p>
            {lastCheck && <p className="text-gray-500 text-xs flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> آخر فحص: {lastCheck.toLocaleTimeString("ar-EG")}</p>}
          </div>
        </div>
      </Card>

      {/* API Status */}
      <div>
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-3">حالة الـ APIs</h3>
        <div className="space-y-2">
          {apis.map((api, i) => (
            <Card key={i} className={`p-4 bg-[#0d0d14] border transition-all ${api.status === "ok" ? "border-green-500/15" : api.status === "error" ? "border-red-500/15" : "border-white/5"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${api.status === "ok" ? "bg-green-500 animate-pulse" : api.status === "error" ? "bg-red-500" : "bg-gray-500 animate-pulse"}`} />
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">{api.name}</p>
                  <p className="text-gray-600 text-xs" dir="ltr">{api.endpoint}</p>
                </div>
                {api.latency !== undefined && (
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${api.latency < 500 ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"}`}>
                    {api.latency}ms
                  </span>
                )}
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${api.status === "ok" ? "bg-green-500/10 border-green-500/20 text-green-400" : api.status === "error" ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-gray-500/10 border-gray-500/20 text-gray-400"}`}>
                  {api.status === "ok" ? "يعمل" : api.status === "error" ? "خطأ" : "جاري..."}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Work Permits Stats */}
      <div>
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-3">إحصائيات تصاريح العمل</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "الإجمالي",  value: permits.total,    color: "text-white",        border: "border-white/10" },
            { label: "معلقة",     value: permits.pending,  color: "text-yellow-400",   border: "border-yellow-500/20" },
            { label: "موافقة",    value: permits.approved, color: "text-green-400",    border: "border-green-500/20" },
            { label: "مرفوضة",   value: permits.rejected, color: "text-red-400",      border: "border-red-500/20" },
          ].map((s, i) => (
            <Card key={i} className={`p-4 bg-[#0d0d14] border ${s.border} text-center`}>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Online Users */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">المتصلون الآن</h3>
          <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full font-bold">{onlineUsers.length} متصل</span>
        </div>
        {onlineUsers.length === 0 ? (
          <Card className="p-8 bg-[#0d0d14] border border-white/5 text-center">
            <Users className="w-10 h-10 mx-auto mb-2 text-gray-700" />
            <p className="text-gray-600 text-sm">لا يوجد موظفين متصلين حالياً</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {onlineUsers.map((u, i) => (
              <Card key={i} className="p-3 bg-[#0d0d14] border border-green-500/10 flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500/20 to-green-700/20 border border-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-black text-xs">{u.userName?.charAt(0)}</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0d0d14]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{u.userName}</p>
                  <p className="text-gray-500 text-xs truncate">{u.userPosition}</p>
                </div>
                <span className="text-green-400 text-xs font-semibold">متصل</span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
