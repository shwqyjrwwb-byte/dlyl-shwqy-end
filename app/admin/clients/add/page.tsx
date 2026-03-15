"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AddClientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    package: "VIP",
    areaId: "2"
  })

  const packages = [
    "Economic",
    "Medium",
    "VIP",
    "Elite",
    "Luxury",
    "U.VIP",
    "S.U.VIP"
  ]

  const areas = [
    { id: 1, name: "العاصمة الإدارية" },
    { id: 2, name: "القاهرة الجديدة" },
    { id: 3, name: "التجمع الخامس" },
    { id: 4, name: "وسط" },
    { id: 5, name: "أكتوبر" },
    { id: 6, name: "الأقاليم" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          code: formData.code,
          package: formData.package,
          areaId: parseInt(formData.areaId)
        })
      })

      if (response.ok) {
        const client = await response.json()
        alert(`تم إضافة العميل ${formData.name} بنجاح!`)
        router.push(`/technical-office/client/${client.id}`)
      } else {
        const data = await response.json()
        setError(data.error || "فشل في إضافة العميل")
      }
    } catch (err) {
      setError("حدث خطأ أثناء إضافة العميل")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="إضافة عميل جديد" 
        description="أضف عميل جديد إلى قاعدة البيانات" 
        icon={UserPlus} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/technical-office">
              <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary">
                <ArrowRight className="w-4 h-4" />
                العودة للمكتب الفني
              </Button>
            </Link>
          </div>

          <Card className="p-8 bg-card border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* اسم العميل */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  اسم العميل <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: أحمد محمد"
                  required
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              {/* كود العميل */}
              <div className="space-y-2">
                <Label htmlFor="code" className="text-foreground">
                  كود العميل <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="مثال: CLT-2024 أو 901"
                  required
                  className="bg-secondary border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  يجب أن يكون الكود فريداً لكل عميل
                </p>
              </div>

              {/* الباقة */}
              <div className="space-y-2">
                <Label htmlFor="package" className="text-foreground">
                  الباقة <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.package}
                  onValueChange={(value) => setFormData({ ...formData, package: value })}
                >
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg} value={pkg}>
                        {pkg}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* المنطقة */}
              <div className="space-y-2">
                <Label htmlFor="area" className="text-foreground">
                  المنطقة <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.areaId}
                  onValueChange={(value) => setFormData({ ...formData, areaId: value })}
                >
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.id} value={area.id.toString()}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* رسالة خطأ */}
              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* أزرار */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <UserPlus className="w-4 h-4 ml-2" />
                  {isSubmitting ? "جاري الإضافة..." : "إضافة العميل"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-border text-foreground hover:bg-secondary"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </Card>

          {/* معلومات إضافية */}
          <Card className="mt-6 p-6 bg-card border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">ملاحظات</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• بعد إضافة العميل، يمكنك رفع ملفاته مباشرة</li>
              <li>• تأكد من أن كود العميل فريد</li>
              <li>• يمكنك تعديل بيانات العميل لاحقاً</li>
              <li>• سيظهر العميل في المنطقة المحددة فوراً</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
