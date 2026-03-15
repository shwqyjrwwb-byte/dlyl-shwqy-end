"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, Search, Key, Copy, Check, Trash2, ArrowLeft, Shield } from "lucide-react"

interface Permission {
  id: string
  label: string
}

interface SpecialUser {
  id: string
  name: string
  userId: string
  password: string
  permissions: string[]
  createdAt: string
}

const AVAILABLE_PERMISSIONS: Permission[] = [
  { id: "admin-dashboard", label: "لوحة تحكم المدير" },
  { id: "technical-office", label: "المكتب الفني" },
  { id: "work-permits", label: "تصاريح العمل" },
  { id: "database", label: "قاعدة البيانات" },
  { id: "bulk-upload", label: "رفع ملفات جماعي" },
  { id: "import-files", label: "استيراد ملفات" },
  { id: "clients", label: "إدارة العملاء" },
  { id: "users", label: "إدارة المستخدمين" },
  { id: "employees", label: "إدارة الموظفين" },
  { id: "reports", label: "التقارير" },
  { id: "settings", label: "الإعدادات" },
  { id: "announcements", label: "قرارات الإدارة" },
  { id: "quality", label: "الجودة" },
]

export default function SpecialUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<SpecialUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [userName, setUserName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  useEffect(() => {
    const loggedIn = localStorage.getItem("dashboardLoggedIn")
    const userRole = localStorage.getItem("dashboardRole")

    if (loggedIn !== "true" || userRole !== "developer") {
      router.push("/admin/dashboard/login?role=developer")
      return
    }

    loadUsers()
  }, [router])

  const loadUsers = () => {
    const savedUsers = localStorage.getItem("specialUsers")
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
  }

  const generatePassword = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const generateUserId = () => {
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
    return `sp_${randomChars}${randomNumbers}`
  }

  const handleCreateUser = () => {
    if (!userName.trim()) {
      alert("الرجاء إدخال اسم المستخدم")
      return
    }
    if (selectedPermissions.length === 0) {
      alert("الرجاء اختيار صلاحية واحدة على الأقل")
      return
    }

    const newUser: SpecialUser = {
      id: Date.now().toString(),
      name: userName.trim(),
      userId: generateUserId(),
      password: generatePassword(),
      permissions: selectedPermissions,
      createdAt: new Date().toISOString(),
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("specialUsers", JSON.stringify(updatedUsers))
    setUserName("")
    setSelectedPermissions([])
    setShowForm(false)
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    )
  }

  const deleteUser = (userId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا اليوزر؟")) {
      const updatedUsers = users.filter(u => u.userId !== userId)
      setUsers(updatedUsers)
      localStorage.setItem("specialUsers", JSON.stringify(updatedUsers))
    }
  }

  const deleteAllUsers = () => {
    if (confirm("هل أنت متأكد من حذف جميع اليوزرات الخاصة؟")) {
      setUsers([])
      localStorage.removeItem("specialUsers")
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
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
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-3 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-purple-500">اليوزرات الخاصة</h1>
              <p className="text-purple-300">إنشاء يوزرات بصلاحيات مخصصة</p>
            </div>
          </div>

          <div className="flex gap-3">
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="gap-3 h-14 px-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-black text-lg"
              >
                <UserPlus className="w-6 h-6" />
                إنشاء يوزر جديد
              </Button>
            )}
            {users.length > 0 && (
              <Button
                onClick={deleteAllUsers}
                className="gap-3 h-14 px-8 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-black text-lg"
              >
                <Trash2 className="w-6 h-6" />
                مسح الكل
              </Button>
            )}
          </div>
        </div>

        {showForm && (
          <Card className="p-8 mb-6 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500">
            <h2 className="text-2xl font-black text-purple-400 mb-6">إنشاء يوزر خاص جديد</h2>
            <div className="mb-6">
              <label className="block text-purple-300 font-bold mb-2">اسم المستخدم</label>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="أدخل اسم المستخدم..."
                className="h-14 text-lg bg-black border-2 border-purple-600/30 focus:border-purple-500 text-purple-100 placeholder:text-purple-700"
              />
            </div>
            <div className="mb-6">
              <label className="block text-purple-300 font-bold mb-3">الصلاحيات</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {AVAILABLE_PERMISSIONS.map((permission) => {
                  const isSelected = selectedPermissions.includes(permission.id)
                  return (
                    <div
                      key={permission.id}
                      onClick={() => togglePermission(permission.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-purple-600 border-purple-400 text-white"
                          : "bg-black border-purple-600/30 text-purple-300 hover:border-purple-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? "bg-white border-white" : "border-purple-500"
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                        </div>
                        <span className="font-bold">{permission.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleCreateUser}
                className="flex-1 h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-black text-lg"
              >
                <UserPlus className="w-5 h-5 ml-2" />
                إنشاء اليوزر
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false)
                  setUserName("")
                  setSelectedPermissions([])
                }}
                variant="outline"
                className="h-14 px-8 bg-gray-900 border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white font-bold"
              >
                إلغاء
              </Button>
            </div>
          </Card>
        )}

        {users.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-400 font-bold mb-1">إجمالي اليوزرات</p>
                    <p className="text-5xl font-black text-purple-500">{users.length}</p>
                  </div>
                  <div className="bg-purple-500/20 p-4 rounded-xl">
                    <Shield className="w-10 h-10 text-purple-500" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-400 font-bold mb-1">نشط</p>
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
                    <Key className="w-10 h-10 text-blue-500" />
                  </div>
                </div>
              </Card>
            </div>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                <Input
                  type="text"
                  placeholder="ابحث عن يوزر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 h-14 text-lg bg-gray-900 border-2 border-purple-600/30 focus:border-purple-500 text-purple-100 placeholder:text-purple-700"
                />
              </div>
            </div>
          </>
        )}

        {filteredUsers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-600/30 hover:border-purple-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-black text-purple-100 text-xl mb-1">{user.name}</h3>
                    <p className="text-sm text-purple-600">
                      تم الإنشاء: {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteUser(user.userId)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="bg-black rounded-lg p-3 border border-purple-600/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-purple-600 font-bold">ID المستخدم</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(user.userId, `id-${user.id}`)}
                        className="h-6 w-6 p-0 text-purple-500 hover:text-purple-400"
                      >
                        {copiedId === `id-${user.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-purple-100 font-mono text-lg font-bold">{user.userId}</p>
                  </div>
                  <div className="bg-black rounded-lg p-3 border border-purple-600/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-purple-600 font-bold">الرقم السري</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(user.password, `pass-${user.id}`)}
                        className="h-6 w-6 p-0 text-purple-500 hover:text-purple-400"
                      >
                        {copiedId === `pass-${user.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-purple-100 font-mono text-2xl font-black tracking-wider">{user.password}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-purple-600 font-bold mb-2">الصلاحيات ({user.permissions.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {user.permissions.map((permId) => {
                      const perm = AVAILABLE_PERMISSIONS.find(p => p.id === permId)
                      return perm ? (
                        <span
                          key={permId}
                          className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-xs text-purple-300 font-bold"
                        >
                          {perm.label}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {users.length === 0 && !showForm && (
          <Card className="p-12 bg-gradient-to-br from-gray-900 to-black border-2 border-purple-600/30 text-center">
            <div className="bg-purple-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-purple-500" />
            </div>
            <h2 className="text-2xl font-black text-purple-500 mb-3">لا توجد يوزرات خاصة</h2>
            <p className="text-purple-300 mb-6">اضغط على "إنشاء يوزر جديد" لإنشاء يوزر بصلاحيات مخصصة</p>
          </Card>
        )}

        {filteredUsers.length === 0 && users.length > 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <p className="text-purple-400 text-lg font-bold">لا توجد نتائج للبحث</p>
          </div>
        )}
      </div>
    </div>
  )
}
