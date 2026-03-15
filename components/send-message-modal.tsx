"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, MessageSquare, Mic, Image as ImageIcon, Video, Send, Square } from "lucide-react"

interface SendMessageModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SendMessageModal({ isOpen, onClose }: SendMessageModalProps) {
  const [messageType, setMessageType] = useState<"text" | "voice" | "image" | "video">("text")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  if (!isOpen) return null

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setAudioBlob(audioBlob)
        setAudioUrl(URL.createObjectURL(audioBlob))
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("فشل في الوصول للميكروفون")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleSend = async () => {
    setIsSending(true)
    
    try {
      let fileData = null
      let fileName = null

      // تحويل الملف إلى base64
      if (file) {
        fileData = await fileToBase64(file)
        fileName = file.name
      } else if (audioBlob && messageType === "voice") {
        fileData = await blobToBase64(audioBlob)
        fileName = `voice-${Date.now()}.webm`
      }

      // إرسال الرسالة إلى API
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: messageType,
          content: message,
          fileData,
          fileName,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert("تم إرسال الرسالة بنجاح!")
        
        // إرسال إشعار للموظفين
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('قرار جديد من الإدارة', {
            body: messageType === 'text' ? message.substring(0, 50) : 'رسالة جديدة من رئيس مجلس الإدارة',
            icon: '/images/d8-aa-d8-b5-d9-85-d9-8a-d9-85-20-d8-a8-d8-af-d9-88-d9-86-20-d8-b9-d9-86-d9-88-d8-a7-d9-86-20-281-29.jpeg',
          })
        }
        
        setMessage("")
        setFile(null)
        setAudioBlob(null)
        setAudioUrl(null)
        onClose()
      } else {
        alert("فشل في إرسال الرسالة: " + (data.error || "خطأ غير معروف"))
      }
    } catch (error) {
      console.error("Error sending message:", error)
      alert("حدث خطأ أثناء الإرسال")
    }
    
    setIsSending(false)
  }

  // دالة لتحويل File إلى base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  // دالة لتحويل Blob إلى base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card 
        className="max-w-2xl w-full bg-gray-900 border-4 border-amber-500 shadow-2xl shadow-amber-500/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-black/20 p-2 rounded-lg">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black">إرسال رسالة جديدة</h2>
                <p className="text-sm font-bold text-amber-900">قرارات الإدارة</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-black hover:bg-black/20 h-10 w-10 p-0"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Label className="text-lg font-bold text-amber-500 mb-3 block">نوع الرسالة</Label>
            <div className="grid grid-cols-4 gap-3">
              <Button
                type="button"
                onClick={() => setMessageType("text")}
                className={`h-20 flex-col gap-2 ${
                  messageType === "text" 
                    ? "bg-amber-600 text-black border-2 border-amber-400" 
                    : "bg-black text-amber-500 border-2 border-amber-600/30 hover:border-amber-500"
                }`}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm font-bold">نص</span>
              </Button>
              
              <Button
                type="button"
                onClick={() => setMessageType("voice")}
                className={`h-20 flex-col gap-2 ${
                  messageType === "voice" 
                    ? "bg-amber-600 text-black border-2 border-amber-400" 
                    : "bg-black text-amber-500 border-2 border-amber-600/30 hover:border-amber-500"
                }`}
              >
                <Mic className="w-6 h-6" />
                <span className="text-sm font-bold">صوت</span>
              </Button>
              
              <Button
                type="button"
                onClick={() => setMessageType("image")}
                className={`h-20 flex-col gap-2 ${
                  messageType === "image" 
                    ? "bg-amber-600 text-black border-2 border-amber-400" 
                    : "bg-black text-amber-500 border-2 border-amber-600/30 hover:border-amber-500"
                }`}
              >
                <ImageIcon className="w-6 h-6" />
                <span className="text-sm font-bold">صورة</span>
              </Button>
              
              <Button
                type="button"
                onClick={() => setMessageType("video")}
                className={`h-20 flex-col gap-2 ${
                  messageType === "video" 
                    ? "bg-amber-600 text-black border-2 border-amber-400" 
                    : "bg-black text-amber-500 border-2 border-amber-600/30 hover:border-amber-500"
                }`}
              >
                <Video className="w-6 h-6" />
                <span className="text-sm font-bold">فيديو</span>
              </Button>
            </div>
          </div>

          {messageType === "text" && (
            <div>
              <Label htmlFor="message" className="text-lg font-bold text-amber-500 mb-3 block">
                نص الرسالة
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="min-h-[200px] text-lg bg-black text-amber-100 border-2 border-amber-600/30 focus:border-amber-500 placeholder:text-amber-700"
              />
            </div>
          )}

          {messageType === "voice" && (
            <div>
              <Label className="text-lg font-bold text-amber-500 mb-3 block">
                تسجيل صوتي
              </Label>
              <div className="space-y-4">
                {!audioUrl ? (
                  <div className="bg-black border-2 border-amber-600/30 rounded-xl p-8 text-center">
                    <Button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`h-24 w-24 rounded-full ${
                        isRecording 
                          ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                          : "bg-amber-600 hover:bg-amber-700"
                      } text-white`}
                    >
                      {isRecording ? <Square className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
                    </Button>
                    <p className="text-amber-500 font-bold mt-4">
                      {isRecording ? "جاري التسجيل... اضغط لإيقاف" : "اضغط لبدء التسجيل"}
                    </p>
                  </div>
                ) : (
                  <div className="bg-black border-2 border-green-600/30 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-600 p-3 rounded-full">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-green-500 font-bold">تم التسجيل بنجاح</p>
                        <audio controls src={audioUrl} className="w-full mt-2" />
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        setAudioBlob(null)
                        setAudioUrl(null)
                      }}
                      variant="outline"
                      className="w-full border-2 border-amber-600 text-amber-500 hover:bg-amber-600/10"
                    >
                      تسجيل مرة أخرى
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {(messageType === "image" || messageType === "video") && (
            <div>
              <Label htmlFor="file" className="text-lg font-bold text-amber-500 mb-3 block">
                {messageType === "image" && "رفع صورة"}
                {messageType === "video" && "رفع فيديو"}
              </Label>
              <Input
                id="file"
                type="file"
                accept={
                  messageType === "image" ? "image/*" :
                  "video/*"
                }
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="h-14 text-lg bg-black text-amber-100 border-2 border-amber-600/30 focus:border-amber-500"
              />
              {file && (
                <p className="text-sm text-amber-500 mt-2 font-bold">
                  تم اختيار: {file.name}
                </p>
              )}
            </div>
          )}

          {(messageType === "image" || messageType === "video" || (messageType === "voice" && audioUrl)) && (
            <div>
              <Label htmlFor="caption" className="text-lg font-bold text-amber-500 mb-3 block">
                تعليق (اختياري)
              </Label>
              <Textarea
                id="caption"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="أضف تعليق على الملف..."
                className="min-h-[100px] text-lg bg-black text-amber-100 border-2 border-amber-600/30 focus:border-amber-500 placeholder:text-amber-700"
              />
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSend}
              disabled={isSending || (messageType === "text" && !message) || (messageType === "voice" && !audioBlob) || ((messageType === "image" || messageType === "video") && !file)}
              className="flex-1 h-14 gap-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-black text-lg"
            >
              <Send className="w-6 h-6" />
              {isSending ? "جاري الإرسال..." : "إرسال الرسالة"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="h-14 px-8 text-lg font-bold border-2 border-amber-600 text-amber-500 hover:bg-amber-600/10"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
