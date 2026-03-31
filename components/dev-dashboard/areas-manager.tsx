"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Save, Check, ExternalLink, Edit2, X, FolderOpen } from "lucide-react"

interface Area {
  id: number
  name: string
  driveLink: string
  clientsCount: number
  color: string
}

const DEFAULT_AREAS: Area[] = [
  { id: 1, name: "العاصمة الإدارية", driveLink: "https://drive.google.com/drive/folders/1wohvwk2TZMEhwoaXW9YeKVZumBJn3l8-?usp=sharing",       clientsCount: 25, color: "blue" },
  { id: 2, name: "القاهرة الجديدة",  driveLink: "https://drive.google.com/drive/folders/1HbwL6NKJhIbPqONsczTWK7sXBl5l2qGv?usp=drive_link",    clientsCount: 25, color: "green" },
  { id: 3, name: "التجمع الخامس",    driveLink: "https://drive.google.com/drive/folders/1hk92APPjFUGfWbWv_FdPZ6SRLGW01cOz?usp=sharing",       clientsCount: 17, color: "purple" },
  { id: 4, name: "أكتوبر",           driveLink: "https://drive.google.com/drive/folders/1szoma6_PqGnsMmWtZkxL7PT51rMIfbRF?usp=sharing",       clientsCount: 16, color: "orange" },
  { id: 5, name: "وسط",              driveLink: "https://drive.google.com/drive/folders/161L8kXX93ZTVG9xHY0xuedQ1G01tB7Wp?usp=sharing",       clientsCount: 23, color: "pink" },
  { id: 6, name: "الأقاليم",         driveLink: "https://drive.google.com/drive/folders/1gp2s_AyuGdj1vFgLyy2GW1F8r_IQ3Dh0?usp=sharing",       clientsCount: 15, color: "teal" },
]

const COLOR_MAP: Record<string, string> = {
  blue:   "border-blue-500/30 bg-blue-500/5",
  green:  "border-green-500/30 bg-green-500/5",
  purple: "border-purple-500/30 bg-purple-500/5",
  orange: "border-orange-500/30 bg-orange-500/5",
  pink:   "border-pink-500/30 bg-pink-500/5",
  teal:   "border-teal-500/30 bg-teal-500/5",
}

const TEXT_MAP: Record<string, string> = {
  blue: "text-blue-400", green: "text-green-400", purple: "text-purple-400",
  orange: "text-orange-400", pink: "text-pink-400", teal: "text-teal-400",
}

export function DevAreasManager() {
  const [areas, setAreas] = useState<Area[]>(DEFAULT_AREAS)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<Area>>({})
  const [saved, setSaved] = useState<number | null>(null)

  useEffect(() => {
    const s = localStorage.getItem("devAreasData")
    if (s) setAreas(JSON.parse(s))
  }, [])

  const startEdit = (area: Area) => {
    setEditingId(area.id)
    setEditData({ name: area.name, driveLink: area.driveLink, clientsCount: area.clientsCount })
  }

  const saveArea = (id: number) => {
    const updated = areas.map(a => a.id === id ? { ...a, ...editData } : a)
    setAreas(updated)
    localStorage.setItem("devAreasData", JSON.stringify(updated))
    setSaved(id)
    setEditingId(null)
    setTimeout(() => setSaved(null), 2000)
  }

  const totalClients = areas.reduce((s, a) => s + a.clientsCount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">المناطق والروابط</h2>
        <p className="text-gray-500 text-sm">تعديل روابط Google Drive لكل منطقة</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card className="p-4 bg-[#0d0d14] border border-amber-500/20 text-center">
          <p className="text-3xl font-black text-amber-400">{areas.length}</p>
          <p className="text-gray-500 text-xs mt-1">منطقة</p>
        </Card>
        <Card className="p-4 bg-[#0d0d14] border border-green-500/20 text-center">
          <p className="text-3xl font-black text-green-400">{totalClients}</p>
          <p className="text-gray-500 text-xs mt-1">عميل إجمالي</p>
        </Card>
        <Card className="p-4 bg-[#0d0d14] border border-blue-500/20 text-center">
          <p className="text-3xl font-black text-blue-400">{areas.filter(a => a.driveLink).length}</p>
          <p className="text-gray-500 text-xs mt-1">رابط نشط</p>
        </Card>
      </div>

      {/* Areas */}
      <div className="space-y-3">
        {areas.map(area => {
          const isEditing = editingId === area.id
          const colorClass = COLOR_MAP[area.color] || COLOR_MAP.blue
          const textClass = TEXT_MAP[area.color] || TEXT_MAP.blue

          return (
            <Card key={area.id} className={`p-5 bg-[#0d0d14] border ${colorClass} transition-all`}>
              {!isEditing ? (
                <div className="flex items-center gap-4 flex-wrap">
                  <div className={`p-3 rounded-xl bg-black/30 border ${colorClass}`}>
                    <MapPin className={`w-5 h-5 ${textClass}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-black text-base ${textClass}`}>{area.name}</h3>
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">{area.clientsCount} عميل</span>
                      {saved === area.id && <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-full flex items-center gap-1"><Check className="w-3 h-3" /> تم الحفظ</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                      <p className="text-gray-500 text-xs truncate max-w-xs" dir="ltr">{area.driveLink || "لا يوجد رابط"}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {area.driveLink && (
                      <a href={area.driveLink} target="_blank" rel="noopener noreferrer"
                        className={`p-2 rounded-lg bg-black/30 border ${colorClass} ${textClass} hover:bg-black/50 transition-all`}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <Button size="sm" onClick={() => startEdit(area)}
                      className={`h-9 px-3 bg-black/30 border ${colorClass} ${textClass} hover:bg-black/50 gap-1 text-xs`}>
                      <Edit2 className="w-3.5 h-3.5" /> تعديل
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-black ${textClass}`}>{area.name}</h3>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block">اسم المنطقة</label>
                      <Input value={editData.name || ""} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                        className="bg-black/50 border-white/10 text-white text-sm h-9" />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block">عدد العملاء</label>
                      <Input type="number" value={editData.clientsCount || 0} onChange={e => setEditData(d => ({ ...d, clientsCount: parseInt(e.target.value) || 0 }))}
                        className="bg-black/50 border-white/10 text-white text-sm h-9" dir="ltr" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-500 text-xs mb-1 block">رابط Google Drive</label>
                      <Input value={editData.driveLink || ""} onChange={e => setEditData(d => ({ ...d, driveLink: e.target.value }))}
                        className="bg-black/50 border-white/10 text-white text-sm h-9" dir="ltr" placeholder="https://drive.google.com/..." />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => saveArea(area.id)} className="h-8 bg-green-600 hover:bg-green-700 text-white gap-1 text-xs">
                      <Save className="w-3 h-3" /> حفظ التغييرات
                    </Button>
                    <Button size="sm" onClick={() => setEditingId(null)} variant="outline" className="h-8 border-white/10 text-gray-400 text-xs">إلغاء</Button>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
