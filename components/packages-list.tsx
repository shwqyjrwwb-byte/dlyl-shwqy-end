"use client"

import { useState, type MouseEvent } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Crown, Eye, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// الباقات مرتبة من الأقل للأعلى بتصميم احترافي فاخر
const packages = [
  {
    id: "economic",
    name: "ECONOMIC PACKAGE",
    nameAr: "الباقة الاقتصادية",
    color: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
    borderColor: "border-gray-400",
    textColor: "text-gray-800",
    bgColor: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
    glowColor: "shadow-gray-400/50",
    order: 1,
    icon: "💼",
    image: "/images/package-economic-details.jpg",
    detailImage: "/images/package-economic-details.jpg",
    description: "باقة اقتصادية مناسبة للميزانيات المحدودة",
  },
  {
    id: "medium",
    name: "MEDIUM PACKAGE",
    nameAr: "الباقة المتوسطة",
    color: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
    borderColor: "border-blue-500",
    textColor: "text-blue-900",
    bgColor: "bg-gradient-to-br from-blue-50 via-white to-blue-100",
    glowColor: "shadow-blue-500/50",
    order: 2,
    icon: "🏠",
    image: "/images/package-medium-details.jpg",
    detailImage: "/images/package-medium-details.jpg",
    description: "باقة متوازنة بجودة ممتازة وسعر مناسب",
  },
  {
    id: "vip",
    name: "VIP PACKAGE",
    nameAr: "باقة في آي بي",
    color: "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
    borderColor: "border-amber-500",
    textColor: "text-amber-900",
    bgColor: "bg-gradient-to-br from-amber-50 via-white to-amber-100",
    glowColor: "shadow-amber-500/60",
    order: 3,
    icon: "⭐",
    image: "/images/package-vip-details.jpg",
    detailImage: "/images/package-vip-details.jpg",
    description: "باقة راقية بخامات عالية الجودة",
  },
  {
    id: "ultra-vip",
    name: "ULTRA VIP PACKAGE",
    nameAr: "باقة ألترا في آي بي",
    color: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500",
    borderColor: "border-orange-500",
    textColor: "text-orange-900",
    bgColor: "bg-gradient-to-br from-orange-50 via-white to-red-50",
    glowColor: "shadow-orange-500/60",
    order: 4,
    icon: "💎",
    image: "/images/package-ultra-vip-details.jpg",
    detailImage: "/images/package-ultra-vip-details.jpg",
    description: "أعلى مستويات الفخامة والرقي",
  },
  {
    id: "super-ultra-vip",
    name: "SUPER ULTRA VIP",
    nameAr: "باقة سوبر ألترا في آي بي",
    color: "bg-gradient-to-br from-red-500 via-rose-600 to-red-700",
    borderColor: "border-red-600",
    textColor: "text-red-900",
    bgColor: "bg-gradient-to-br from-red-50 via-white to-rose-100",
    glowColor: "shadow-red-600/70",
    premium: true,
    order: 5,
    icon: "👑",
    image: "/images/package-super-ultra-vip-details.jpg",
    detailImage: "/images/package-super-ultra-vip-details.jpg",
    description: "الباقة الملكية - لا حدود للإبداع والفخامة",
  },
  {
    id: "elite",
    name: "ELITE PACKAGE",
    nameAr: "باقة إيليت",
    color: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700",
    borderColor: "border-purple-600",
    textColor: "text-purple-900",
    bgColor: "bg-gradient-to-br from-purple-50 via-white to-indigo-100",
    glowColor: "shadow-purple-600/70",
    featured: true,
    order: 6,
    icon: "🌟",
    image: "/images/package-elite-details.jpg",
    detailImage: "/images/package-elite-details.jpg",
    description: "باقة راقية للعملاء المميزين",
  },
  {
    id: "luxury",
    name: "LUXURY PACKAGE",
    nameAr: "باقة لاكشري",
    color: "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-900",
    bgColor: "bg-gradient-to-br from-yellow-50 via-white to-amber-100",
    glowColor: "shadow-yellow-500/70",
    featured: true,
    order: 7,
    icon: "✨",
    image: "/images/package-luxury-details.jpg",
    detailImage: "/images/package-luxury-details.jpg",
    description: "باقة فاخرة لمحبي الرقي والتميز",
  },
]

