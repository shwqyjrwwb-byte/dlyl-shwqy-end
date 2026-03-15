"use client"

import { useState, useEffect } from "react"

export default function AreasSimplePage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clients-from-folders')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setClients(data.clients)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const areas = [
    { id: 2, name: "القاهرة الجديدة" },
    { id: 3, name: "التجمع الخامس" },
    { id: 4, name: "وسط - مدينة نصر" },
    { id: 5, name: "أكتوبر" },
    { id: 6, name: "الأقاليم" },
  ]

  return (
    <div className="p-8 bg-black text-white min-h-screen" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-yellow-500">المناطق والعملاء</h1>
      
      {loading && <p className="text-xl">جاري التحميل...</p>}
      
      {!loading && (
        <div className="space-y-8">
          <p className="text-xl mb-4">إجمالي العملاء: {clients.length}</p>
          
          {areas.map(area => {
            const areaClients = clients.filter(c => c.areaId === area.id)
            return (
              <div key={area.id} className="border border-yellow-500 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">
                  {area.name} ({areaClients.length} عميل)
                </h2>
                
                {areaClients.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {areaClients.map(client => (
                      <div key={client.id} className="bg-gray-900 p-4 rounded border border-gray-700">
                        <p className="font-bold text-yellow-400">{client.name}</p>
                        <p className="text-sm text-gray-400">كود: {client.code}</p>
                        <p className="text-sm text-gray-400">ملفات: {client.filesCount}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">لا يوجد عملاء</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
