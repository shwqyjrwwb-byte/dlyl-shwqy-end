"use client"

import { Suspense, useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Briefcase, Search, X, Phone, MessageCircle, Circle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Employee {
  name: string
  position: string
  phone: string
  role: string
  image?: string
}

const employeesData: Employee[] = [
  {
    name: "م/ أحمد شوقي",
    position: "رئيس مجلس الإدارة",
    phone: "01000000001",
    role: "الإشراف العام على جميع عمليات الشركة واتخاذ القرارات الاستراتيجية وتوجيه الإدارة العليا نحو تحقيق الأهداف المؤسسية",
    image: "/ceo-ahmed-shawky.jpg",
  },
  {
    name: "م/ إيمان",
    position: "نائب رئيس مجلس الإدارة",
    phone: "01111027766",
    role: "دعم رئيس مجلس الإدارة في اتخاذ القرارات الاستراتيجية والإشراف على الأقسام التنفيذية وتنفيذ السياسات",
    image: "/vice-ceo-iman.jpg",
  },
  {
    name: "محمد عبد المنعم",
    position: "مدير الموارد البشرية",
    phone: "01009788530",
    role: "إدارة عمليات التوظيف والتدريب وتطوير السياسات الخاصة بالموظفين وضمان بيئة عمل صحية ومنتجة",
  },
  {
    name: "هاجر عبد العزيز",
    position: "HR",
    phone: "01110800543",
    role: "دعم عمليات التوظيف والإدارة اليومية للموظفين ومتابعة الإجراءات الإدارية المتعلقة بالموارد البشرية",
    image: "/images/d9-87-d8-a7-d8-ac-d8-b1-20-d8-b9-d8-a8-d8-af-20-d8-a7-d9-84-d8-b9-d8-b2-d9-8a-d8-b2.jpeg",
  },
  {
    name: "محمد حسني",
    position: "المدير العام",
    phone: "01092942444",
    role: "الإشراف على العمليات اليومية للشركة وضمان تنفيذ السياسات والخطط الاستراتيجية بكفاءة",
  },
  {
    name: "وائل رأفت أمين",
    position: "مدير الحسابات",
    phone: "01288938070",
    role: "إدارة العمليات المالية والمحاسبية وإعداد التقارير المالية وضمان دقة السجلات المالية",
    image: "/images/d9-88-d8-a7-d9-89-d9-84-20-d8-b1-d8-a7-d9-81-d8-aa.jpeg",
  },
  {
    name: "إسلام خالد",
    position: "مدير المكتب الفني",
    phone: "01156679887",
    role: "الإشراف على التصميمات الهندسية والمواصفات الفنية وضمان جودة التنفيذ وفقاً للمعايير المطلوبة",
  },
  {
    name: "م/ مصطفى شوقي",
    position: "مدير السوشيال ميديا",
    phone: "01002776674",
    role: "إدارة حملات التسويق الرقمي والمحتوى على منصات التواصل الاجتماعي وتعزيز الحضور الرقمي للشركة",
    image: "/images/d9-85-20-d9-85-d8-b5-d8-b7-d9-81-d9-8a-20-d8-b4-d9-88-d9-82-d9-8a-20.jpeg",
  },
  {
    name: "محمد سعيد محمد",
    position: "مدير قسم التشغيل",
    phone: "01278865930",
    role: "الإشراف على عمليات التشغيل الميداني وإدارة المقاولين وضمان تنفيذ المشاريع وفقاً للجداول الزمنية",
  },
  {
    name: "محمد شوقي",
    position: "مدير قسم النجارة",
    phone: "01000000000",
    role: "إدارة أعمال النجارة والأثاث الخشبي والإشراف على التصميمات والتنفيذ وضمان الجودة",
  },
  {
    name: "ملك عبد الرؤوف",
    position: "مديرة مكتب م/ أحمد شوقي",
    phone: "01114822498",
    role: "إدارة مكتب رئيس مجلس الإدارة وتنسيق المواعيد والاجتماعات ومتابعة المراسلات الإدارية والتنسيق بين الأقسام المختلفة",
    image: "/images/malak-abdelraouf.jpeg",
  },
  {
    name: "مهندسة إيمان",
    position: "مهندسة مكتب م/ أحمد شوقي",
    phone: "01111027766",
    role: "دعم رئيس مجلس الإدارة في المهام الفنية والهندسية ومتابعة المشاريع الاستراتيجية وإعداد التقارير الفنية والمشاركة في اتخاذ القرارات الهندسية",
    image: "/images/eman.jpeg",
  },
]

function EmployeeModal({
  employee,
  isOpen,
  onClose,
}: { employee: Employee | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !employee) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <Card className="bg-zinc-900 border-gold/20 max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gold">الوصف الوظيفي</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Employee Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gold">
              {employee.image ? (
                <Image src={employee.image || "/placeholder.svg"} alt={employee.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gold text-black text-4xl font-bold">
                  {employee.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Employee Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
              <p className="text-gold text-lg mt-1">{employee.position}</p>
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-zinc-400 mb-2">المسؤوليات والدور الوظيفي</h4>
              <p className="text-white leading-relaxed">{employee.role}</p>
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <div>
                  <p className="text-xs text-zinc-400">رقم الهاتف</p>
                  <p className="text-white font-semibold">{employee.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white gap-2" asChild>
                <a href={`tel:${employee.phone}`}>
                  <Phone className="w-5 h-5" />
                  اتصال
                </a>
              </Button>
              <Button size="lg" className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2" asChild>
                <a href={`https://wa.me/${employee.phone.replace(/^0/, "20")}`} target="_blank" rel="noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  واتساب
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function JobDescriptionsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<any[]>([])

  useEffect(() => {
    // جلب المستخدمين الأونلاين
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch("/api/users/online")
        const data = await response.json()
        if (data.success) {
          setOnlineUsers(data.users)
        }
      } catch (error) {
        console.error("Error fetching online users:", error)
      }
    }

    fetchOnlineUsers()
    const interval = setInterval(fetchOnlineUsers, 30000) // كل 30 ثانية

    return () => clearInterval(interval)
  }, [])

  // فلترة الموظفين لعرض الأونلاين فقط
  const onlineEmployees = employeesData.filter(employee => 
    onlineUsers.some(user => user.userName === employee.name)
  )

  const filteredEmployees = onlineEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEmployee(null)
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Header Info */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black mb-2">الموظفين المتصلين الآن</h2>
              <p className="text-amber-100">يتم عرض الموظفين المسجلين دخول على الدليل فقط</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <div className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-green-400 fill-green-400 animate-pulse" />
                <span className="text-2xl font-black">{onlineEmployees.length}</span>
                <span className="text-sm">متصل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <Input
            type="text"
            placeholder="ابحث عن موظف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-zinc-900 border-zinc-800 text-white"
          />
        </div>

        {/* Employees List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee, index) => (
            <Card
              key={index}
              onClick={() => handleEmployeeClick(employee)}
              className="bg-zinc-900 border-zinc-800 hover:border-gold/30 transition-all p-4 cursor-pointer hover:shadow-lg hover:shadow-gold/20"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold flex-shrink-0">
                  {employee.image ? (
                    <Image
                      src={employee.image || "/placeholder.svg"}
                      alt={employee.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gold text-black text-xl font-bold">
                      {employee.name.charAt(0)}
                    </div>
                  )}
                  {/* Online Indicator */}
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-zinc-900 rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">{employee.name}</h4>
                  <p className="text-sm text-gold truncate">{employee.position}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Circle className="w-2 h-2 text-green-400 fill-green-400 animate-pulse" />
                    <span className="text-xs text-green-400 font-bold">متصل الآن</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Circle className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg font-bold mb-2">لا يوجد موظفين متصلين</p>
            <p className="text-zinc-500 text-sm">سيظهر الموظفون هنا عند تسجيل دخولهم للدليل</p>
          </div>
        )}
      </div>

      <EmployeeModal employee={selectedEmployee} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default function JobDescriptionsPage() {
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <PageHeader title="الوصف الوظيفي" description="أدوار ومسؤوليات الموظفين" icon={Briefcase} />
      <Suspense fallback={null}>
        <JobDescriptionsContent />
      </Suspense>
    </main>
  )
}
