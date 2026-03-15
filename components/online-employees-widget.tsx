"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Users } from "lucide-react"
import Image from "next/image"

interface OnlineEmployee {
  userId: string
  userName: string
  userPosition: string
  lastSeen: string
}

export function OnlineEmployeesWidget() {
  const [employees, setEmployees] = useState<OnlineEmployee[]>([])

  useEffect(() => {
    loadOnlineEmployees()
    const interval = setInterval(loadOnlineEmployees, 30000) // تحديث كل 30 ثانية
    return () => clearInterval(interval)
  }, [])

  const loadOnlineEmployees = async () => {
    try {
      const response = await fetch("/api/users/online")
      const data = await response.json()
      if (data.success) {
        setEmployees(data.users || [])
      }
    } catch (error) {
      console.error("Error loading online employees:", error)
    }
  }

  return (
    <Card className="p-6 shadow-xl shadow-amber-500/20 bg-gray-900 border-2 border-amber-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-600 p-2 rounded-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-green-500">الموظفين المتصلين الآن</h2>
          <p className="text-green-300 text-sm">تحديث تلقائي كل 30 ثانية</p>
        </div>
        <div className="bg-green-500/20 px-4 py-2 rounded-full border-2 border-green-500">
          <span className="text-2xl font-black text-green-400">{employees.length}</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {employees.length > 0 ? (
          employees.map((emp, idx) => (
            <div
              key={emp.userId}
              className="flex items-center gap-3 bg-black p-4 rounded-lg border border-green-600/30 hover:border-green-500 transition-all"
            >
              <div className="relative">
                <div className="bg-green-600 text-white font-black w-10 h-10 rounded-full flex items-center justify-center text-sm">
                  {idx + 1}
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-black rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <span className="font-bold text-green-100 block text-lg">{emp.userName}</span>
                <span className="text-sm text-green-600">{emp.userPosition}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-bold">متصل الآن</span>
                </div>
                <span className="text-xs text-green-700">
                  {new Date(emp.lastSeen).toLocaleTimeString('ar-EG', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-green-600/30 mx-auto mb-4" />
            <p className="text-green-600 font-bold">لا يوجد موظفين متصلين حالياً</p>
          </div>
        )}
      </div>
    </Card>
  )
}
