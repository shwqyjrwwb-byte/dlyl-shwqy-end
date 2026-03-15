"use client"

import { useState, useEffect } from "react"

export default function TestClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClients() {
      console.log('Fetching clients...')
      try {
        const response = await fetch('/api/clients-from-folders')
        const data = await response.json()
        console.log('Data:', data)
        
        if (data.success) {
          setClients(data.clients)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])
  
  const area2Clients = clients.filter(c => c.areaId === 2)
  
  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">اختبار البيانات</h1>
      
      {loading && <p>جاري التحميل...</p>}
      
      {!loading && (
        <>
          <div className="mb-4">
            <p className="text-lg">إجمالي العملاء: {clients.length}</p>
            <p className="text-lg">عملاء القاهرة الجديدة: {area2Clients.length}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold mt-6 mb-3">عملاء القاهرة الجديدة:</h2>
            {area2Clients.map((client, index) => (
              <div key={client.id} className="p-4 border rounded bg-white">
                <p className="font-bold">{index + 1}. {client.name}</p>
                <p className="text-sm text-gray-600">كود: {client.code}</p>
                <p className="text-sm text-gray-600">عدد الملفات: {client.filesCount}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
