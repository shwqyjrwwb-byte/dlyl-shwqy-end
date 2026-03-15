"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Droplets, ExternalLink, Grid3X3, DoorOpen, Paintbrush, Square, Building2, Mountain } from "lucide-react"

const finishingVideos = [
  {
    id: "plumbing-electrical",
    name: "بنود السباكة",
    icon: Droplets,
    videos: [
      {
        title: "إزاي تضمن إن شغل الكهرباء في مشروعك يكون دقيق ومستمر بدون مفاجآت؟ ⚡",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-1"
      },
      {
        title: "إيه اللي يخلي SmartLight اختيارنا الأول في أعمال الكهرباء؟ 🤔⚡",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-2"
      },
      {
        title: "هل فكرت في يوم عن المخاطر اللي ممكن تسببها لو ركبت كهرباء التكييف والسخان غلط؟ ⚡",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-3"
      },
      {
        title: "هل فكرت قبل كده ليه بطلنا نستخدم مواسير الزهر في السباكة ؟ 👍",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-4"
      },
      {
        title: "لو عايز تعرف إزاي تبدأ تأسيس كهرباء الساوند سيستم وكهرباء المطبخ من البداية بطريقة صحيحة؟",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-5"
      },
      {
        title: "ازاي تخلي سلم الفيلا ينور اول ما تدوس عليه وازاي بيتم التأسيس ليه؟ 👌",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-6"
      },
      {
        title: "لو مش عايز تلاقي نفسك بتكسر في الحيطة عشان توصّل التليفزيون بعد التشطيب؟ أعرف الأساس الصح من الأول⚡",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-7"
      },
      {
        title: "عارف إن أي غلطة في تركيب بؤوج الكهرباء ممكن تسبب مشاكل كتير في التشطيب ؟! 🤔",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-8"
      },
      {
        title: "لو عايز تفهم تأسيسات الكهرباء صح وتعرف الفرق بين لوحة الكهرباء وأجهزة السمارت ⚡",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-9"
      },
      {
        title: "شرح مجموعة التليفزيون ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-10"
      },
      {
        title: "استخدامات القواطع ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-11"
      },
      {
        title: "طريقة تأسيس مجموعة البوتجاز ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-12"
      },
      {
        title: "تأسيس نظام الـ Smart✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-13"
      },
      {
        title: "تأسيس الـ LED Profile في السقف ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-14"
      },
      {
        title: "تأسيسات الكهرباء في الموقع✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-15"
      },
      {
        title: "تأسيس كهرباء نقط المطبخ ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-16"
      },
      {
        title: "تأسيس الكهرباء مجموعة البوتجاز✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-17"
      },
      {
        title: "تأسيس الكهرباء لــ Magnetec Track✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-18"
      },
      {
        title: "تأسيس الكهرباء للوزر المضئ الجزء الثالث✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-19"
      },
      {
        title: "تأسيس الكهرباء للوزر المضئ الجزء الثاني✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-20"
      },
      {
        title: "تأسيس الكهرباء للوزر المضئ ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-21"
      },
      {
        title: "تعديل لتأسيس الكهرباء في المطبخ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-22"
      },
      {
        title: "نصيحة مهمة لو هتعمل خوارنق جوة الكابينة الشاور ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-23"
      },
      {
        title: "خطوات تنفيذ تأسيس الكهرباء الجزء الثاني✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-24"
      },
      {
        title: "خطوات تنفيذ تأسيس الكهرباء الجزء الاول✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-25"
      },
      {
        title: "خطوات ظبط منسوب نقاط الكهرباء الجزء الثاني✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-26"
      },
      {
        title: "خطوات ظبط منسوب نقاط الكهرباء الجزء الاول✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-27"
      },
      {
        title: "خطوات تأسيس مجموعة التليفزيون الجزء الثاني ✨",
        url: "https://shawkygroup.com/finishing/plumbing-electrical-28"
      },
    ],
  },
  {
    id: "porcelain",
    name: "شرح بند البورسلين",
    icon: Grid3X3,
    videos: [
      {
        title: "طريقة تركيب البورسلين ✨",
        url: "https://shawkygroup.com/finishing/porcelain-1"
      },
      {
        title: "طريقة تركيب البورسلين 60*120✨",
        url: "https://shawkygroup.com/finishing/porcelain-2"
      },
      {
        title: "ادوات المستخدمة في تركيب البورسلين وقوة التحمل لكل نوع ✨",
        url: "https://shawkygroup.com/finishing/porcelain-3"
      },
      {
        title: "طريقة تقسيط وميول البورسلين ✨",
        url: "https://shawkygroup.com/finishing/porcelain-4"
      },
      {
        title: "تركيب البورسلين بمادة سوداء ✨",
        url: "https://shawkygroup.com/finishing/porcelain-5"
      },
    ],
  },
  {
    id: "wood",
    name: "شرح بند الأخشاب",
    icon: DoorOpen,
    videos: [
      {
        title: "طريقة تركيب البورسلين ✨",
        url: "https://shawkygroup.com/finishing/wood-1"
      },
      {
        title: "طريقة تركيب البورسلين 60*120✨",
        url: "https://shawkygroup.com/finishing/wood-2"
      },
      {
        title: "ادوات المستخدمة في تركيب البورسلين وقوة التحمل لكل نوع ✨",
        url: "https://shawkygroup.com/finishing/wood-3"
      },
      {
        title: "طريقة تقسيط وميول البورسلين ✨",
        url: "https://shawkygroup.com/finishing/wood-4"
      },
      {
        title: "تركيب البورسلين بمادة سوداء ✨",
        url: "https://shawkygroup.com/finishing/wood-5"
      },
    ],
  },
  {
    id: "plastering",
    name: "شرح بند المحارة",
    icon: Paintbrush,
    videos: [
      {
        title: "المقاول الشاطر رزق وطول ما انت بتحب شغلك هتعرف تبدع فيه 👌❤️",
        url: "https://shawkygroup.com/finishing/plastering-1"
      },
      {
        title: "هل في مقاسات لازم تلتزم بيها في تأميم الأبواب؟",
        url: "https://shawkygroup.com/finishing/plastering-2"
      },
      {
        title: "ازاي بيتم حساب بؤوج المحارة ✨",
        url: "https://shawkygroup.com/finishing/plastering-3"
      },
      {
        title: "نصيحة مهمة بخصوص المونة بتاعت المحارة✨",
        url: "https://shawkygroup.com/finishing/plastering-4"
      },
    ],
  },
  {
    id: "securit",
    name: "شرح بند السيكوريت",
    icon: Square,
    videos: [
      {
        title: "أحدث القطاعات الموجودة في السوق دلوقتي ولازم تبقى عارفها وانت بتشطب شقتك 👌❤️",
        url: "https://shawkygroup.com/finishing/securit-1"
      },
      {
        title: "انواع الاكسسوارات والزجاج المستخدم في الكابينة الشاور ✨",
        url: "https://shawkygroup.com/finishing/securit-2"
      },
      {
        title: "خطوات تركيب زجاج الكابينة الشاور ,, ✨",
        url: "https://shawkygroup.com/finishing/securit-3"
      },
    ],
  },
  {
    id: "futuristic",
    name: "شرح بند الفيوتك",
    icon: Building2,
    videos: [
      {
        title: "خطوات تركيب الفيوتيك !✨",
        url: "https://shawkygroup.com/finishing/futuristic-1"
      },
    ],
  },
  {
    id: "insulation",
    name: "شرح بند العزل",
    icon: Mountain,
    videos: [
      {
        title: "نصايح مهمة في اعمال الرووف ✨",
        url: "https://shawkygroup.com/finishing/insulation-1"
      },
      {
        title: "شرح اعمال العزل الحراري للروف ✨",
        url: "https://shawkygroup.com/finishing/insulation-2"
      },
    ],
  },
  {
    id: "swimming-pool",
    name: "شرح بند حمام السباحة",
    icon: Droplets,
    videos: [
      {
        title: "شاهد جميع فيديوهات حمام السباحة 🏊",
        url: "https://shawkygroup.com/finishing/swimming-pool"
      },
    ],
  },
  {
    id: "pvc",
    name: "شرح بند الـ PVC",
    icon: Square,
    videos: [
      {
        title: "شاهد جميع فيديوهات الـ PVC 📺",
        url: "https://shawkygroup.com/finishing/pvc"
      },
    ],
  },
  {
    id: "aluminum",
    name: "شرح بند الالموتال",
    icon: Building2,
    videos: [
      {
        title: "شاهد جميع فيديوهات الالموتال 🪟",
        url: "https://shawkygroup.com/finishing/aluminum"
      },
    ],
  },
  {
    id: "plumbing-playlist",
    name: "شرح بند السباكة - Playlist",
    icon: Droplets,
    videos: [
      {
        title: "شاهد جميع فيديوهات السباكة 🚰",
        url: "https://shawkygroup.com/finishing/plumbing"
      },
    ],
  },
  {
    id: "painting",
    name: "شرح بند الدهان",
    icon: Paintbrush,
    videos: [
      {
        title: "شاهد جميع فيديوهات الدهان 🎨",
        url: "https://shawkygroup.com/finishing/painting"
      },
    ],
  },
  {
    id: "marble",
    name: "شرح بند الرخام",
    icon: Mountain,
    videos: [
      {
        title: "شاهد جميع فيديوهات الرخام 💎",
        url: "https://shawkygroup.com/finishing/marble"
      },
    ],
  },
  {
    id: "gypsum",
    name: "شرح بند الجبس بورد",
    icon: Square,
    videos: [
      {
        title: "شاهد جميع فيديوهات الجبس بورد 📐",
        url: "https://shawkygroup.com/finishing/gypsum"
      },
    ],
  },
  {
    id: "air-conditioning",
    name: "شرح بند التكييفات",
    icon: Building2,
    videos: [
      {
        title: "شاهد جميع فيديوهات التكييفات ❄️",
        url: "https://shawkygroup.com/finishing/air-conditioning"
      },
    ],
  },
  {
    id: "concrete",
    name: "شرح بند الخرسانة",
    icon: Building2,
    videos: [
      {
        title: "شاهد جميع فيديوهات الخرسانة 🏗️",
        url: "https://shawkygroup.com/finishing/concrete"
      },
    ],
  },
]

