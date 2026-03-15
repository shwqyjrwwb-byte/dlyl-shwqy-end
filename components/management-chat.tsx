"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Mic, Image as ImageIcon, Video, FileText } from "lucide-react"
import Image from "next/image"
import { NotificationBadge } from "./notification-badge"

interface Announcement {
  id: string
  type: "text" | "voice" | "image" | "video"
  content: string
  fileData?: string // base64 data
  fileName?: string
  senderName: string
  senderTitle: string
  senderImage: string
  createdAt: string
}

export function ManagementChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadMessages()
      // تحديث وقت آخر قراءة عند فتح الشات
      localStorage.setItem("lastReadAnnouncementTime", new Date().toISOString())
    }
    
    // تحديث الرسائل كل 10 ثواني
    const interval = setInterval(() => {
      if (isOpen) {
        loadMessages()
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [isOpen])

  const loadMessages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/announcements")
      const data = await response.json()
      if (data.success) {
        setMessages(data.announcements)
      } else {
        setMessages([])
      }
    } catch (error) {
      console.error("Error loading messages:", error)
      setMessages([])
    }
    setIsLoading(false)
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return "منذ لحظات"
    if (seconds < 3600) return `منذ ${Math.floor(seconds / 60)} دقيقة`
    if (seconds < 86400) return `منذ ${Math.floor(seconds / 3600)} ساعة`
    return `منذ ${Math.floor(seconds / 86400)} يوم`
  }

  return (
    <>
      {/* زر فتح الشات - ذهبي احترافي */}
      {!isOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <div 
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/70 transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-amber-300/50 backdrop-blur-sm"
          >
            <NotificationBadge />
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-black leading-tight">قرارات الإدارة</p>
                <p className="text-sm text-amber-100 font-bold">Management Chat</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نافذة الشات */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96">
          <Card className="shadow-2xl border-4 border-amber-300 bg-white overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">قرارات الإدارة</h3>
                    <p className="text-xs text-amber-100">Management Decisions</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-4 bg-amber-50/30">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-amber-600"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-10 h-10 text-amber-600" />
                  </div>
                  <p className="text-gray-600 font-bold text-lg mb-2">لا توجد رسائل حالياً</p>
                  <p className="text-gray-500 text-sm">سيتم عرض قرارات الإدارة هنا</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-white rounded-xl p-4 shadow-md border-2 border-amber-200">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber-500">
                          <Image
                            src={msg.senderImage}
                            alt={msg.senderName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-gray-900">{msg.senderName}</p>
                          <p className="text-xs text-amber-600 font-bold">{msg.senderTitle}</p>
                        </div>
                        <span className="text-xs text-gray-400">{getTimeAgo(msg.createdAt)}</span>
                      </div>

                      {/* Message Content */}
                      {msg.type === "text" && msg.content && (
                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                          <div className="flex items-start gap-2 mb-2">
                            <FileText className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      )}

                      {msg.type === "voice" && msg.fileData && (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Mic className="w-4 h-4 text-green-600" />
                            <p className="text-sm font-bold text-green-700">رسالة صوتية</p>
                          </div>
                          <audio controls src={msg.fileData} className="w-full" />
                          {msg.content && (
                            <p className="text-sm text-gray-600 mt-2">{msg.content}</p>
                          )}
                        </div>
                      )}

                      {msg.type === "image" && msg.fileData && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <ImageIcon className="w-4 h-4 text-blue-600" />
                            <p className="text-sm font-bold text-blue-700">صورة</p>
                          </div>
                          <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image
                              src={msg.fileData}
                              alt="صورة"
                              fill
                              className="object-cover"
                            />
                          </div>
                          {msg.content && (
                            <p className="text-sm text-gray-600 mt-2">{msg.content}</p>
                          )}
                        </div>
                      )}

                      {msg.type === "video" && msg.fileData && (
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Video className="w-4 h-4 text-purple-600" />
                            <p className="text-sm font-bold text-purple-700">فيديو</p>
                          </div>
                          <video controls src={msg.fileData} className="w-full rounded-lg" />
                          {msg.content && (
                            <p className="text-sm text-gray-600 mt-2">{msg.content}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-3 border-t-2 border-amber-200">
              <p className="text-xs text-gray-600 text-center">
                هذا الشات للاستقبال فقط - لا يمكن الرد
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
