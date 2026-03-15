"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Plus, Trash2, Save, Upload } from "lucide-react"

interface Song {
  id: string
  title: string
  file: File | null
  url: string
}

export function PlaylistManager() {
  const [songs, setSongs] = useState<Song[]>([])
  const [newSongTitle, setNewSongTitle] = useState("")
  const [newSongFile, setNewSongFile] = useState<File | null>(null)

  useEffect(() => {
    loadPlaylist()
  }, [])

  const loadPlaylist = () => {
    const savedPlaylist = localStorage.getItem("adminPlaylist")
    if (savedPlaylist) {
      const playlist = JSON.parse(savedPlaylist)
      setSongs(playlist.map((song: any) => ({
        ...song,
        file: null // الملفات لا يمكن حفظها في localStorage
      })))
    }
  }

  const addSong = () => {
    if (!newSongTitle.trim() || !newSongFile) {
      alert("الرجاء إدخال اسم الأغنية واختيار ملف")
      return
    }

    if (songs.length >= 10) {
      alert("لا يمكن إضافة أكثر من 10 أغاني")
      return
    }

    // إنشاء URL للملف
    const fileUrl = URL.createObjectURL(newSongFile)

    const newSong: Song = {
      id: Date.now().toString(),
      title: newSongTitle.trim(),
      file: newSongFile,
      url: fileUrl,
    }

    setSongs([...songs, newSong])
    setNewSongTitle("")
    setNewSongFile(null)
    
    // إعادة تعيين input الملف
    const fileInput = document.getElementById('song-file') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const removeSong = (id: string) => {
    setSongs(songs.filter(song => song.id !== id))
  }

  const savePlaylist = () => {
    // حفظ فقط المعلومات الأساسية (بدون الملفات)
    const playlistData = songs.map(song => ({
      id: song.id,
      title: song.title,
      url: song.url,
    }))
    localStorage.setItem("adminPlaylist", JSON.stringify(playlistData))
    alert("تم حفظ قائمة التشغيل بنجاح!")
  }

  return (
    <Card className="p-6 shadow-xl shadow-amber-500/20 bg-gray-900 border-2 border-amber-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-600 p-2 rounded-lg">
          <Music className="w-6 h-6 text-black" />
        </div>
        <h2 className="text-2xl font-black text-amber-500">إدارة قائمة التشغيل</h2>
      </div>

      {/* Add Song Form */}
      <div className="bg-black border-2 border-amber-600/30 rounded-xl p-4 mb-4">
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="اسم الأغنية..."
            value={newSongTitle}
            onChange={(e) => setNewSongTitle(e.target.value)}
            className="h-12 bg-gray-900 border-amber-600/30 focus:border-amber-500 text-amber-100"
          />
          <div className="relative">
            <Input
              id="song-file"
              type="file"
              accept="audio/*"
              onChange={(e) => setNewSongFile(e.target.files?.[0] || null)}
              className="h-12 bg-gray-900 border-amber-600/30 focus:border-amber-500 text-amber-100"
            />
            {newSongFile && (
              <p className="text-xs text-green-500 mt-1">✓ تم اختيار: {newSongFile.name}</p>
            )}
          </div>
          <Button
            onClick={addSong}
            disabled={songs.length >= 10}
            className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            <Upload className="w-5 h-5" />
            إضافة أغنية ({songs.length}/10)
          </Button>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center gap-3 bg-black p-3 rounded-lg border border-amber-600/30 hover:border-amber-500 transition-all"
            >
              <div className="bg-amber-600 text-black font-black w-8 h-8 rounded-full flex items-center justify-center text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-amber-100 truncate">{song.title}</p>
                <p className="text-xs text-amber-600">ملف صوتي محلي</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeSong(song.id)}
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-amber-600">
            <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="font-bold">لا توجد أغاني في القائمة</p>
          </div>
        )}
      </div>

      {/* Save Button */}
      <Button
        onClick={savePlaylist}
        disabled={songs.length === 0}
        className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-black font-bold h-12"
      >
        <Save className="w-5 h-5" />
        حفظ قائمة التشغيل
      </Button>
    </Card>
  )
}
