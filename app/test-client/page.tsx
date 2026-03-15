"use client"

import { useState, useEffect } from "react"

export default function TestClientPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/clients-from-folders')
      .then(res => res.json())
      .then(data => {
        console.log('All data:', data)
        setData(data)
      })
  }, [])

  if (!data) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">اختبار العملاء</h1>
      <p className="mb-4">عدد العملاء: {data.clients?.length}</p>
      
      <div className="space-y-2">
        {data.clients?.slice(0, 5).map((client: any) => (
          <div key={client.id} className="p-4 border rounded">
            <p><strong>الاسم:</strong> {client.name}</p>
            <p><strong>الكود:</strong> {client.code} (نوع: {typeof client.code})</p>
            <p><strong>ID:</strong> {client.id}</p>
            <a 
              href={`/client/${client.code}`}
              className="text-blue-500 underline"
            >
              اذهب للعميل
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
