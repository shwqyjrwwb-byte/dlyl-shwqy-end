"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"

export function NotificationBadge() {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    checkUnreadMessages()
    
    // التحقق من الرسائل الجديدة كل 10 ثواني
    const interval = setInterval(checkUnreadMessages, 10000)
    return () => clearInterval(interval)
  }, [])

  const checkUnreadMessages = async () => {
    try {
      const response = await fetch("/api/announcements")
      const data = await response.json()
      
      if (data.success) {
        const lastReadTime = localStorage.getItem("lastReadAnnouncementTime")
        const lastRead = lastReadTime ? new Date(lastReadTime).getTime() : 0
        
        const unread = data.announcements.filter((msg: any) => {
          const msgTime = new Date(msg.createdAt).getTime()
          return msgTime > lastRead
        }).length
        
        setUnreadCount(unread)
      }
    } catch (error) {
      console.error("Error checking messages:", error)
    }
  }

  if (unreadCount === 0) return null

  return (
    <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-black border-2 border-white animate-pulse shadow-lg">
      {unreadCount > 9 ? "9+" : unreadCount}
    </div>
  )
}
