"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Unlock, Shield, Eye, EyeOff, Save, Check, AlertTriangle, Key } from "lucide-react"

interface PageAccess {
  id: string
  label: string
  path: string
  locked: boolean
  password?: string
}

const DEFAULT_PAGES: PageAccess[] = [
  { id: "home",             label: "الصفحة الرئيسية",  path: "/home",             locked: false },
  { id: "contacts",         label: "جهات الاتصال",      path: "/contacts",         locked: false },
  { id: "technical-office", label: "المكتب الفني",      path: "/technical-office", locked: false },
  { id: "work-permit",      label: "تصاريح العمل",      path: "/work-permit",      locked: false },
  { id: "job-descriptions", label: "الوصف الوظيفي",     path: "/job-descriptions", locked: false },
  { id: "specifications",   label: "المواصفات",          path: "/specifications",   locked: false },
  { id: "packages",         label: "الباقات",            path: "/packages",         locked: false },
  { id: "payment",          label: "شروط الدفع",        path: "/payment",          locked: false },
  { id: "phases",           label: "مراحل التنفيذ",     path: "/phases",           locked: false },
  { id: "quality",          label: "الجودة",             path: "/quality",          locked: false },
  { id: "penalties",        label: "الغرامات",           path: "/penalties",        locked: false },
  { id: "modifications",    label: "التعديلات",          path: "/modifications",    locked: false },
  { id: "contractors",      label: "المقاولون",          path: "/contractors",      locked: false },
  { id: "vehicles",         label: "السيارات",           path: "/vehicles",         locked: false },
]

