"use client"

import { useState } from "react"
import { PageHeader } from "../../../components/page-header"
import { Card } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { FolderOpen, CheckCircle, AlertCircle, Loader2, FileText } from "lucide-react"
import Link from "next/link"

export default function ImportFilesPage() {
  const [isImporting, setIsImporting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const handleImport = async () => {
    setIsImporting(true)
    setResult(null)
    setError("")

    try {
      const response = await fetch('/api/import-files', {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || "حدث خطأ أثناء الاستيراد")
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم")
      console.error(err)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="استيراد الملفات من المجلدات" 
        description="استيراد جميع ملفات العملاء من مجلد public/pdfs" 
        icon={FolderOpen} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link href="/technical-office">
              <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary">
                العودة للمكتب الفني
              </Button>
            </Link>
          </div>

          <Card className="p-8 bg-card border-border">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <FolderOpen className="w-10 h-10 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  استيراد ملفات العملاء
                </h2>
                <p className="text-muted-foreground">
                  سيتم فحص مجلد public/pdfs واستيراد جميع الملفات وربطها بالعملاء تلقائياً
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-200 text-right">
                    <p className="font-semibold mb-1">كيف يعمل:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>يفحص جميع المجلدات في public/pdfs</li>
                      <li>يستخرج اسم وكود العميل من اسم المجلد</li>
                      <li>ينشئ العملاء الجدد تلقائياً</li>
                      <li>يربط الملفات بالعملاء</li>
                      <li>يتخطى العملاء والملفات الموجودة مسبقاً</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleImport}
                disabled={isImporting}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    جاري الاستيراد...
                  </>
                ) : (
                  <>
                    <FolderOpen className="w-5 h-5 ml-2" />
                    استيراد الملفات الآن
                  </>
                )}
              </Button>

              {result && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <p className="text-green-800 dark:text-green-200 font-bold text-lg">
                      {result.message}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 col-span-3">
                      <p className="text-muted-foreground mb-1">العملاء</p>
                      <div className="flex justify-between">
                        <span className="text-foreground">إجمالي: {result.totalClients}</span>
                        <span className="text-green-600">جديد: {result.importedClients}</span>
                        <span className="text-amber-600">موجود: {result.skippedClients}</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 col-span-3">
                      <p className="text-muted-foreground mb-1">الملفات</p>
                      <div className="flex justify-between">
                        <span className="text-foreground">إجمالي: {result.totalFiles}</span>
                        <span className="text-green-600">جديد: {result.importedFiles}</span>
                        <span className="text-amber-600">موجود: {result.skippedFiles}</span>
                      </div>
                    </div>
                    {result.errors > 0 && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 col-span-3">
                        <p className="text-muted-foreground mb-1">أخطاء</p>
                        <p className="text-2xl font-bold text-red-600">{result.errors}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <Link href="/technical-office">
                      <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                        عرض العملاء والملفات
                      </Button>
                    </Link>
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
            <h3 className="text-lg font-bold text-foreground mb-4">هيكل المجلدات المتوقع</h3>
            <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm text-foreground">
              <pre className="whitespace-pre-wrap">
{`public/pdfs/
├── منطقة القاهرة الجديدةo/
│   ├── حسام صلاح 667/
│   │   ├── ملف1.pdf
│   │   └── ملف2.bdf
│   └── نورهان حسانين 897/
│       └── ملف.pdf
├── منطقة التجمع o/
│   └── هشام عبد الحميد 653/
│       └── ملف.dwg
└── عملاء وسط/
    └── وليد عقيله 827/
        └── ملف.pdf`}
              </pre>
            </div>
          </Card>

          <Card className="mt-6 p-6 bg-card border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">ملاحظات مهمة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• اسم مجلد العميل يجب أن يحتوي على الاسم والكود (مثل: "حسام صلاح 667")</li>
              <li>• إذا لم يكن هناك كود، سيتم استخدام اسم المجلد ككود</li>
              <li>• العملاء الجدد سيتم إنشاؤهم تلقائياً</li>
              <li>• العملاء والملفات الموجودة مسبقاً لن يتم تكرارها</li>
              <li>• يدعم جميع أنواع الملفات: PDF, BDF, DWG, Word, Excel، إلخ</li>
              <li>• الملفات ستكون قابلة للفتح مباشرة في المتصفح</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
