"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Plus, Trash2, Play, Pause, SkipForward, SkipBack, Volume2, Upload } from "lucide-react"

interface Song {
  id: string
  title: string
  url?: string
}

export function DevPlaylist() {
  const [songs, setSongs] = useState<Song[]>([])
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("adminPlaylist")
    if (saved) setSongs(JSON.parse(saved))
  }, [])

  const save = (list: Song[]) => {
    setSongs(list)
    localStorage.setItem("adminPlaylist", JSON.stringify(list))
  }

  const addSong = () => {
    if (!title.trim()) return
    const url = file ? URL.createObjectURL(file) : undefined
    const newSong: Song = { id: Date.now().toString(), title, url }
    save([...songs, newSong])
    setTitle("")
    setFile(null)
  }

  const deleteSong = (id: string) => {
    if (playing === id) { audioRef.current?.pause(); setPlaying(null) }
    save(songs.filter(s => s.id !== id))
  }

  const playSong = (song: Song, idx: number) => {
    if (!song.url) return
    if (playing === song.id) {
      audioRef.current?.pause()
      setPlaying(null)
    } else {
      if (audioRef.current) { audioRef.current.src = song.url; audioRef.current.play() }
      setPlaying(song.id)
      setCurrentIdx(idx)
    }
  }

  const next = () => {
    const idx = (currentIdx + 1) % songs.length
    playSong(songs[idx], idx)
  }

  const prev = () => {
    const idx = (currentIdx - 1 + songs.length) % songs.length
    playSong(songs[idx], idx)
  }

  const currentSong = songs.find(s => s.id === playing)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">مشغل الموسيقى</h2>
        <p className="text-gray-500 text-sm">إدارة قائمة تشغيل الموسيقى في المنصة</p>
      </div>

      {/* Player */}
      {currentSong && (
        <Card className="p-5 bg-gradient-to-l from-orange-500/10 via-[#0d0d14] to-[#0d0d14] border border-orange-500/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
              <Music className="w-7 h-7 text-orange-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold">{currentSong.title}</p>
              <p className="text-orange-400 text-xs">جاري التشغيل...</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={prev} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                <SkipBack className="w-4 h-4" />
              </button>
              <button onClick={() => playSong(currentSong, currentIdx)} className="p-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-black transition-all">
                <Pause className="w-5 h-5" />
              </button>
              <button onClick={next} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
          <audio ref={audioRef} onEnded={next} />
        </Card>
      )}

      {/* Add Song */}
      <Card className="p-5 bg-[#0d0d14] border border-orange-500/20 space-y-3">
        <h3 className="text-orange-400 font-bold flex items-center gap-2"><Plus className="w-4 h-4" /> إضافة أغنية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="اسم الأغنية" className="bg-black/50 border-white/10 text-white" />
          <label className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-md px-3 py-2 cursor-pointer hover:border-orange-500/30 transition-all">
            <Upload className="w-4 h-4 text-gray-500" />
            <span className="text-gray-400 text-sm truncate">{file ? file.name : "اختر ملف صوتي..."}</span>
            <input type="file" accept="audio/*" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
          </label>
        </div>
        <Button onClick={addSong} disabled={!title.trim()} className="bg-orange-600 hover:bg-orange-700 text-white gap-2 font-bold">
          <Plus className="w-4 h-4" /> إضافة
        </Button>
      </Card>

      {/* Songs List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">قائمة التشغيل</h3>
          <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-500 text-xs rounded-full">{songs.length} أغنية</span>
        </div>
        {songs.length === 0 ? (
          <Card className="p-10 bg-[#0d0d14] border border-white/5 text-center">
            <Music className="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <p className="text-gray-600">لا توجد أغاني في القائمة</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {songs.map((song, idx) => (
              <Card key={song.id} className={`p-4 bg-[#0d0d14] border transition-all ${playing === song.id ? "border-orange-500/40 bg-orange-500/5" : "border-white/5 hover:border-white/10"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-xs w-5 text-center font-mono">{idx + 1}</span>
                  <div className={`p-2 rounded-lg ${playing === song.id ? "bg-orange-500/20" : "bg-white/5"}`}>
                    <Music className={`w-4 h-4 ${playing === song.id ? "text-orange-400" : "text-gray-500"}`} />
                  </div>
                  <p className={`flex-1 text-sm font-semibold ${playing === song.id ? "text-orange-300" : "text-white"}`}>{song.title}</p>
                  <div className="flex gap-2">
                    {song.url && (
                      <button onClick={() => playSong(song, idx)} className={`p-1.5 rounded-lg border transition-all ${playing === song.id ? "bg-orange-500/20 border-orange-500/30 text-orange-400" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"}`}>
                        {playing === song.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                    )}
                    <button onClick={() => deleteSong(song.id)} className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
