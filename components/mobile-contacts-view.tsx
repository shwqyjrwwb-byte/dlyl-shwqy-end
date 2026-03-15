"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Search, ChevronLeft, Star, Users, Crown, LogOut } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  name: string
  position: string
  phone?: string
  email?: string
  image?: string
}

interface Department {
  id: string
  name: string
  manager?: TeamMember
  team: TeamMember[]
}

export function MobileContactsView({ departmentsData, executivesData }: { departmentsData: Department[]; executivesData: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [savedCredentials, setSavedCredentials] = useState<{ userId: string; password: string } | null>(null)
  const [showCredentials, setShowCredentials] = useState(false)

  // تحميل بيانات تسجيل الدخول المحفوظة
  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const password = localStorage.getItem("userPassword")
    if (userId && password) {
      setSavedCredentials({ userId, password })
    }
  }, [])

  const filteredDepartments = departmentsData.filter((dept) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      dept.name.toLowerCase().includes(query) ||
      dept.manager?.name.toLowerCase().includes(query) ||
      dept.team.some((m) => m.name.toLowerCase().includes(query))
    )
  })

  const handleLogout = () => {
    localStorage.removeItem("userPassword")
    setShowCredentials(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm border-b border-primary/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">الدليل</h1>
          {savedCredentials && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-xs"
            >
              {showCredentials ? "إخفاء" : "بيانات"}
            </Button>
          )}
        </div>

        {/* Saved Credentials Display */}
        {showCredentials && savedCredentials && (
          <Card className="p-3 mb-4 bg-blue-50 border-blue-200">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">اليوزر:</span>
                <span className="font-semibold text-foreground">{savedCredentials.userId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">الرقم السري:</span>
                <span className="font-semibold text-foreground">••••••••</span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="w-full mt-2 h-8 text-xs"
              >
                <LogOut className="w-3 h-3 ml-2" />
                حذف البيانات
              </Button>
            </div>
          </Card>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="ابحث..."
            className="pr-10 h-10 text-sm bg-white/50 backdrop-blur-sm border-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {!selectedDepartment ? (
          <>
            {/* Executives */}
            {executivesData.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">القيادة التنفيذية</h2>
                </div>
                <div className="space-y-3">
                  {executivesData.map((exec, idx) => (
                    <Card
                      key={idx}
                      className="p-4 cursor-pointer hover:shadow-lg transition-all active:scale-95"
                      onClick={() => setSelectedMember(exec)}
                    >
                      <div className="flex items-center gap-3">
                        {exec.image && (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={exec.image}
                              alt={exec.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{exec.name}</h3>
                          <p className="text-xs text-muted-foreground truncate">{exec.position}</p>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-primary flex-shrink-0" />
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Departments */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">الأقسام</h2>
              </div>
              <div className="space-y-3">
                {filteredDepartments.map((dept) => (
                  <Card
                    key={dept.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition-all active:scale-95"
                    onClick={() => setSelectedDepartment(dept.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{dept.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {dept.team.length + (dept.manager ? 1 : 0)} موظف
                        </p>
                      </div>
                      <ChevronLeft className="w-5 h-5 text-primary" />
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Back Button */}
            <Button
              variant="outline"
              size="sm"
              className="mb-4 w-full"
              onClick={() => setSelectedDepartment(null)}
            >
              <ChevronLeft className="w-4 h-4 rotate-180 ml-2" />
              العودة
            </Button>

            {/* Department Details */}
            {departmentsData.find((d) => d.id === selectedDepartment) && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {departmentsData.find((d) => d.id === selectedDepartment)?.name}
                </h2>

                {/* Manager */}
                {departmentsData.find((d) => d.id === selectedDepartment)?.manager && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <h3 className="font-bold text-foreground">مدير القسم</h3>
                    </div>
                    <MemberCard
                      member={departmentsData.find((d) => d.id === selectedDepartment)!.manager!}
                      onClick={() =>
                        setSelectedMember(departmentsData.find((d) => d.id === selectedDepartment)!.manager!)
                      }
                    />
                  </div>
                )}

                {/* Team Members */}
                {departmentsData.find((d) => d.id === selectedDepartment)?.team.length! > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-foreground">الفريق</h3>
                    </div>
                    <div className="space-y-3">
                      {departmentsData
                        .find((d) => d.id === selectedDepartment)
                        ?.team.map((member, idx) => (
                          <MemberCard
                            key={idx}
                            member={member}
                            onClick={() => setSelectedMember(member)}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end">
          <Card className="w-full rounded-t-3xl p-6 space-y-4 animate-in slide-in-from-bottom">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedMember(null)}
            >
              ✕
            </Button>

            {selectedMember.image && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground">{selectedMember.name}</h3>
              <p className="text-muted-foreground mt-1">{selectedMember.position}</p>
            </div>

            <div className="space-y-3 pt-4 border-t">
              {selectedMember.phone && (
                <a
                  href={`tel:${selectedMember.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">{selectedMember.phone}</span>
                </a>
              )}
              {selectedMember.email && (
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">{selectedMember.email}</span>
                </a>
              )}
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSelectedMember(null)}
            >
              إغلاق
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}

function MemberCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-lg transition-all active:scale-95"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {member.image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{member.name}</h4>
          <p className="text-xs text-muted-foreground truncate">{member.position}</p>
          {member.phone && (
            <p className="text-xs text-primary mt-1 truncate">{member.phone}</p>
          )}
        </div>
        <ChevronLeft className="w-5 h-5 text-primary flex-shrink-0" />
      </div>
    </Card>
  )
}
