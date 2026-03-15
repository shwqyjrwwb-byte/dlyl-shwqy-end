"use client"

import { Card } from "@/components/ui/card"
import { FileText, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function FinishingItemsSection() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            شرح بنود التشطيب
          </h2>
          <p className="text-xl text-gray-600 font-bold">
            تعرف على تفاصيل جميع بنود التشطيب وشاهد فيديوهاتنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* بطاقة شرح بنود التشطيب */}
          <Card className="group overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-4 border-amber-500">
            <div className="relative h-96">
              <Image
                src="/images/شرح بنود التشطيب.png"
                alt="شرح بنود التشطيب"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-amber-600 p-3 rounded-full">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white">شرح بنود التشطيب</h3>
                </div>
                <p className="text-amber-200 text-lg font-bold mb-4">
                  دليل شامل لجميع بنود التشطيب والمواصفات الفنية
                </p>
                <Link
                  href="/specifications"
                  className="inline-block bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black px-8 py-4 rounded-xl font-black text-lg shadow-xl transition-all duration-300 hover:scale-105"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          </Card>

          {/* بطاقة فيديوهاتنا */}
          <Card className="group overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-4 border-red-500">
            <div className="relative h-96">
              <Image
                src="/images/فيديوهتنا.png"
                alt="فيديوهاتنا"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-600 p-3 rounded-full">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white">فيديوهاتنا</h3>
                </div>
                <p className="text-red-200 text-lg font-bold mb-4">
                  شاهد أعمالنا ومشاريعنا المنفذة بأعلى جودة
                </p>
                <a
                  href="https://www.youtube.com/@ShawkyGroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl transition-all duration-300 hover:scale-105"
                >
                  مشاهدة الفيديوهات
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
