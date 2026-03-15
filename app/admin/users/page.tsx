"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Search, Key, Copy, Check, RefreshCw, ArrowLeft, X, Plus, UserPlus } from "lucide-react"
import Image from "next/image"
import { getAllDepartmentEmployees } from "@/lib/employees-data"

interface EmployeeUser {
  id: string
  name: string
  position: string
  department: string
  image?: string
  userId: string
  password: string
  createdAt: string
}

export default function UsersManagementPage() {
  const router = useRouter()
  const [users, setUsers] = useState<EmployeeUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [employeesData, setEmployeesData] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", userId: "", password: "", position: "", department: "" })

  useEffect(() => {
    // التحقق من تسجيل الدخول
    const loggedIn = localStorage.getItem("dashboardLoggedIn")
    const userRole = localStorage.getItem("dashboardRole")

    if (loggedIn !== "true" || userRole !== "developer") {
      router.push("/admin/dashboard/login?role=developer")
      return
    }

    // تحميل الموظفين من الأقسام
    const employees = getAllDepartmentEmployees()
    setEmployeesData(employees)

    // تحميل اليوزرات المحفوظة
    loadUsers()
  }, [router])

  const loadUsers = () => {
    // تحميل كل اليوزرات من الكود + localStorage
    const allUsers: EmployeeUser[] = []
    
    // اليوزرات من القاموس الثابت
    Object.entries(employeeUsernames).forEach(([name, data]) => {
      allUsers.push({
        id: data.userId,
        name: name,
        position: getPositionForUser(name),
        department: getDepartmentForUser(name),
        userId: data.userId,
        password: data.password,
        createdAt: new Date().toISOString(),
      })
    })
    
    // اليوزرات الخاصة
    const specialUsers = [
      { id: "gm", name: "م/ أحمد شوقي", position: "رئيس مجلس الإدارة", department: "الإدارة العليا", userId: "gm", password: "9528", createdAt: new Date().toISOString() },
      { id: "QTY", name: "محمود إسماعيل", position: "مدير الجودة", department: "الجودة", userId: "QTY", password: "mm212", createdAt: new Date().toISOString() },
      { id: "QTY2", name: "شادي مظهر", position: "مهندس جودة", department: "الجودة", userId: "QTY2", password: "mm2123", createdAt: new Date().toISOString() },
    ]
    allUsers.push(...specialUsers)
    
    // اليوزرات من localStorage
    const savedUsers = localStorage.getItem("employeeUsers")
    if (savedUsers) {
      const customUsers = JSON.parse(savedUsers)
      allUsers.push(...customUsers)
    }
    
    setUsers(allUsers)
  }
  
  const getPositionForUser = (name: string) => {
    const employee = employeesData.find(emp => emp.name === name)
    return employee?.position || "موظف"
  }
  
  const getDepartmentForUser = (name: string) => {
    const employee = employeesData.find(emp => emp.name === name)
    return employee?.department || "عام"
  }

  const generatePassword = (name: string) => {
    // استخدام الرقم السري الثابت من القاموس إذا كان موجوداً
    if (employeeUsernames[name]) {
      return employeeUsernames[name].password
    }
    // إذا لم يكن موجوداً، توليد رقم سري عشوائي
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // قاموس اليوزرات الثابتة من ملف EMPLOYEE_USERNAMES.md
  const employeeUsernames: Record<string, { userId: string; password: string }> = {
    "ملك رؤوف": { userId: "malak", password: "482498" },
    "محمد حسن": { userId: "mohamed.hassan", password: "511776" },
    "م/ محمود عبد الغني (أفندينا)": { userId: "mahmoud.afandina", password: "861380" },
    "م/ محمد شوقي": { userId: "mohamed.shawky", password: "593311" },
    "م/ محمد نجيب": { userId: "mohamed.naguib", password: "726955" },
    "م/ أحمد عبد الباسط": { userId: "ahmed.abdelbaset", password: "706597" },
    "م/ محمد يوسف": { userId: "mohamed.youssef", password: "766726" },
    "م/ أحمد عبد الغني": { userId: "ahmed.abdelghani", password: "706598" },
    "محمد عبد المنعم": { userId: "mohamed.abdelmoneam", password: "800543" },
    "هاجر عبد العزيز": { userId: "hagar", password: "800544" },
    "هبه خالد": { userId: "heba.khaled", password: "356988" },
    "عبد الرحمن فايز علي": { userId: "abdelrahman.fayez", password: "448579" },
    "م/ مصطفى شوقي": { userId: "mostafa.shawky", password: "776674" },
    "أحمد عبد الغني (كيتا)": { userId: "ahmed.keta", password: "800526" },
    "اشرف ذكي": { userId: "ashraf.zaki", password: "827701" },
    "انس عاطف محمد": { userId: "anas.atef", password: "340773" },
    "محمود علاء انصاري": { userId: "mahmoud.alaa", password: "010618" },
    "مؤمن مصطفى": { userId: "moamen.mostafa", password: "587005" },
    "احمد حامد": { userId: "ahmed.hamed", password: "426815" },
    "احمد رجب": { userId: "ahmed.ragab", password: "912261" },
    "محمد عبيده": { userId: "mohamed.obaida", password: "690947" },
    "احمد اشرف": { userId: "ahmed.ashraf", password: "500188" },
    "محمد امين": { userId: "mohamed.amin", password: "860050" },
    "اسلام عادل": { userId: "islam.adel", password: "044029" },
    "علي": { userId: "ali.mohamed", password: "997103" },
    "مصطفي كمال": { userId: "mostafa.kamal", password: "589130" },
    "مصطفي عيد": { userId: "mostafa.eid", password: "498820" },
    "محمد جمال": { userId: "mohamed.gamal", password: "864455" },
    "عبدالرحمن محمد": { userId: "abdelrahman.mohamed", password: "159043" },
    "احمد العزبي": { userId: "ahmed.elazaby", password: "273742" },
    "حسين فيض الله": { userId: "hussein.faid", password: "322922" },
    "محمد اشرف": { userId: "mohamed.ashraf", password: "492117" },
    "محمود محسن": { userId: "mahmoud.mohsen", password: "640037" },
    "محمد ماهر": { userId: "mohamed.maher", password: "629354" },
    "محمد مدحت": { userId: "mohamed.medhat", password: "593094" },
    "حسام الغدور": { userId: "hossam.ghandour", password: "244495" },
    "كريم سامي": { userId: "karim.samy", password: "183789" },
    "محسن عبدالرازق": { userId: "mohsen.abdelrazek", password: "091234" },
    "عبدالنبي مرجان": { userId: "abdelnaby.morgan", password: "334460" },
    "عماد شلبي": { userId: "emad.shalaby", password: "455556" },
    "محمد غنام": { userId: "mohamed.ghannam", password: "003089" },
    "احمد بسيوني": { userId: "ahmed.bassyouni", password: "221382" },
    "محمد محمود الجميل": { userId: "mohamed.gameel", password: "264221" },
    "عمرو خالد": { userId: "amr.khaled", password: "107025" },
    "عبدالرحمن العراقي": { userId: "abdelrahman.iraqi", password: "074988" },
    "بيشوي": { userId: "bishoy", password: "948825" },
    "محمد صلاح": { userId: "mohamed.salah", password: "416769" },
    "علي مختار": { userId: "ali.mokhtar", password: "602018" },
    "احمد الشيخ (السادات)": { userId: "ahmed.elsheikh", password: "277915" },
    "بيومي": { userId: "bayoumy", password: "973235" },
    "شنوده": { userId: "shenouda", password: "285129" },
    "احمد عوض": { userId: "ahmed.awad", password: "936377" },
    "محمد عبدالعظيم": { userId: "mohamed.abdelazeem", password: "020263" },
    "محمود ابو زيد": { userId: "mahmoud.abouzeid", password: "479394" },
    "محمود اسماعيل": { userId: "mahmoud.ismail", password: "121549" },
    "شادي مظهر": { userId: "shady.mazhar", password: "704637" },
    "مؤمن يسري": { userId: "moamen.yousry", password: "293383" },
    "المستشار عمرو عبد الله": { userId: "amr.abdullah", password: "088704" },
    "محمود غريب": { userId: "mahmoud.gharib", password: "734095" },
    "وائل رأفت أمين": { userId: "wael.rafat", password: "660739" },
    "راضي شحاته": { userId: "rady.shehata", password: "864533" },
    "مي عصام عبد العزيز": { userId: "mai.essam", password: "925721" },
    "خالد محي الدين عبد القادر": { userId: "khaled.mohyeldin", password: "296258" },
    "خالد عاطف عبد الغني محمد": { userId: "khaled.atef", password: "329792" },
    "هبه توفيق": { userId: "heba.tawfik", password: "183223" },
    "كريم عاطف": { userId: "karim.atef", password: "922582" },
    "حسناء عماد": { userId: "hasnaa.emad", password: "544901" },
    "عبد الله عصام": { userId: "abdullah.essam", password: "672999" },
    "محمد سالم صلاح الدين": { userId: "mohamed.salem", password: "494073" },
    "أشرف صابر": { userId: "ashraf.saber", password: "165846" },
    "إسراء جلال": { userId: "esraa.galal", password: "594811" },
    "هبه أبو المجد": { userId: "heba.aboelmagd", password: "827704" },
    "بسمله زكي عزت السعيد": { userId: "basmala.zaki", password: "101122" },
    "محمود هشام محمود نجاتي": { userId: "mahmoud.hesham", password: "861381" },
    "عبد الرحمن البحري": { userId: "abdelrahman.bahary", password: "705524" },
    "هشام مجدي كمال": { userId: "hesham.magdy", password: "253329" },
    "أحمد حسن مصطفى حسن عبده": { userId: "ahmed.hassan", password: "466551" },
    "هدير محمود محمد": { userId: "hadeer.mahmoud", password: "259055" },
    "عبد المنعم يحيى عبد المنعم": { userId: "abdelmoneam.yahya", password: "788530" },
    "حسن محمود عبد الحميد": { userId: "hassan.mahmoud", password: "621041" },
    "عبد الرحمن هشام": { userId: "abdelrahman.hesham", password: "250312" },
    "عمرو هشام محمد": { userId: "amr.hesham", password: "148438" },
    "إسلام خالد": { userId: "islam.khaled", password: "679887" },
    "يارا يسري شعبان": { userId: "yara.yousry", password: "997506" },
    "سارة أحمد محمد أحمد": { userId: "sara.ahmed", password: "101181" },
    "كيرلس زكريا غطاس عوض": { userId: "kyrillos.zakaria", password: "411913" },
    "آيه نعيم أنور محمود": { userId: "aya.naeem", password: "800548" },
    "فرح تامر محمد": { userId: "farah.tamer", password: "473346" },
    "عبد الله رضا محمد عبد العزيز": { userId: "abdullah.reda", password: "119496" },
    "مريم يوسف": { userId: "maryam.youssef", password: "593289" },
    "بسنت عنتر": { userId: "bassant.antar", password: "864603" },
    "اسماء محمد عبد العليم": { userId: "asmaa.mohamed", password: "800518" },
    "دعاء جمال عبد المنعم": { userId: "doaa.gamal", password: "841543" },
    "يوسف مجدي محمد": { userId: "youssef.magdy", password: "119629" },
    "ايات حامد حسن علي": { userId: "ayat.hamed", password: "504072" },
    "ندى عمرو محمد": { userId: "nada.amr", password: "864759" },
    "حسام خالد محمود": { userId: "hossam.khaled", password: "883633" },
    "أسماء حسين": { userId: "asmaa.hussein", password: "865758" },
    "سعيد سمير عبد العزيز علي": { userId: "saeed.samir", password: "086941" },
    "حبيبه منصور": { userId: "habiba.mansour", password: "367635" },
    "رنا وحيد": { userId: "rana.waheed", password: "630606" },
    "نيفين عيد محمد": { userId: "neveen.eid", password: "545667" },
    "يوسف علاء محمد عبد الهادي": { userId: "youssef.alaa", password: "620606" },
    "ملك خالد خليل": { userId: "malak.khaled", password: "863141" },
    "هدير خالد": { userId: "hadeer.khaled", password: "800534" },
    "ندى حامد سعيد حامد": { userId: "nada.hamed", password: "864748" },
    "محمد عزب عرب محمد السيد": { userId: "mohamed.azab", password: "654499" },
    "فاطمه راضي أحمد صادق": { userId: "fatma.rady", password: "402956" },
    "محمد يحيي عبدالحميد عبد الرازق": { userId: "mohamed.yahya", password: "946616" },
    "امنيه مصطفى": { userId: "omnia.mostafa", password: "800552" },
    "محمد يسري": { userId: "mohamed.yousry", password: "605351" },
    "محمد سعيد محمد": { userId: "mohamed.saeed", password: "865930" },
    "م/ سامح عبد الصبور": { userId: "sameh.abdelsabour", password: "864735" },
    "اسامة حمدي أحمد ابراهيم": { userId: "osama.hamdy", password: "800523" },
    "احمد خالد": { userId: "ahmed.khaled", password: "612784" },
    "حسام اشرف فرج احمد": { userId: "hossam.ashraf", password: "836360" },
    "حنان عباس": { userId: "hanan.abbas", password: "088455" },
    "محمد محمد عبد العليم": { userId: "mohamed.abdelhalim", password: "767222" },
    "محمود علي": { userId: "mahmoud.ali", password: "093894" },
    "م/ أحمد أبو السعود": { userId: "ahmed.abulsoud", password: "444748" },
    "عزام": { userId: "azzam", password: "108751" },
  }

  const generateUserId = (name: string, index: number) => {
    // استخدام اليوزر الثابت من القاموس إذا كان موجوداً
    if (employeeUsernames[name]) {
      return employeeUsernames[name].userId
    }
    
    // إذا لم يكن موجوداً، توليد يوزر عشوائي
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    let randomChars = ''
    for (let i = 0; i < 4; i++) {
      randomChars += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    let randomNumbers = ''
    for (let i = 0; i < 4; i++) {
      randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return `${randomChars}${randomNumbers}`
  }

  const addNewUser = () => {
    if (!newUser.name || !newUser.userId || !newUser.password) {
      alert("يرجى ملء جميع الحقول المطلوبة")
      return
    }
    
    const userToAdd: EmployeeUser = {
      id: Date.now().toString(),
      name: newUser.name,
      position: newUser.position || "موظف",
      department: newUser.department || "عام",
      userId: newUser.userId,
      password: newUser.password,
      createdAt: new Date().toISOString(),
    }
    
    // حفظ في localStorage
    const savedUsers = localStorage.getItem("employeeUsers")
    const customUsers = savedUsers ? JSON.parse(savedUsers) : []
    customUsers.push(userToAdd)
    localStorage.setItem("employeeUsers", JSON.stringify(customUsers))
    
    // تحديث القائمة
    loadUsers()
    
    // إعادة تعيين النموذج
    setNewUser({ name: "", userId: "", password: "", position: "", department: "" })
    setShowAddForm(false)
  }

  const downloadExcel = () => {
    if (users.length === 0) {
      alert("لا توجد يوزرات لتحميلها")
      return
    }

    // إنشاء محتوى CSV
    let csvContent = "\uFEFF" // BOM for UTF-8
    csvContent += "اسم الموظف,المسمى الوظيفي,القسم,اليوزر,الرقم السري\n"
    
    users.forEach(user => {
      csvContent += `${user.name},${user.position},${user.department},${user.userId},${user.password}\n`
    })

    // إنشاء Blob وتحميله
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    
    link.setAttribute("href", url)
    link.setAttribute("download", `يوزرات_الموظفين_${new Date().toLocaleDateString('ar-EG')}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const regeneratePassword = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.userId === userId 
        ? { ...user, password: generatePassword(user.name) }
        : user
    )
    setUsers(updatedUsers)
    localStorage.setItem("employeeUsers", JSON.stringify(updatedUsers))
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/admin/dashboard')}
              variant="outline"
              className="gap-2 h-12 px-6 bg-gray-900 border-2 border-amber-500 text-amber-500 hover:bg-amber-600 hover:text-black font-bold"
            >
              <ArrowLeft className="w-5 h-5" />
              رجوع
            </Button>
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-3 rounded-xl">
              <Users className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-amber-500">إدارة يوزرات الموظفين</h1>
              <p className="text-amber-300">إنشاء وإدارة حسابات الموظفين</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="gap-3 h-14 px-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-black text-lg"
            >
              <Plus className="w-6 h-6" />
              إضافة يوزر جديد
            </Button>
            
            {users.length > 0 && (
              <Button
                onClick={downloadExcel}
                className="gap-3 h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-black text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                تحميل Excel
              </Button>
            )}
          </div>
        </div>

        {/* Add User Form */}
        {showAddForm && (
          <Card className="p-8 mb-6 bg-gradient-to-br from-gray-900 to-black border-2 border-green-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <UserPlus className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-2xl font-black text-green-500">إضافة يوزر جديد</h2>
              </div>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="ghost"
                className="text-amber-500 hover:text-amber-400"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-amber-400 font-bold mb-2 block">الاسم *</Label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="أدخل اسم الموظف"
                  className="h-12 bg-black border-2 border-amber-600/30 focus:border-amber-500 text-amber-100"
                />
              </div>
              
              <div>
                <Label className="text-amber-400 font-bold mb-2 block">اليوزر *</Label>
                <Input
                  value={newUser.userId}
                  onChange={(e) => setNewUser({ ...newUser, userId: e.target.value })}
                  placeholder="أدخل اليوزر"
                  className="h-12 bg-black border-2 border-amber-600/30 focus:border-amber-500 text-amber-100"
                />
              </div>
              
              <div>
                <Label className="text-amber-400 font-bold mb-2 block">كلمة المرور *</Label>
                <Input
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="أدخل كلمة المرور"
                  className="h-12 bg-black border-2 border-amber-600/30 focus:border-amber-500 text-amber-100"
                />
              </div>
              
              <div>
                <Label className="text-amber-400 font-bold mb-2 block">المسمى الوظيفي</Label>
                <Input
                  value={newUser.position}
                  onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                  placeholder="أدخل المسمى الوظيفي"
                  className="h-12 bg-black border-2 border-amber-600/30 focus:border-amber-500 text-amber-100"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label className="text-amber-400 font-bold mb-2 block">القسم</Label>
                <Input
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  placeholder="أدخل القسم"
                  className="h-12 bg-black border-2 border-amber-600/30 focus:border-amber-500 text-amber-100"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                onClick={addNewUser}
                className="gap-2 h-12 px-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-black"
              >
                <Check className="w-5 h-5" />
                حفظ اليوزر
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="h-12 px-8 border-2 border-amber-600/30 text-amber-500 hover:bg-amber-600/10"
              >
                إلغاء
              </Button>
            </div>
          </Card>
        )}

        {users.length > 0 && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-400 font-bold mb-1">إجمالي اليوزرات</p>
                    <p className="text-5xl font-black text-amber-500">{users.length}</p>
                  </div>
                  <div className="bg-amber-500/20 p-4 rounded-xl">
                    <Users className="w-10 h-10 text-amber-500" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 font-bold mb-1">تم الإنشاء</p>
                    <p className="text-5xl font-black text-green-500">{users.length}</p>
                  </div>
                  <div className="bg-green-500/20 p-4 rounded-xl">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 font-bold mb-1">آخر تحديث</p>
                    <p className="text-lg font-black text-blue-500">اليوم</p>
                  </div>
                  <div className="bg-blue-500/20 p-4 rounded-xl">
                    <RefreshCw className="w-10 h-10 text-blue-500" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <Input
                  type="text"
                  placeholder="ابحث عن موظف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 h-14 text-lg bg-gray-900 border-2 border-amber-600/30 focus:border-amber-500 text-amber-100 placeholder:text-amber-700"
                />
              </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-amber-600/30 hover:border-amber-500 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-amber-600 text-black text-2xl font-bold">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-amber-100 text-lg truncate">{user.name}</h3>
                      <p className="text-sm text-amber-600 truncate">{user.position}</p>
                      <p className="text-xs text-amber-700 truncate">{user.department}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* User ID */}
                    <div className="bg-black rounded-lg p-3 border border-amber-600/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-amber-600 font-bold">ID المستخدم</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(user.userId, `id-${user.id}`)}
                          className="h-6 w-6 p-0 text-amber-500 hover:text-amber-400"
                        >
                          {copiedId === `id-${user.id}` ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-amber-100 font-mono text-lg font-bold">{user.userId}</p>
                    </div>

                    {/* Password */}
                    <div className="bg-black rounded-lg p-3 border border-amber-600/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-amber-600 font-bold">الرقم السري</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => regeneratePassword(user.userId)}
                            className="h-6 w-6 p-0 text-amber-500 hover:text-amber-400"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(user.password, `pass-${user.id}`)}
                            className="h-6 w-6 p-0 text-amber-500 hover:text-amber-400"
                          >
                            {copiedId === `pass-${user.id}` ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <p className="text-amber-100 font-mono text-2xl font-black tracking-wider">{user.password}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <p className="text-amber-400 text-lg font-bold">لا توجد نتائج للبحث</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
