"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Trash2, Clock, CheckCheck, Bell, Pin } from "lucide-react"

interface Message {
  id: string
  title: string
  body: string
  createdAt: string
  pinned?: boolean
}

export function DevMessaging() {
  const [messages, setMessages] = useState<Message[]>([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const r = await fetch("/api/announcements")
      const d = await r.json()
      if (d.success) setMessages(d.announcements || [])
    } catch {
      const saved = localStorage.getItem("devMessages")
      if (saved) setMessages(JSON.parse(saved))
    }
  }

  const sendMessage = async () => {
    if (!title.trim() || !body.trim()) return
    setSending(true)
    const msg: Message = { id: Date.now().toString(), title, body, createdAt: new Date().toISOString() }
    try {
      await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message: body, type: "text" }),
      })
      await loadMessages()
    } catch {
      const updated = [msg, ...messages]
      setMessages(updated)
      localStorage.setItem("devMessages", JSON.stringify(updated))
    }
    setTitle("")
    setBody("")
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 2000)
  }

  const deleteMessage = async (id: string) => {
    const updated = messages.filter(m => m.id !== id)
    setMessages(updated)
    localStorage.setItem("devMessages", JSON.stringify(updated))
  }

  const togglePin = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, pinned: !m.pinned } : m)
    setMessages(updated)
    localStorage.setItem("devMessages", JSON.stringify(updated))
  }

  const sorted = [...messages].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">قرارات الإدارة</h2>
        <p className="text-gray-500 text-sm">إرسال إعلانات وقرارات لجميع الموظفين</p>
      </div>

      {/* Compose */}
      <Card className="p-5 bg-[#0d0d14] border border-pink-500/20 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-pink-500/10 rounded-lg">
            <Bell className="w-4 h-4 text-pink-400" />
          </div>
          <h3 className="text-pink-400 font-bold">إعلان جديد</h3>
        </div>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="عنوان الإعلان..."
          className="bg-black/50 border-white/10 text-white font-semibold"
        />
        <Textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="نص الإعلان أو القرار..."
          className="bg-black/50 border-white/10 text-white min-h-[100px] resize-none"
        />
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-xs">{body.length} حرف</p>
          <Button
            onClick={sendMessage}
            disabled={sending || !title.trim() || !body.trim()}
            className={`gap-2 font-bold ${sent ? "bg-green-600 hover:bg-green-700" : "bg-pink-600 hover:bg-pink-700"} text-white`}
          >
            {sent ? <><CheckCheck className="w-4 h-4" /> تم الإرسال</> : sending ? "جاري الإرسال..." : <><Send className="w-4 h-4" /> إرسال</>}
          </Button>
        </div>
      </Card>

      {/* Messages List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">الإعلانات السابقة</h3>
          <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-500 text-xs rounded-full">{messages.length}</span>
        </div>
        <div className="space-y-3">
          {sorted.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>لا توجد إعلانات</p>
            </div>
          ) : sorted.map(msg => (
            <Card key={msg.id} className={`p-4 bg-[#0d0d14] border transition-all ${msg.pinned ? "border-amber-500/30 bg-amber-500/5" : "border-white/5 hover:border-white/10"}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${msg.pinned ? "bg-amber-500/20" : "bg-pink-500/10"}`}>
                  <MessageSquare className={`w-4 h-4 ${msg.pinned ? "text-amber-400" : "text-pink-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-white font-bold text-sm">{msg.title}</h4>
                    {msg.pinned && <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] rounded-full border border-amber-500/30 flex items-center gap-1"><Pin className="w-2.5 h-2.5" /> مثبت</span>}
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">{msg.body}</p>
                  <div className="flex items-center gap-1 text-gray-600 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(msg.createdAt).toLocaleString("ar-EG")}</span>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => togglePin(msg.id)} className={`p-1.5 rounded-lg border transition-all ${msg.pinned ? "bg-amber-500/20 border-amber-500/30 text-amber-400" : "bg-white/5 border-white/10 text-gray-500 hover:text-amber-400"}`}>
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteMessage(msg.id)} className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
