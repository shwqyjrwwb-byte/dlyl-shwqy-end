/**
 * حفظ بيانات تسجيل الدخول بشكل آمن
 */
export function saveLoginCredentials(userId: string, password: string) {
  try {
    // حفظ اليوزر والرقم السري
    localStorage.setItem("userId", userId)
    localStorage.setItem("userPassword", password)
    
    // حفظ وقت تسجيل الدخول
    localStorage.setItem("loginTime", new Date().toISOString())
    
    return true
  } catch (error) {
    console.error("Error saving credentials:", error)
    return false
  }
}

/**
 * استرجاع بيانات تسجيل الدخول المحفوظة
 */
export function getLoginCredentials() {
  try {
    const userId = localStorage.getItem("userId")
    const password = localStorage.getItem("userPassword")
    
    if (userId && password) {
      return { userId, password }
    }
    return null
  } catch (error) {
    console.error("Error retrieving credentials:", error)
    return null
  }
}

/**
 * حذف بيانات تسجيل الدخول
 */
export function clearLoginCredentials() {
  try {
    localStorage.removeItem("userId")
    localStorage.removeItem("userPassword")
    localStorage.removeItem("loginTime")
    return true
  } catch (error) {
    console.error("Error clearing credentials:", error)
    return false
  }
}

/**
 * التحقق من وجود بيانات تسجيل دخول محفوظة
 */
export function hasLoginCredentials() {
  try {
    return localStorage.getItem("userId") !== null && localStorage.getItem("userPassword") !== null
  } catch (error) {
    console.error("Error checking credentials:", error)
    return false
  }
}
