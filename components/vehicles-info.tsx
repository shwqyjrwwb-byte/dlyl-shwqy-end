"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Car, Phone, User, Calendar } from "lucide-react"
import Image from "next/image"

const vehicles = [
  {
    id: 1,
    region: "العاصمة الإدارية",
    plateNumber: "ك ر و 8352",
    image: "/images/car-capital.jpeg",
    color: "رمادي",
    phone: "01100412308",
    schedule: [
      { day: "السبت", area: "القاهرة الجديدة" },
      { day: "الأحد", area: "العاصمة" },
      { day: "الاثنين", area: "التجمع الخامس" },
      { day: "الثلاثاء", area: "القاهرة الجديدة" },
      { day: "الأربعاء", area: "العاصمة" },
      { day: "الخميس", area: "التجمع الخامس" }
    ]
  },
  {
    id: 2,
    region: "القاهرة الجديدة",
    plateNumber: "ز ق ذ 7522",
    image: "/images/car-newcairo..jpeg",
    color: "خضراء",
    phone: "01114922438",
    schedule: [
      { day: "السبت", area: "القاهرة الجديدة" },
      { day: "الأحد", area: "العاصمة" },
      { day: "الاثنين", area: "التجمع الخامس" },
      { day: "الثلاثاء", area: "القاهرة الجديدة" },
      { day: "الأربعاء", area: "العاصمة" },
      { day: "الخميس", area: "التجمع الخامس" }
    ]
  },
  {
    id: 3,
    region: "التجمع الخامس",
    plateNumber: "ز ج ع 5130",
    image: "/images/car-tagamoa.jpeg",
    color: "بيضاء 2024",
    phone: "01114922576",
    schedule: [
      { day: "السبت", area: "القاهرة الجديدة" },
      { day: "الأحد", area: "العاصمة" },
      { day: "الاثنين", area: "التجمع الخامس" },
      { day: "الثلاثاء", area: "القاهرة الجديدة" },
      { day: "الأربعاء", area: "العاصمة" },
      { day: "الخميس", area: "التجمع الخامس" }
    ]
  },
  {
    id: 4,
    region: "وسط",
    plateNumber: "أ ك ر و 8259",
    image: "/images/car-downtow.jpeg",
    color: "بيضاء 2024",
    phone: "01114922576",
    schedule: [
      { day: "السبت", area: "السبت" },
      { day: "الأحد", area: "الأحد" },
      { day: "الاثنين", area: "الاثنين" },
      { day: "الثلاثاء", area: "الثلاثاء" },
      { day: "الأربعاء", area: "الأربعاء" },
      { day: "الخميس", area: "الخميس" }
    ]
  },
  {
    id: 5,
    region: "أكتوبر",
    plateNumber: "ز ع أ 2751",
    image: "/images/car-october.jpeg",
    color: "حمراء",
    phone: "01154422084",
    schedule: [
      { day: "السبت", area: "أقاليم" },
      { day: "الأحد", area: "أكتوبر" },
      { day: "الاثنين", area: "وسط" },
      { day: "الثلاثاء", area: "أقاليم" },
      { day: "الأربعاء", area: "أكتوبر" },
      { day: "الخميس", area: "وسط" }
    ]
  },
  {
    id: 6,
    region: "الأقاليم",
    plateNumber: "ز ق ذ 2516",
    image: "/images/car-regions.jpeg",
    color: "بيضاء",
    phone: "01272705524",
    schedule: [
      { day: "السبت", area: "أقاليم" },
      { day: "الأحد", area: "أكتوبر" },
      { day: "الاثنين", area: "وسط" },
      { day: "الثلاثاء", area: "أقاليم" },
      { day: "الأربعاء", area: "أكتوبر" },
      { day: "الخميس", area: "وسط" }
    ]
  }
]

const getDayColor = (area: string) => {
  const colors: Record<string, string> = {
    "القاهرة الجديدة": "bg-yellow-500",
    "العاصمة": "bg-orange-400",
    "التجمع الخامس": "bg-blue-400",
    "السبت": "bg-gray-300",
    "الأحد": "bg-gray-300",
    "الاثنين": "bg-green-400",
    "الثلاثاء": "bg-gray-300",
    "الأربعاء": "bg-blue-400",
    "الخميس": "bg-green-400",
    "أقاليم": "bg-blue-300",
    "أكتوبر": "bg-cyan-400",
    "وسط": "bg-green-400"
  }
  return colors[area] || "bg-gray-400"
}

export function VehiclesInfo() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* صورة حركة السواقين - بالكامل */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-zinc-300 bg-white">
          <img
            src="/images/حركه السواقين.png"
            alt="حركة السواقين"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}

