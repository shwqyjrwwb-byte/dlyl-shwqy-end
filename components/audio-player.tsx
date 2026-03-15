"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2 } from "lucide-react"

interface AudioPlayerProps {
  audioUrl: string
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isStarted, setIsStarted] = useState(false)
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // تعيين الصوت للتشغيل التلقائي والتكرار
    audio.volume = 0.4 // مستوى صوت مناسب
    audio.loop = true

    const handleCanPlay = async () => {
      try {
        // محاولة التشغيل التلقائي
        await audio.play()
        setIsStarted(true)
        setShowButton(false)
      } catch (err) {
        console.log("[Audio] Auto-play blocked by browser, showing start button")
        setShowButton(true)
      }
    }

    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  const startAudio = async () => {
    if (!audioRef.current) return
    
    try {
      await audioRef.current.play()
      setIsStarted(true)
      setShowButton(false)
    } catch (err) {
      console.log("[Audio] Failed to start audio:", err)
    }
  }

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        crossOrigin="anonymous" 
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
      
      {showButton && !isStarted && (
        <button
          onClick={startAudio}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white px-6 py-3 rounded-2xl shadow-2xl shadow-amber-500/50 hover:shadow-amber-600/70 transition-all duration-300 hover:scale-105 border-2 border-amber-300/50 backdrop-blur-sm"
          title="تشغيل الموسيقى"
        >
          <Volume2 className="w-6 h-6" />
          <span className="font-bold text-lg">تشغيل الموسيقى</span>
        </button>
      )}
    </>
  )
}
