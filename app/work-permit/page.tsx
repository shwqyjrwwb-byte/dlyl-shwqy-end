"use client"

import { WorkPermitForm } from "@/components/work-permit-form"
import Link from "next/link"
import { ArrowRight, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WorkPermitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with buttons */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <Link href="/">
            <Button variant="outline" className="gap-2 bg-white hover:bg-gray-100 shadow-lg">
              <ArrowRight className="w-5 h-5" />
              رجوع للخلف
            </Button>
          </Link>

          <Link href="/admin/work-permits/login">
            <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
              <Settings className="w-5 h-5" />
              لوحة التحكم
            </Button>
          </Link>
        </div>

        {/* Title with image */}
        <div className="text-center mb-8">
          <div className="w-full mb-6 rounded-2xl overflow-hidden shadow-2xl bg-white">
            <img
              src="/images/تصريح اعمال.png"
              alt="تصريح أعمال"
              className="w-full h-auto object-contain"
            />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">تصريح دخول ومباشرة أعمال تشطيبات</h1>
          <p className="text-lg text-gray-600">يرجى ملء جميع البيانات المطلوبة بدقة</p>
        </div>
        
        <WorkPermitForm />
      </div>
    </div>
  )
}
