"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, Trash2, Copy, Check, RefreshCw, Eye, EyeOff, UserPlus, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  userId: string
  password: string
  position: string
  department: string
  type: "employee" | "special"
  permissions?: string[]
}

const PERMISSIONS = [
  "لوحة تحكم المدير", "المكتب الفني", "تصاريح العمل",
  "قاعدة البيانات", "رفع ملفات", "إدارة المستخدمين",
  "التقارير", "الإعدادات", "قرارات الإدارة", "الجودة",
]

export function DevUsersManager() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)
  const [tab, setTab] = useState<"all" | "special">("all")
  const [form, setForm] = useState({ name: "", userId: "", password: "", position: "", department: "", type: "employee" as "employee" | "special", permissions: [] as string[] })

  useEffect(() => {
    const saved = localStorage.getItem("devDashboardUsers")
    const base: User[] = [
      { id: "gm",   name: "م/ أحمد شوقي",  userId: "gm",   password: "9528",   position: "رئيس مجلس الإدارة", department: "الإدارة العليا", type: "special", permissions: ["all"] },
      { id: "QTY",  name: "محمود إسماعيل", userId: "QTY",  password: "mm212",  position: "مدير الجودة",       department: "الجودة",         type: "special", permissions: ["الجودة", "التقارير"] },
      { id: "QTY2", name: "شادي مظهر",     userId: "QTY2", password: "mm2123", position: "مهندس جودة",        department: "الجودة",         type: "special", permissions: ["الجودة"] },
    ]
    const custom = saved ? JSON.parse(saved) : []
    setUsers([...base, ...custom])
  }, [])

  const saveCustomUsers = (all: User[]) => {
    const custom = all.filter(u => !["gm", "QTY", "QTY2"].includes(u.id))
    localStorage.setItem("devDashboardUsers", JSON.stringify(custom))
  }

  const addUser = () => {
    if (!form.name || !form.userId || !form.password) return
    const newUser: User = { ...form, id: Date.now().toString() }
    const updated = [...users, newUser]
    setUsers(updated)
    saveCustomUsers(updated)
    setForm({ name: "", userId: "", password: "", position: "", department: "", type: "employee", permissions: [] })
    setShowForm(false)
  }

  const deleteUser = (id: string) => {
    if (["gm", "QTY", "QTY2"].includes(id)) return
    const updated = users.filter(u => u.id !== id)
    setUsers(updated)
    saveCustomUsers(updated)
  }

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const regeneratePassword = (id: string) => {
    const newPass = Math.random().toString(36).slice(2, 8).toUpperCase()
    const updated = users.map(u => u.id === id ? { ...u, password: newPass } : u)
    setUsers(updated)
    saveCustomUsers(updated)
  }

  const togglePermission = (perm: string) => {
    setForm(f => ({
      ...f,
      permissions: f.permissions.includes(perm) ? f.permissions.filter(p => p !== perm) : [...f.permissions, perm]
    }))
  }

  const filtered = users.filter(u => {
    const matchSearch = u.name.includes(search) || u.userId.includes(search)
    const matchTab = tab === "all" || u.type === "special"
    return matchSearch && matchTab
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-white">إدارة المستخدمين</h2>
          <p className="text-gray-500 text-sm">{users.length} مستخدم إجمالاً</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-amber-500 hover:bg-amber-600 text-black font-bold gap-2">
          <UserPlus className="w-4 h-4" />
          مستخدم جديد
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="p-5 bg-[#0d0d14] border border-amber-500/30 space-y-4">
          <h3 className="text-amber-400 font-bold flex items-center gap-2"><Plus className="w-4 h-4" /> إضافة مستخدم جديد</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="الاسم الكامل" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-black/50 border-white/10 text-white" />
            <Input placeholder="اسم المستخدم (ID)" value={form.userId} onChange={e => setForm(f => ({ ...f, userId: e.target.value }))} className="bg-black/50 border-white/10 text-white" dir="ltr" />
            <Input placeholder="كلمة المرور" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="bg-black/50 border-white/10 text-white" dir="ltr" />
            <Input placeholder="المنصب الوظيفي" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} className="bg-black/50 border-white/10 text-white" />
            <Input placeholder="القسم" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} className="bg-black/50 border-white/10 text-white" />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))} className="bg-black/50 border border-white/10 text-white rounded-md px-3 py-2 text-sm">
              <option value="employee">موظف عادي</option>
              <option value="special">مستخدم خاص</option>
            </select>
          </div>
          {form.type === "special" && (
            <div>
              <p className="text-gray-400 text-sm mb-2">الصلاحيات:</p>
              <div className="flex flex-wrap gap-2">
                {PERMISSIONS.map(p => (
                  <button key={p} onClick={() => togglePermission(p)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${form.permissions.includes(p) ? "bg-amber-500/20 border-amber-500/50 text-amber-400" : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={addUser} className="bg-green-600 hover:bg-green-700 text-white font-bold gap-2"><Check className="w-4 h-4" /> حفظ</Button>
            <Button onClick={() => setShowForm(false)} variant="outline" className="border-white/10 text-gray-400">إلغاء</Button>
          </div>
        </Card>
      )}

      {/* Tabs + Search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex bg-[#0d0d14] border border-white/10 rounded-xl p-1 gap-1">
          {[{ id: "all", label: "الكل" }, { id: "special", label: "خاص" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? "bg-amber-500/20 text-amber-400" : "text-gray-500 hover:text-gray-300"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-48">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث..." className="bg-[#0d0d14] border-white/10 text-white pr-9" />
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        {filtered.map(user => (
          <Card key={user.id} className="p-4 bg-[#0d0d14] border border-white/5 hover:border-amber-500/20 transition-all">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 font-black text-sm">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-bold text-sm">{user.name}</p>
                  {user.type === "special" && <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs rounded-full flex items-center gap-1"><Shield className="w-3 h-3" /> خاص</span>}
                </div>
                <p className="text-gray-500 text-xs">{user.position} • {user.department}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* User ID */}
                <div className="flex items-center gap-1 bg-black/50 border border-white/10 rounded-lg px-2 py-1">
                  <span className="text-gray-400 text-xs" dir="ltr">{user.userId}</span>
                  <button onClick={() => copyText(user.userId, `id-${user.id}`)} className="text-gray-600 hover:text-amber-400 transition-colors">
                    {copied === `id-${user.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                {/* Password */}
                <div className="flex items-center gap-1 bg-black/50 border border-white/10 rounded-lg px-2 py-1">
                  <span className="text-gray-400 text-xs" dir="ltr">{showPasswords[user.id] ? user.password : "••••••"}</span>
                  <button onClick={() => setShowPasswords(p => ({ ...p, [user.id]: !p[user.id] }))} className="text-gray-600 hover:text-amber-400 transition-colors">
                    {showPasswords[user.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                  <button onClick={() => copyText(user.password, `pass-${user.id}`)} className="text-gray-600 hover:text-amber-400 transition-colors">
                    {copied === `pass-${user.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                {!["gm", "QTY", "QTY2"].includes(user.id) && (
                  <>
                    <button onClick={() => regeneratePassword(user.id)} className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all" title="تجديد كلمة المرور">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>لا يوجد مستخدمين</p>
          </div>
        )}
      </div>
    </div>
  )
}