export function PackagesList() {
  const [selectedPackage, setSelectedPackage] = useState<(typeof packages)[0] | null>(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleDialogClose = () => {
    setSelectedPackage(null)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setIsImageLoaded(false)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1))
    if (zoom <= 1.25) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <section className="py-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* عنوان القسم بتصميم فاخر */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              ✨ باقات التشطيب المميزة
            </div>
          </div>
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">اختر الباقة المثالية لك</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">مرتبة من الاقتصادية إلى الفاخرة - جودة استثنائية في كل مستوى</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-700 hover:scale-[1.08] border-[3px] ${pkg.borderColor} bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:${pkg.glowColor} transform hover:-translate-y-3`}
              onClick={() => {
                setSelectedPackage(pkg)
                setIsImageLoaded(false)
              }}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              {/* خلفية متحركة */}
              <div className={`absolute inset-0 ${pkg.color} opacity-0 group-hover:opacity-20 transition-all duration-700 blur-xl`}></div>
              
              {/* رقم الترتيب والأيقونة */}
              <div className="absolute top-5 left-5 z-20">
                <div className={`w-16 h-16 rounded-2xl ${pkg.color} flex flex-col items-center justify-center text-white shadow-2xl border-[3px] border-white backdrop-blur-md transform group-hover:rotate-12 transition-transform duration-500`}>
                  <span className="text-3xl mb-1">{pkg.icon}</span>
                  <span className="text-xs font-black">{pkg.order}</span>
                </div>
              </div>
              
              {/* الشارات */}
              {pkg.premium && (
                <Badge className="absolute top-5 right-5 z-20 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white border-[3px] border-white shadow-2xl px-5 py-2.5 text-sm font-black rounded-xl animate-pulse">
                  <Crown className="h-5 w-5 ml-1.5" />
                  الباقة الملكية
                </Badge>
              )}
              {pkg.featured && !pkg.premium && (
                <Badge className="absolute top-5 right-5 z-20 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-white border-[3px] border-white shadow-2xl px-5 py-2.5 text-sm font-black rounded-xl">
                  <Star className="h-5 w-5 ml-1.5 animate-spin" style={{ animationDuration: '3s' }} />
                  الأكثر طلباً
                </Badge>
              )}

              {/* صورة الباقة */}
              <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 pb-4">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.nameAr}
                  className="w-full h-auto object-contain transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110 px-4"
                  style={{ maxHeight: "400px" }}
                />
                
                {/* طبقة Overlay فاخرة */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-sm`}>
                  <div className="text-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Button
                      variant="secondary"
                      className={`bg-white text-gray-900 hover:bg-white shadow-2xl px-10 py-5 text-xl font-black rounded-2xl border-[3px] ${pkg.borderColor} transform hover:scale-110 transition-all duration-300`}
                    >
                      <Eye className="h-7 w-7 ml-3" />
                      عرض التفاصيل الكاملة
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* قسم المعلومات */}
              <div className={`p-6 text-center ${pkg.bgColor} border-t-[3px] ${pkg.borderColor} relative overflow-hidden`}>
                <div className={`absolute inset-0 ${pkg.color} opacity-10`}></div>
                <div className="relative z-10">
                  <h3 className={`font-black text-2xl ${pkg.textColor} mb-2 tracking-tight leading-tight`}>
                    {pkg.nameAr}
                  </h3>
                  <p className={`text-sm ${pkg.textColor} opacity-80 font-bold leading-relaxed`}>
                    {pkg.description}
                  </p>
                </div>
              </div>

              {/* خط مضيء في الأسفل */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${pkg.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}></div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog محسّن */}
      <Dialog open={!!selectedPackage} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border-4 border-gray-700 p-0 rounded-3xl shadow-2xl">
          <DialogHeader className="sticky top-0 z-30 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b-4 border-gray-700 p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {selectedPackage && (
                  <>
                    <div className={`w-16 h-16 rounded-2xl ${selectedPackage.color} flex items-center justify-center text-white shadow-2xl border-4 border-white text-4xl`}>
                      {selectedPackage.icon}
                    </div>
                    <div className="text-right">
                      <DialogTitle className="text-3xl font-black text-white mb-1">
                        {selectedPackage.nameAr}
                      </DialogTitle>
                      <p className="text-gray-400 text-sm font-semibold">{selectedPackage.name}</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-800/80 border-2 border-gray-600 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-xl">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-110"
                    onClick={handleZoomOut}
                    disabled={zoom <= 1}
                  >
                    <ZoomOut className="h-5 w-5" />
                  </Button>
                  <span className="text-base font-black text-white min-w-[70px] text-center px-2">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-110"
                    onClick={handleZoomIn}
                    disabled={zoom >= 3}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                  <div className="w-px h-8 bg-gray-600 mx-1"></div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 hover:scale-110"
                    onClick={handleResetZoom}
                    disabled={zoom === 1}
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogHeader>

          {selectedPackage && (
            <div 
              className="relative h-[calc(95vh-120px)] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-auto flex items-start justify-center p-8"
              style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Loading Spinner */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-20 h-20 rounded-full border-8 border-gray-700 border-t-transparent ${selectedPackage.color} animate-spin`}></div>
                </div>
              )}

              <div
                className="relative w-full mx-auto"
                style={{ 
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* إطار الصورة الفاخر - عرض كامل */}
                <div className={`rounded-3xl overflow-hidden border-[6px] ${selectedPackage.borderColor} shadow-2xl bg-white relative mx-auto`} style={{ width: 'fit-content' }}>
                  <div className={`absolute inset-0 ${selectedPackage.color} opacity-5`}></div>
                  <img
                    src={selectedPackage.detailImage || selectedPackage.image || "/placeholder.svg"}
                    alt={`${selectedPackage.nameAr} - تفاصيل الباقة`}
                    className={`w-auto h-auto object-contain select-none relative z-10 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: 'none',
                    }}
                    draggable={false}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
                
                {/* شريط معلومات الباقة */}
                <div className={`mt-6 p-6 rounded-2xl ${selectedPackage.bgColor} border-4 ${selectedPackage.borderColor} text-center shadow-2xl relative overflow-hidden mx-auto max-w-3xl`}>
                  <div className={`absolute inset-0 ${selectedPackage.color} opacity-10`}></div>
                  <div className="relative z-10">
                    <h3 className={`text-2xl font-black ${selectedPackage.textColor} mb-2`}>{selectedPackage.nameAr}</h3>
                    <p className={`text-base ${selectedPackage.textColor} opacity-80 font-bold`}>{selectedPackage.description}</p>
                  </div>
                </div>
              </div>

              {/* تلميح السحب */}
              {zoom > 1 && (
                <div className="fixed top-32 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-2xl text-white text-base font-bold px-8 py-4 rounded-2xl border-4 border-white/50 shadow-2xl z-20 animate-bounce">
                  🖱️ اسحب الصورة للتنقل
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
