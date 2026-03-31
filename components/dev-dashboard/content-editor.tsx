"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Palette, Save, Check, RefreshCw, Phone, User, Briefcase, Building2, ChevronDown, ChevronUp } from "lucide-react"
import { getAllDepartmentEmployees } from "@/lib/employees-data"

interface Employee {
  name: string
  position: string
  phone: string
  department: string
  image?: string
}

export function DevContentEditor() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Employee>>({})
  const [saved, setSaved] = useState<string | null>(null)
  const [expandedDept, setExpandedDept] = useState<string | null>(null)
  const [overrides, setOverrides] = useState<Record<string, Partial<Employee>>>({})

  useEffect(() => {
    const data = getAllDepartmentEmployees()
    setEmployees(data)
    const saved = localStorage.getItem("employeeOverrides")
    if (saved) setOverrides(JSON.parse(saved))
  }, [])

  const saveOverride = (key: string) => {
    const updated = { ...overrides, [key]: editData }
    setOverrides(updated)
    localStorage.setItem("employeeOverrides", JSON.stringify(updated))
    setSaved(key)
    setEditingId(null)
    setTimeout(() => setSaved(null), 2000)
  }

  const resetOverride = (key: string) => {
    const updated = { ...overrides }
    delete updated[key]
    setOverrides(updated)
    localStorage.setItem("employeeOverrides", JSON.stringify(updated))
  }

  const getEmployee = (emp: Employee): Employee => {
    const key = emp.name
    return overrides[key] ? { ...emp, ...overrides[key] } : emp
  }

  const filtered = employees.filter(e =>
    e.name.includes(search) || e.department.includes(search) || e.position.includes(search)
  )

  // Group by department
  const departments = Array.from(new Set(filtered.map(e => e.department)))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">محرر المحتوى</h2>
        <p className="text-gray-500 text-sm">تعديل بيانات الموظفين وبيانات المنصة</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["الموظفون"].map(t => (
          <div key={t} className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-xl text-sm font-bold">{t}</div>
        ))}
        {["الباقات", "الأسعار", "الشركاء"].map(t => (
          <div key={t} className="px-4 py-2 bg-white/5 border border-white/10 text-gray-500 rounded-xl text-sm font-semibold cursor-not-allowed" title="قريباً">{t} <span className="text-xs opacity-50">قريباً</span></div>
        ))}
      </div>

      {/* Search */}
      <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بالاسم أو القسم..." className="bg-[#0d0d14] border-white/10 text-white" />

      {/* Stats */}
      <div className="flex gap-3 flex-wrap">
        <div className="px-4 py-2 bg-[#0d0d14] border border-white/5 rounded-xl">
          <span className="text-gray-500 text-xs">إجمالي الموظفين: </span>
          <span className="text-amber-400 font-bold">{employees.length}</span>
        </div>
        <div className="px-4 py-2 bg-[#0d0d14] border border-white/5 rounded-xl">
          <span className="text-gray-500 text-xs">تم تعديله: </span>
          <span className="text-purple-400 font-bold">{Object.keys(overrides).length}</span>
        </div>
        <div className="px-4 py-2 bg-[#0d0d14] border border-white/5 rounded-xl">
          <span className="text-gray-500 text-xs">الأقسام: </span>
          <span className="text-blue-400 font-bold">{departments.length}</span>
        </div>
      </div>

      {/* Departments */}
      <div className="space-y-3">
        {departments.map(dept => {
          const deptEmployees = filtered.filter(e => e.department === dept)
          const isExpanded = expandedDept === dept
          return (
            <Card key={dept} className="bg-[#0d0d14] border border-white/5 overflow-hidden">
              <button
                onClick={() => setExpandedDept(isExpanded ? null : dept)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Building2 className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">{dept}</p>
                    <p className="text-gray-500 text-xs">{deptEmployees.length} موظف</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </button>

              {isExpanded && (
                <div className="border-t border-white/5 divide-y divide-white/5">
                  {deptEmployees.map((emp, idx) => {
                    const key = emp.name
                    const current = getEmployee(emp)
                    const isEditing = editingId === key
                    const isModified = !!overrides[key]

                    return (
                      <div key={idx} className="p-4">
                        {!isEditing ? (
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-amber-400 font-black text-xs">{current.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-white text-sm font-semibold">{current.name}</p>
                                {isModified && <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] rounded-full border border-purple-500/30">معدّل</span>}
                              </div>
                              <p className="text-gray-500 text-xs">{current.position} • {current.phone}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => { setEditingId(key); setEditData({ name: current.name, position: current.position, phone: current.phone }) }}
                                className="h-7 px-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 text-xs">
                                تعديل
                              </Button>
                              {isModified && (
                                <Button size="sm" onClick={() => resetOverride(key)}
                                  className="h-7 px-3 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs">
                                  <RefreshCw className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div className="relative">
                                <User className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <Input value={editData.name || ""} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} placeholder="الاسم" className="bg-black/50 border-white/10 text-white text-sm h-9 pr-7" />
                              </div>
                              <div className="relative">
                                <Briefcase className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <Input value={editData.position || ""} onChange={e => setEditData(d => ({ ...d, position: e.target.value }))} placeholder="المنصب" className="bg-black/50 border-white/10 text-white text-sm h-9 pr-7" />
                              </div>
                              <div className="relative">
                                <Phone className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <Input value={editData.phone || ""} onChange={e => setEditData(d => ({ ...d, phone: e.target.value }))} placeholder="التليفون" className="bg-black/50 border-white/10 text-white text-sm h-9 pr-7" dir="ltr" />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => saveOverride(key)} className="h-8 bg-green-600 hover:bg-green-700 text-white gap-1 text-xs">
                                {saved === key ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />} حفظ
                              </Button>
                              <Button size="sm" onClick={() => setEditingId(null)} variant="outline" className="h-8 border-white/10 text-gray-400 text-xs">إلغاء</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
