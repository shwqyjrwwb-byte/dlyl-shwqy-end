"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Code2, Shield } from "lucide-react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<"admin" | "developer">("admin")

  useEffect(() => {
    if (searchParams.get("role") === "developer") setRole("developer")
  }, [searchParams])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const devPass = typeof window !== "undefined"
      ? (localStorage.getItem("devPassword") || "dev1")
      : "dev1"
    const adminPass = typeof window !== "undefined"
      ? (localStorage.getItem("adminPassword") || "9528")
      : "9528"

    if (role === "admin" && password === adminPass) {
      localStorage.setItem("dashboardLoggedIn", "true")
      localStorage.setItem("dashboardRole", "admin")
      localStorage.setItem("dashboardLoginTime", new Date().toISOString())
      router.push("/admin/dashboard")
    } else if (role === "developer" && password === devPass) {
      localStorage.setItem("dashboardLoggedIn", "true")
      localStorage.setItem("dashboardRole", "developer")
      localStorage.setItem("dashboardLoginTime", new Date().toISOString())
      router.push("/admin/dashboard")
    } else {
      setError("كلمة المرور غير صحيحة")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4" dir="rtl">
      {/* glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 space-y-6">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30">
            <Code2 className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-black text-white">لوحة التحكم</h1>
          <p className="text-gray-500 text-sm">شوقي جروب - Developer Panel</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-[#0d0d14] border border-white/10 rounded-xl p-1 gap-1">
          {[
            { id: "admin", label: "الأدمن", icon: Shield },
            { id: "developer", label: "المطور", icon: Code2 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setRole(id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                role === id
                  ? "bg-amber-500/20 border border-amber-500/40 text-amber-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Card */}
        <Card className="p-6 bg-[#0d0d14] border border-amber-500/20 shadow-2xl shadow-amber-500/10">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label className="text-gray-400 text-sm font-semibold flex items-center gap-2 mb-2">
                <Lock className="w-3.5 h-3.5" />
                كلمة المرور
              </Label>
              <Input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 bg-black/50 border-white/10 text-white text-center text-xl tracking-widest focus:border-amber-500/50"
                autoFocus
                dir="ltr"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                <p className="text-red-400 text-sm font-semibold">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-black font-black text-base transition-all"
            >
              {isLoading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>
        </Card>

        <p className="text-center text-gray-700 text-xs">© 2026 شوقي جروب</p>
      </div>
    </div>
  )
}

export default function DashboardLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-t-amber-500 border-amber-500/20 rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