export default function FinishingExplanationPage() {
  const [selected, setSelected] = useState(finishingVideos[0].id)
  const selectedCategory = finishingVideos.find((c) => c.id === selected)

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader
        title="شرح بنود التشطيب"
        description="فيديوهات تعليمية شاملة لجميع بنود التشطيب"
        icon={FileText}
      />
      
      {/* صورة شرح بنود التشطيب */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 bg-white">
          <img
            src="/images/شرح بنود التشطيب.png"
            alt="شرح بنود التشطيب"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      
      <section className="py-8 px-4" dir="rtl">
        <div className="max-w-6xl mx-auto">
          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {finishingVideos.map((category) => {
              const Icon = category.icon
              const isActive = selected === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelected(category.id)}
                  className={`flex items-center gap-4 p-6 rounded-xl border-2 transition-all ${
                    isActive
                      ? "bg-primary/10 border-primary text-primary shadow-lg"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  <div className={`p-3 rounded-lg ${isActive ? "bg-primary/20" : "bg-muted"}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-right flex-1">
                    <h3 className="text-lg font-bold">{category.name}</h3>
                    <p className="text-sm opacity-70">{category.videos.length} فيديو</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Videos List */}
          {selectedCategory && (
            <Card className="bg-card border-2 border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                {(() => {
                  const Icon = selectedCategory.icon
                  return <Icon className="w-6 h-6 text-primary" />
                })()}
                <h2 className="text-2xl font-black text-primary">{selectedCategory.name}</h2>
                <span className="mr-auto bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold">
                  {selectedCategory.videos.length} فيديو
                </span>
              </div>

              <ScrollArea className="h-[600px]" dir="rtl">
                <div className="space-y-3 pr-4">
                  {selectedCategory.videos.map((video, index) => (
                    <a
                      key={index}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 items-start p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-black group-hover:bg-primary group-hover:text-white transition-all">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-base leading-relaxed font-bold group-hover:text-primary transition-all">
                          {video.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                          <ExternalLink className="w-3 h-3" />
                          اضغط للمشاهدة على YouTube
                        </p>
                      </div>
                      <div className="flex-shrink-0 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                        YouTube
                      </div>
                    </a>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </div>
      </section>
    </main>
  )
}
