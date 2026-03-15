"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Upload, User, MapPin, FileText, AlertCircle, CheckCircle, X, Plus } from "lucide-react"

interface WorkerData {
  name: string
  nationalIdImage: File | null
}

export function WorkPermitForm() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    siteName: "",
    siteCode: "",
    region: "",
    contractorName: "",
    contractorNationalId: null as File | null,
    engineerName: "",
    engineerPhone: "",
    workPhase: "",
    notes: "",
  })

  const [workers, setWorkers] = useState<WorkerData[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleAddWorker = () => {
    if (workers.length < 9) {
      setWorkers([...workers, { name: "", nationalIdImage: null }])
    }
  }

  const handleRemoveWorker = (index: number) => {
    setWorkers(workers.filter((_, i) => i !== index))
  }

  const handleWorkerChange = (index: number, field: keyof WorkerData, value: string | File) => {
    const newWorkers = [...workers]
    newWorkers[index] = { ...newWorkers[index], [field]: value }
    setWorkers(newWorkers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // إنشاء FormData لرفع الملفات
    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        submitData.append(key, value)
      } else if (value) {
        submitData.append(key, value.toString())
      }
    })

    // إضافة بيانات العمال
    workers.forEach((worker, index) => {
      submitData.append(`worker_${index}_name`, worker.name)
      if (worker.nationalIdImage) {
        submitData.append(`worker_${index}_id`, worker.nationalIdImage)
      }
    })

    try {
      const response = await fetch("/api/work-permit", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        setSubmitSuccess(true)
        // لا يتم التوجيه - فقط رسالة نجاح
      } else {
        alert("حدث خطأ أثناء إرسال الطلب")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("حدث خطأ أثناء إرسال الطلب")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <Card className="p-12 text-center bg-gradient-to-br from-green-50 via-white to-green-50 border-4 border-green-400 shadow-2xl">
        <div className="bg-green-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
          <CheckCircle className="w-20 h-20 text-white" />
        </div>
        <h2 className="text-5xl font-black text-green-900 mb-4 tracking-tight">تم إرسال الطلب بنجاح!</h2>
        <p className="text-2xl text-green-700 font-bold mb-6">تم إرسال طلب التصريح إلى الإدارة</p>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8 mt-8 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8" />
            <p className="text-2xl font-black">الخطوات القادمة</p>
          </div>
          <div className="space-y-3 text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-lg font-bold">✓ سيتم مراجعة طلبك من قبل الإدارة</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-lg font-bold">✓ سيتم التواصل معك في حالة الموافقة أو الرفض</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-lg font-bold">✓ يمكنك متابعة حالة التصريح من خلال الإدارة</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <Button
            onClick={() => window.location.href = "/"}
            className="flex-1 h-16 text-xl font-black bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
          >
            العودة للصفحة الرئيسية
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="flex-1 h-16 text-xl font-black border-2 border-green-600 text-green-700 hover:bg-green-50"
          >
            تقديم طلب جديد
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-10 shadow-2xl border-4 border-blue-200 bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white p-8 rounded-2xl mb-10 -mx-10 -mt-10 shadow-xl">
          <h2 className="text-3xl font-black text-center mb-3">تصريح دخول ومباشرة أعمال تشطيبات</h2>
          <p className="text-center text-blue-100 text-lg font-semibold">بناءً على العقد المبرم بيننا، يتم بموجب هذا منحكم التصريح لمباشرة الأعمال الموضحة أدناه</p>
        </div>

        {/* القسم 1: بيانات الموقع والعمل */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl mb-6 shadow-lg">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <FileText className="w-7 h-7" />
              القسم الأول: بيانات الموقع والعمل
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <Label htmlFor="startDate" className="text-lg font-black flex items-center gap-2 mb-3 text-gray-800">
                <Calendar className="w-5 h-5 text-blue-600" />
                تاريخ بداية الأعمال
              </Label>
              <Input
                id="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="h-14 text-lg font-black text-black border-2 border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <Label htmlFor="endDate" className="text-lg font-black flex items-center gap-2 mb-3 text-gray-800">
                <Calendar className="w-5 h-5 text-blue-600" />
                تاريخ انتهاء الأعمال
              </Label>
              <Input
                id="endDate"
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="h-14 text-lg font-black text-black border-2 border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <Label htmlFor="siteName" className="text-lg font-black flex items-center gap-2 mb-3 text-gray-800">
                <MapPin className="w-5 h-5 text-blue-600" />
                اسم الموقع
              </Label>
              <Input
                id="siteName"
                type="text"
                required
                placeholder="مثال: كمبوند النرجس - الشيخ زايد"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="h-14 text-lg font-black text-black placeholder:text-gray-400 border-2 border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <Label htmlFor="siteCode" className="text-lg font-black mb-3 text-gray-800 block">
                كود الموقع
              </Label>
              <Input
                id="siteCode"
                type="text"
                required
                placeholder="مثال: SZ-2024-001"
                value={formData.siteCode}
                onChange={(e) => setFormData({ ...formData, siteCode: e.target.value })}
                className="h-14 text-lg font-black text-black placeholder:text-gray-400 border-2 border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <Label htmlFor="region" className="text-lg font-black mb-3 text-gray-800 block">
                المنطقة
              </Label>
              <Input
                id="region"
                type="text"
                required
                placeholder="مثال: الشيخ زايد"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="h-14 text-lg font-black text-black placeholder:text-gray-400 border-2 border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <Label htmlFor="workPhase" className="text-lg font-black mb-3 text-gray-800 block">
                مرحلة العمل
              </Label>
              <Input
                id="workPhase"
                type="text"
                required
                placeholder="مثال: المرحلة الأولى - التأسيس"
                value={formData.workPhase}
                onChange={(e) => setFormData({ ...formData, workPhase: e.target.value })}
                className="h-14 text-lg font-black text-black placeholder:text-gray-400 border-2 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* القسم 2: بيانات المقاول */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl mb-6 shadow-lg">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <User className="w-7 h-7" />
              القسم الثاني: بيانات المقاول الرئيسي
            </h3>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="contractorName" className="text-lg font-black mb-3 text-gray-800 block">
                  اسم المقاول الرئيسي
                </Label>
                <Input
                  id="contractorName"
                  type="text"
                  required
                  placeholder="الاسم الكامل للمقاول"
                  value={formData.contractorName}
                  onChange={(e) => setFormData({ ...formData, contractorName: e.target.value })}
                  className="h-14 text-lg font-black text-black placeholder:text-gray-400 border-2 border-gray-300 focus:border-green-500 bg-white"
                />
              </div>

              <div>
                <Label htmlFor="contractorId" className="text-lg font-black flex items-center gap-2 mb-3 text-gray-800">
                  <Upload className="w-5 h-5 text-green-600" />
                  صورة الرقم القومي للمقاول
                </Label>
                <Input
                  id="contractorId"
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, contractorNationalId: e.target.files?.[0] || null })}
                  className="h-14 text-base font-bold border-2 border-gray-300 focus:border-green-500 bg-white"
                />
              </div>
            </div>

            {/* العمال المرافقين */}
            <div className="mt-8 pt-8 border-t-2 border-green-300">
              <div className="flex items-center justify-between mb-6">
                <Label className="text-xl font-black text-gray-800">العمال المرافقين (اختياري - حتى 9 عمال)</Label>
                <Button
                  type="button"
                  onClick={handleAddWorker}
                  disabled={workers.length >= 9}
                  className="gap-2 bg-green-600 hover:bg-green-700 text-white font-bold h-12 px-6"
                >
                  <Plus className="w-5 h-5" />
                  إضافة عامل
                </Button>
              </div>

              {workers.length === 0 && (
                <div className="text-center py-8 bg-white rounded-xl border-2 border-dashed border-green-300">
                  <User className="w-16 h-16 text-green-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-lg font-bold">لم يتم إضافة عمال بعد</p>
                  <p className="text-gray-400 text-sm">اضغط على "إضافة عامل" لإضافة عمال مرافقين</p>
                </div>
              )}

              {workers.map((worker, index) => (
                <div key={index} className="bg-white p-5 rounded-xl border-2 border-green-200 mb-4 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-black text-gray-800">العامل رقم {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => handleRemoveWorker(index)}
                      variant="destructive"
                      size="sm"
                      className="gap-2 font-bold"
                    >
                      <X className="w-4 h-4" />
                      حذف
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-bold mb-2 block text-gray-700">اسم العامل</Label>
                      <Input
                        type="text"
                        required
                        placeholder="الاسم الكامل"
                        value={worker.name}
                        onChange={(e) => handleWorkerChange(index, "name", e.target.value)}
                        className="h-12 text-base font-black text-black placeholder:text-gray-400 border-2 border-gray-300"
                      />
                    </div>
                    <div>
                      <Label className="text-base font-bold mb-2 block text-gray-700">صورة الرقم القومي</Label>
                      <Input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => handleWorkerChange(index, "nationalIdImage", e.target.files?.[0] as File)}
                        className="h-12 text-sm font-bold border-2 border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* القسم 3: الشروط والالتزامات */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl mb-6 shadow-lg">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <AlertCircle className="w-7 h-7" />
              القسم الثالث: الشروط والالتزامات
            </h3>
          </div>
          
          <div className="bg-red-50 border-4 border-red-300 rounded-2xl p-8 shadow-lg">
            <ul className="space-y-5">
              <li className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md">
                <span className="text-red-600 font-black text-3xl flex-shrink-0">1</span>
                <span className="text-lg font-bold text-gray-800">مراعاة اشتراطات الكمبوند والالتزام بجميع القواعد المعمول بها</span>
              </li>
              <li className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md">
                <span className="text-red-600 font-black text-3xl flex-shrink-0">2</span>
                <span className="text-lg font-bold text-gray-800">الالتزام التام بمعايير السلامة والصحة المهنية في جميع الأوقات</span>
              </li>
              <li className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md">
                <span className="text-red-600 font-black text-3xl flex-shrink-0">3</span>
                <span className="text-lg font-bold text-gray-800">المقاول مسؤول عن ترحيل المخلفات الناتجة عن أعماله إلى الأماكن المخصصة يومياً</span>
              </li>
            </ul>
          </div>
        </div>

        {/* القسم 4: مسؤول الموقع */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-xl mb-6 shadow-lg">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <User className="w-7 h-7" />
              القسم الرابع: مسؤول الموقع من طرفنا
            </h3>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="engineerName" className="text-lg font-black mb-3 text-gray-800 block">
                  اسم المهندس المسؤول
                </Label>
                <Input
                  id="engineerName"
                  type="text"
                  required
                  placeholder="الاسم الكامل للمهندس"
                  value={formData.engineerName}
                  onChange={(e) => setFormData({ ...formData, engineerName: e.target.value })}
                  className="h-14 text-lg font-black text-black placeholder:text-gray-400 border-2 border-gray-300 focus:border-purple-500 bg-white"
                />
              </div>

              <div>
                <Label htmlFor="engineerPhone" className="text-lg font-black mb-3 text-gray-800 block">
                  رقم التواصل
                </Label>
                <Input
                  id="engineerPhone"
                  type="tel"
                  required
                  placeholder="01xxxxxxxxx"
                  value={formData.engineerPhone}
                  onChange={(e) => setFormData({ ...formData, engineerPhone: e.target.value })}
                  className="h-14 text-lg font-black text-black placeholder:text-gray-400 border-2 border-gray-300 focus:border-purple-500 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ملاحظات إضافية */}
        <div className="mb-10">
          <Label htmlFor="notes" className="text-xl font-black mb-4 text-gray-800 block">
            ملاحظات إضافية (اختياري)
          </Label>
          <Textarea
            id="notes"
            placeholder="أي ملاحظات أو تفاصيل إضافية تود إضافتها..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="min-h-[120px] text-lg font-black text-black placeholder:text-gray-400 border-2 border-gray-300 focus:border-blue-500"
          />
        </div>

        {/* زر الإرسال */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-16 text-2xl font-black bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-2xl transform hover:scale-105 transition-all"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال طلب التصريح"}
        </Button>

        <p className="text-center text-base text-gray-600 mt-6 font-bold">
          بعد الإرسال، سيتم مراجعة طلبك من قبل الإدارة وإخطارك بالقرار
        </p>
      </Card>
    </form>
  )
}
