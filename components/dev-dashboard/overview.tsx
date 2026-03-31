"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users, Activity, CheckCircle, Clock, XCircle,
  ArrowLeft, TrendingUp, Zap, Globe, Shield,
  MessageSquare, Music, MapPin, Palette, Lock
} from "lucide-react"

interface Props {
  role: "admin" | "developer" | null
  onNavigate: (section: string) => void
}

const QUICK_ACTIONS = [
  { id: "users",     label: "إدارة المستخدمين",  icon: Users,         color: "from-blue-500/20 to-blue-600/10",   border: "border-blue-500/30",   text: "text-blue-400" },
  { id: "content",   label: "محرر المحتوى",       icon: Palette,       color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30", text: "text-purple-400" },
  { id: "areas",     label: "المناطق والروابط",   icon: MapPin,        color: "from-green-500/20 to-green-600/10",  border: "border-green-500/30",  text: "text-green-400" },
  { id: "messaging", label: "قرارات الإدارة",     icon: MessageSquare, color: "from-pink-500/20 to-pink-600/10",    border: "border-pink-500/30",   text: "text-pink-400" },
  { id: "access",    label: "التحكم بالوصول",     icon: Lock,          color: "from-red-500/20 to-red-600/10",      border: "border-red-500/30",    text: "text-red-400" },
  { id: "system",    label: "مراقبة النظام",      icon: Activity,      color: "from-cyan-500/20 to-cyan-600/10",    border: "border-cyan-500/30",   text: "text-cyan-400" },
  { id: "playlist",  label: "مشغل الموسيقى",      icon: Music,         color: "from-orange-500/20 to-orange-600/10", border: "border-orange-500/30", text: "text-orange-400" },
]

export function DevOverview({ role, onNavigate }: Props) {
  const [permits, setPermits] = useState({ pending: 0, approved: 0, rejected: 0 })
  const [onlineCount, setOnlineCount] = useState(0)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    fetch("/api/work-permit").then(r => r.json()).then(d => {
      if (d.success) {
        const p = d.permits || []
        setPermits({
          pending:  p.filter((x: any) => x.status === "pending").length,
          approved: p.filter((x: any) => x.status === "approved").length,
          rejected: p.filter((x: any) => x.status === "rejected").length,
        })
      }
    }).catch(() => {})
    fetch("/api/users/online").then(r => r.json()).then(d => {
      if (d.success) setOnlineCount(d.users?.length || 0)
    }).catch(() => {})
    return () => clearInterval(t)
  }, [])

  const stats = [
    { label: "متصلون الآن",    value: onlineCount,        icon: Users,        color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20" },
    { label: "تصاريح معلقة",   value: permits.pending,    icon: Clock,        color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
    { label: "تصاريح موافقة",  value: permits.approved,   icon: CheckCircle,  color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20" },
    { label: "تصاريح مرفوضة", value: permits.rejected,   icon: XCircle,      color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-amber-500/10 via-[#0d0d14] to-[#0d0d14] border border-amber-500/20 p-6">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-semibold uppercase tracking-widest">System Online</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-1">
              مرحباً، <span className="text-amber-400">{role === "developer" ? "Omar 👨‍💻" : "م/ أحمد 👑"}</span>
            </h2>
            <p className="text-gray-400 text-sm">{role === "developer" ? "Developer Control Panel" : "Admin Dashboard"}</p>
          </div>
          <div className="text-left">
            <p className="text-3xl font-black text-amber-400 tabular-nums">
              {time.toLocaleTimeString("ar-EG")}
            </p>
            <p className="text-gray-500 text-sm">{time.toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <Card key={i} className={`p-5 bg-[#0d0d14] border ${s.border} hover:scale-105 transition-all duration-200`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${s.bg}`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </div>
              <p className={`text-4xl font-black ${s.color} mb-1`}>{s.value}</p>
              <p className="text-gray-500 text-xs font-medium">{s.label}</p>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-4">الوصول السريع</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className={`group p-4 rounded-xl bg-gradient-to-br ${action.color} border ${action.border} hover:scale-105 transition-all duration-200 text-right`}
              >
                <Icon className={`w-6 h-6 ${action.text} mb-3`} />
                <p className={`text-sm font-bold ${action.text}`}>{action.label}</p>
                <ArrowLeft className={`w-4 h-4 ${action.text} mt-2 opacity-0 group-hover:opacity-100 transition-opacity`} />
              </button>
            )
          })}
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Next.js", value: "16.0.10", icon: Globe, color: "text-blue-400" },
          { label: "Node.js", value: "≥ 20.9.0", icon: Zap, color: "text-green-400" },
          { label: "الحالة", value: "يعمل ✓", icon: Shield, color: "text-amber-400" },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <Card key={i} className="p-4 bg-[#0d0d14] border border-white/5 flex items-center gap-3">
              <Icon className={`w-5 h-5 ${item.color}`} />
              <div>
                <p className="text-gray-500 text-xs">{item.label}</p>
                <p className={`font-bold text-sm ${item.color}`}>{item.value}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
