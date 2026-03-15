"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Upload, CheckCircle, AlertCircle } from "lucide-react"

export default function DatabaseAdminPage() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSeedDatabase = async () => {
    setIsSeeding(true)
    setMessage("")
    setError("")

    try {
      const response = await fetch('/api/seed', {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || "تم نقل البيانات بنجاح!")
      } else {
        setError(data.error || "حدث خطأ أثناء نقل البيانات")
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم")
      console.error(err)
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="إدارة قاعدة البيانات" 
        description="نقل البيانات من الملفات إلى قاعدة البيانات" 
        icon={Database} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card border-border">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Database className="w-10 h-10 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  نقل البيانات إلى قاعدة البيانات
                </h2>
                <p className="text-muted-foreground">
                  سيتم نقل جميع بيانات العملاء والملفات من الملفات الثابتة إلى قاعدة البيانات
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200 text-right">
                    <p className="font-semibold mb-1">تنبيه مهم:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>سيتم نقل 23 عميل حقيقي</li>
                      <li>سيتم نقل جميع الملفات المرتبطة بهم</li>
                      <li>العملاء الموجودين مسبقاً لن يتم تكرارهم</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSeedDatabase}
                disabled={isSeeding}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Upload className="w-5 h-5 ml-2" />
                {isSeeding ? "جاري النقل..." : "نقل البيانات الآن"}
              </Button>

              {message && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      {message}
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      {error}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="mt-6 p-6 bg-card border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">معلومات قاعدة البيانات</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">نوع قاعدة البيانات:</span>
                <span className="font-medium text-foreground">SQLite</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">عدد العملاء المتوقع:</span>
                <span className="font-medium text-foreground">23 عميل</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">القاهرة الجديدة:</span>
                <span className="font-medium text-foreground">12 عميل</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">وسط (مدينة نصر):</span>
                <span className="font-medium text-foreground">8 عملاء</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">التجمع الخامس:</span>
                <span className="font-medium text-foreground">2 عميل</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">أكتوبر:</span>
                <span className="font-medium text-foreground">1 عميل</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
