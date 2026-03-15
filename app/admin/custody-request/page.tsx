"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Wallet, Calendar, User, Briefcase, MapPin, 
  DollarSign, FileText, Printer, Download, ArrowRight, Send 
} from "lucide-react"
import Link from "next/link"

export default function CustodyRequestPage() {
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString('ar-EG'),
    employeeName: "",
    amount: "",
    jobTitle: "",
    workDescription: "",
    clientName: "",
    location: "",
    balance: "",
    accountantSignature: "",
    recipientSignature: "",
    managerSignature: ""
  })

  const handleSendToWhatsApp = () => {
    // التحقق من أن الحقول المهمة مملوءة
    if (!formData.employeeName || !formData.amount) {
      alert("يرجى ملء اسم الموظف والمبلغ على الأقل")
      return
    }

    // إنشاء رسالة WhatsApp
    const message = `
*طلب صرف عهدة*
━━━━━━━━━━━━━━━━━━━━

📅 *التاريخ:* ${formData.date}

👤 *اسم الموظف:* ${formData.employeeName}
💼 *الوظيفة:* ${formData.jobTitle || 'غير محدد'}
💰 *المبلغ المطلوب:* ${formData.amount}

📝 *مقابل أعمال:*
${formData.workDescription || 'غير محدد'}

👥 *اسم العميل:* ${formData.clientName || 'غير محدد'}
📍 *الموقع:* ${formData.location || 'غير محدد'}
💳 *رصيد العهد:* ${formData.balance || 'غير محدد'}

━━━━━━━━━━━━━━━━━━━━
تم الإرسال من نظام شوقي جروب
    `.trim()

    // إنشاء رابط WhatsApp
    const whatsappUrl = `https://wa.me/1278864533?text=${encodeURIComponent(message)}`
    
    // فتح WhatsApp
    window.open(whatsappUrl, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/home">
            <Button variant="outline" className="gap-2 bg-white hover:bg-gray-100 shadow-lg border-2 h-12 px-6 mb-6">
              <ArrowRight className="w-5 h-5" />
              رجوع للصفحة الرئيسية
            </Button>
          </Link>
          
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Wallet className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-black mb-1">طلب صرف عهدة</h1>
                <p className="text-lg text-emerald-100">نموذج طلب صرف عهدة احترافي</p>
              </div>
            </div>
          </div>
        </div>

        {/* صورة نموذج صرف العهدة - خارج البطاقة */}
        <div className="mb-8 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-200 bg-white">
          <img
            src="/images/صرف العهد.png"
            alt="نموذج صرف العهدة"
            className="w-full h-auto object-contain"
          />
        </div>

        <Card className="p-8 bg-white shadow-2xl border-4 border-emerald-200">
          <div className="text-center mb-8 pb-6 border-b-4 border-emerald-200">
            <div className="bg-emerald-600 text-white inline-block px-8 py-3 rounded-xl mb-4">
              <h2 className="text-3xl font-black">طلب صرف عهدة</h2>
            </div>
            <div className="flex items-center justify-center gap-3 text-lg">
              <Calendar className="w-6 h-6 text-emerald-600" />
              <span className="font-bold text-gray-700">التاريخ:</span>
              <span className="font-black text-gray-900">{formData.date}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-50 p-6 rounded-xl border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-black text-gray-900">إلى السيد مسؤول الخزينة</h3>
              </div>
              <p className="text-lg text-gray-700 font-bold">نرجو من سيادتكم صرف المبلغ التالي:</p>
            </div>

            <div>
              <Label htmlFor="employeeName" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                <User className="w-5 h-5 text-emerald-600" />
                اسم الموظف مسلم العهدة
              </Label>
              <Input
                id="employeeName"
                type="text"
                value={formData.employeeName}
                onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                placeholder="أدخل اسم الموظف"
                className="h-14 text-xl border-2 border-gray-300 focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <Label htmlFor="jobTitle" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                الوظيفة
              </Label>
              <Input
                id="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                placeholder="أدخل الوظيفة"
                className="h-14 text-xl border-2 border-gray-300 focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                المبلغ المطلوب صرفه
              </Label>
              <Input
                id="amount"
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="أدخل المبلغ (مثال: 5000 جنيه)"
                className="h-14 text-xl border-2 border-gray-300 focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <Label htmlFor="workDescription" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                <FileText className="w-5 h-5 text-emerald-600" />
                مقابل أعمال
              </Label>
              <Textarea
                id="workDescription"
                value={formData.workDescription}
                onChange={(e) => setFormData({...formData, workDescription: e.target.value})}
                placeholder="وصف الأعمال المطلوب صرف العهدة لها"
                className="min-h-24 text-lg border-2 border-gray-300 focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <Label htmlFor="clientName" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                <User className="w-5 h-5 text-emerald-600" />
                اسم العميل
              </Label>
              <Input
                id="clientName"
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                placeholder="أدخل اسم العميل"
                className="h-14 text-xl border-2 border-gray-300 focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                <MapPin className="w-5 h-5 text-emerald-600" />
                الموقع
              </Label>
              <Input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="أدخل موقع العمل"
                className="h-14 text-xl border-2 border-gray-300 focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <Label htmlFor="balance" className="text-lg font-bold flex items-center gap-2 mb-3 text-gray-800">
                <Wallet className="w-5 h-5 text-emerald-600" />
                رصيد العهد
              </Label>
              <Input
                id="balance"
                type="text"
                value={formData.balance}
                onChange={(e) => setFormData({...formData, balance: e.target.value})}
                placeholder="أدخل رصيد العهد الحالي"
                className="h-14 text-xl border-2 border-gray-300 focus:border-emerald-500 font-semibold"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t-4 border-emerald-200">
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <Label className="text-base font-bold text-gray-800 mb-3 block text-center">
                  توقيع محاسب العهد
                </Label>
                <div className="h-24 border-2 border-dashed border-blue-400 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-gray-400 text-sm">مساحة التوقيع</span>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                <Label className="text-base font-bold text-gray-800 mb-3 block text-center">
                  توقيع المستلم
                </Label>
                <div className="h-24 border-2 border-dashed border-green-400 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-gray-400 text-sm">مساحة التوقيع</span>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <Label className="text-base font-bold text-gray-800 mb-3 block text-center">
                  توقيع المدير المسؤول
                </Label>
                <div className="h-24 border-2 border-dashed border-purple-400 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-gray-400 text-sm">مساحة التوقيع</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-8 border-t-4 border-emerald-200">
            <Button
              onClick={handleSendToWhatsApp}
              className="flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-lg font-black shadow-xl"
            >
              <Send className="w-6 h-6" />
              إرسال الطلب
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1 h-14 gap-2 text-lg font-black border-2 shadow-xl"
            >
              <Printer className="w-6 h-6" />
              طباعة الطلب
            </Button>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            🔒 جميع البيانات محفوظة ومشفرة - شوقي جروب © 2026
          </p>
        </div>
      </div>
    </div>
  )
}
