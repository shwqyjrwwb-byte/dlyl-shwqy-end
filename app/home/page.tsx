"use client"

import { Suspense, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { SectionsGrid } from "@/components/sections-grid"
import { WelcomeAvatar } from "@/components/welcome-avatar"
import { GlobalSearch } from "@/components/global-search"
import { PartnersMarquee } from "@/components/partners-marquee"
import { PageBackgroundSlideshow } from "@/components/page-background-slideshow"
import { ManagementChat } from "@/components/management-chat"
import { BackgroundMusicPlayer } from "@/components/background-music-player"
import { EmployeeProfileHeader } from "@/components/employee-profile-header"

function HomeContent() {
  useEffect(() => {
    // طلب إذن الإشعارات
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    
    // التحقق من الرسائل الجديدة وتشغيل صوت
    let lastMessageCount = 0
    const checkNewMessages = async () => {
      try {
        const response = await fetch("/api/announcements")
        const data = await response.json()
        if (data.success && data.announcements.length > lastMessageCount) {
          if (lastMessageCount > 0) {
            // تشغيل صوت الإشعار
            const audio = new Audio('/images/ايفون.mp3')
            audio.play().catch(console.error)
          }
          lastMessageCount = data.announcements.length
        }
      } catch (error) {
        console.error("Error checking messages:", error)
      }
    }
    
    checkNewMessages()
    const messageInterval = setInterval(checkNewMessages, 10000)
    
    // تحديث حالة الأونلاين كل دقيقة
    const updateOnlineStatus = async () => {
      const userId = localStorage.getItem("userId")
      if (userId) {
        try {
          await fetch("/api/users/online", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              userName: userId,
              userPosition: "موظف",
            }),
          })
        } catch (error) {
          console.error("Error updating online status:", error)
        }
      }
    }

    updateOnlineStatus()
    const statusInterval = setInterval(updateOnlineStatus, 60000)

    return () => {
      clearInterval(messageInterval)
      clearInterval(statusInterval)
    }
  }, [])
  return (
    <main className="relative min-h-screen" dir="rtl">
      {/* Background Slideshow */}
      <PageBackgroundSlideshow />
      
      {/* Employee Profile Header */}
      <EmployeeProfileHeader />
      
      {/* Background Music Player */}
      <BackgroundMusicPlayer />
      
      <div className="pt-24">
        <WelcomeAvatar />
        <HeroSection />

        <section className="py-8 px-4 bg-background">
          <GlobalSearch />
        </section>

        <SectionsGrid />

        <PartnersMarquee />
        
        <ManagementChat />
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}
