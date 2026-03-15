"use client"

import { useState, useEffect, useRef } from "react"
import { Music, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Song {
  id: string
  title: string
  url: string
}

export function BackgroundMusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const savedPlaylist = localStorage.getItem("adminPlaylist")
    if (savedPlaylist) {
      const playlist = JSON.parse(savedPlaylist)
      setSongs(playlist)
      if (playlist.length > 0) {
        setIsPlaying(true)
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current && songs.length > 0) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentIndex, songs])

  const handleNext = () => {
    if (songs.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % songs.length)
    }
  }

  const handlePrevious = () => {
    if (songs.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length)
    }
  }

  const handleEnded = () => {
    handleNext()
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  if (songs.length === 0) {
    return null
  }

  const currentSong = songs[currentIndex]

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl shadow-2xl shadow-amber-500/50 p-4 border-2 border-amber-300 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <Music className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="text-white min-w-[200px]">
            <p className="font-black text-sm truncate">{currentSong.title}</p>
            <p className="text-xs text-amber-100">
              {currentIndex + 1} / {songs.length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handlePrevious}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleMute}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleNext}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={handleEnded}
        autoPlay
        loop={false}
      />
    </div>
  )
}