export function DevAccessControl() {
  const [pages, setPages] = useState<PageAccess[]>(DEFAULT_PAGES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [showPass, setShowPass] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<string | null>(null)
  const [devPassword, setDevPassword] = useState("")
  const [newDevPassword, setNewDevPassword] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [newAdminPassword, setNewAdminPassword] = useState("")
  const [passChanged, setPassChanged] = useState<string | null>(null)

  useEffect(() => {
    const s = localStorage.getItem("devAccessControl")
    if (s) setPages(JSON.parse(s))
    setDevPassword(localStorage.getItem("devPassword") || "dev1")
    setAdminPassword(localStorage.getItem("adminPassword") || "9528")
  }, [])

  const save = (updated: PageAccess[]) => {
    setPages(updated)
    localStorage.setItem("devAccessControl", JSON.stringify(updated))
  }

  const toggleLock = (id: string) => {
    const page = pages.find(p => p.id === id)
    if (!page) return
    if (!page.locked) {
      setEditingId(id)
      setNewPassword("")
    } else {
      save(pages.map(p => p.id === id ? { ...p, locked: false, password: undefined } : p))
    }
  }

  const setLock = (id: string) => {
    if (!newPassword.trim()) return
    save(pages.map(p => p.id === id ? { ...p, locked: true, password: newPassword } : p))
    setEditingId(null)
    setSaved(id)
    setTimeout(() => setSaved(null), 2000)
  }

  const changePassword = (type: "dev" | "admin") => {
    const val = type === "dev" ? newDevPassword : newAdminPassword
    if (!val.trim() || val.length < 3) return
    localStorage.setItem(type === "dev" ? "devPassword" : "adminPassword", val)
    if (type === "dev") { setDevPassword(val); setNewDevPassword("") }
    else { setAdminPassword(val); setNewAdminPassword("") }
    setPassChanged(type)
    setTimeout(() => setPassChanged(null), 2000)
  }

  const lockedCount = pages.filter(p => p.locked).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">التحكم بالوصول</h2>
        <p className="text-gray-500 text-sm">إدارة صلاحيات الوصول لصفحات المنصة</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 bg-[#0d0d14] border border-green-500/20 text-center">
          <p className="text-2xl font-black text-green-400">{pages.length - lockedCount}</p>
          <p className="text-gray-500 text-xs mt-1">صفحة مفتوحة</p>
        </Card>
        <Card className="p-4 bg-[#0d0d14] border border-red-500/20 text-center">
          <p className="text-2xl font-black text-red-400">{lockedCount}</p>
          <p className="text-gray-500 text-xs mt-1">صفحة مقفولة</p>
        </Card>
        <Card className="p-4 bg-[#0d0d14] border border-amber-500/20 text-center">
          <p className="text-2xl font-black text-amber-400">{pages.length}</p>
          <p className="text-gray-500 text-xs mt-1">إجمالي الصفحات</p>
        </Card>
      </div>

      {/* System Passwords */}
      <Card className="p-5 bg-[#0d0d14] border border-amber-500/20 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Key className="w-4 h-4 text-amber-400" />
          <h3 className="text-amber-400 font-bold">كلمات مرور النظام</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dev Password */}
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-semibold flex items-center gap-1"><Shield className="w-3 h-3 text-blue-400" /> كلمة مرور المطور</label>
            <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg px-3 py-2">
              <span className="text-gray-400 text-sm flex-1" dir="ltr">{showPass["dev"] ? devPassword : "••••••"}</span>
              <button onClick={() => setShowPass(p => ({ ...p, dev: !p.dev }))} className="text-gray-600 hover:text-gray-300">
                {showPass["dev"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <Input value={newDevPassword} onChange={e => setNewDevPassword(e.target.value)} placeholder="كلمة مرور جديدة" className="bg-black/50 border-white/10 text-white text-sm h-8" dir="ltr" />
              <Button size="sm" onClick={() => changePassword("dev")} className={`h-8 px-3 text-xs gap-1 ${passChanged === "dev" ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
                {passChanged === "dev" ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
              </Button>
            </div>
          </div>
          {/* Admin Password */}
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-semibold flex items-center gap-1"><Shield className="w-3 h-3 text-amber-400" /> كلمة مرور الأدمن</label>
            <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg px-3 py-2">
              <span className="text-gray-400 text-sm flex-1" dir="ltr">{showPass["admin"] ? adminPassword : "••••••"}</span>
              <button onClick={() => setShowPass(p => ({ ...p, admin: !p.admin }))} className="text-gray-600 hover:text-gray-300">
                {showPass["admin"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <Input value={newAdminPassword} onChange={e => setNewAdminPassword(e.target.value)} placeholder="كلمة مرور جديدة" className="bg-black/50 border-white/10 text-white text-sm h-8" dir="ltr" />
              <Button size="sm" onClick={() => changePassword("admin")} className={`h-8 px-3 text-xs gap-1 ${passChanged === "admin" ? "bg-green-600" : "bg-amber-600 hover:bg-amber-700"} text-white`}>
                {passChanged === "admin" ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Pages Access */}
      <div>
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-3">صلاحيات الصفحات</h3>
        <div className="space-y-2">
          {pages.map(page => (
            <Card key={page.id} className={`p-4 bg-[#0d0d14] border transition-all ${page.locked ? "border-red-500/20 bg-red-500/3" : "border-white/5 hover:border-white/10"}`}>
              {editingId === page.id ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <Lock className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-white font-semibold text-sm flex-1">{page.label}</span>
                  <Input value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="كلمة المرور" className="bg-black/50 border-white/10 text-white text-sm h-8 w-36" dir="ltr" />
                  <Button size="sm" onClick={() => setLock(page.id)} className="h-8 bg-red-600 hover:bg-red-700 text-white text-xs gap-1"><Lock className="w-3 h-3" /> قفل</Button>
                  <Button size="sm" onClick={() => setEditingId(null)} variant="outline" className="h-8 border-white/10 text-gray-400 text-xs">إلغاء</Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {page.locked ? <Lock className="w-4 h-4 text-red-400 flex-shrink-0" /> : <Unlock className="w-4 h-4 text-green-400 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{page.label}</p>
                    <p className="text-gray-600 text-xs" dir="ltr">{page.path}</p>
                  </div>
                  {saved === page.id && <span className="text-green-400 text-xs flex items-center gap-1"><Check className="w-3 h-3" /> تم</span>}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${page.locked ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-green-500/10 border-green-500/20 text-green-400"}`}>
                    {page.locked ? "مقفول" : "مفتوح"}
                  </span>
                  <button onClick={() => toggleLock(page.id)}
                    className={`p-1.5 rounded-lg border transition-all ${page.locked ? "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20" : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"}`}>
                    {page.locked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
