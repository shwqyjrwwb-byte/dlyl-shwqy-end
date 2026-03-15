"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { Settings, Users, Building2, FileText, FileCheck, LogOut, ArrowRight } from "lucide-react"
import { ContactsAdmin } from "@/components/admin/contacts-admin"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminAuthCheck } from "@/components/admin-auth-check"
import { useRouter } from "next/navigation"

function AdminContent() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminLoginTime")
    router.push("/admin/login")
  }

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="لوحة التحكم" description="إدارة المحتوى والموظفين" icon={Settings} />

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Buttons */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="w-5 h-5" />
                رجوع للصفحة الرئيسية
              </Button>
            </Link>

            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
            </Button>
          </div>

          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="bg-zinc-900 border border-zinc-800 mb-6">
              <TabsTrigger value="contacts" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                <Users className="w-4 h-4 ml-2" />
                الموظفين
              </TabsTrigger>
              <TabsTrigger value="departments" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                <Building2 className="w-4 h-4 ml-2" />
                الأقسام
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                <FileText className="w-4 h-4 ml-2" />
                المحتوى
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contacts">
              <ContactsAdmin />
            </TabsContent>

            <TabsContent value="departments">
              <div className="text-center py-12 text-zinc-500">قريباً - إدارة الأقسام</div>
            </TabsContent>

            <TabsContent value="content">
              <div className="text-center py-12 text-zinc-500">قريباً - إدارة المحتوى</div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}

export default function AdminPage() {
  return (
    <AdminAuthCheck>
      <AdminContent />
    </AdminAuthCheck>
  )
}
