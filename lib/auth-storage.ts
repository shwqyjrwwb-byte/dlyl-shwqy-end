const isBrowser = typeof window !== "undefined"

export function saveLoginCredentials(userId: string, password: string) {
  if (!isBrowser) return false
  try {
    localStorage.setItem("savedUserId", userId)
    localStorage.setItem("savedUserPassword", password)
    localStorage.setItem("loginTime", new Date().toISOString())
    return true
  } catch { return false }
}

export function getLoginCredentials() {
  if (!isBrowser) return null
  try {
    const userId = localStorage.getItem("savedUserId")
    const password = localStorage.getItem("savedUserPassword")
    if (userId && password) return { userId, password }
    return null
  } catch { return null }
}

export function clearLoginCredentials() {
  if (!isBrowser) return false
  try {
    localStorage.removeItem("savedUserId")
    localStorage.removeItem("savedUserPassword")
    localStorage.removeItem("loginTime")
    return true
  } catch { return false }
}

export function saveUserSession(data: {
  userId: string
  name: string
  position: string
  department: string
  image?: string
}) {
  if (!isBrowser) return false
  try {
    localStorage.setItem("userLoggedIn", "true")
    localStorage.setItem("userId", data.userId)
    localStorage.setItem("employeeData", JSON.stringify({
      name: data.name,
      position: data.position,
      department: data.department,
      image: data.image || null,
    }))
    localStorage.setItem("loginTime", new Date().toISOString())
    return true
  } catch { return false }
}

export function getUserSession() {
  if (!isBrowser) return null
  try {
    const loggedIn = localStorage.getItem("userLoggedIn")
    if (loggedIn !== "true") return null
    const userId = localStorage.getItem("userId")
    const raw = localStorage.getItem("employeeData")
    const employeeData = raw ? JSON.parse(raw) : null
    return { userId, ...employeeData }
  } catch { return null }
}

export function clearUserSession() {
  if (!isBrowser) return
  try {
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("userId")
    localStorage.removeItem("employeeData")
    localStorage.removeItem("loginTime")
  } catch {}
}
