@echo off
chcp 65001 >nul
color 0B
title نشر المشروع الآن

echo.
echo ════════════════════════════════════════════════════════════
echo              نشر مشروع دليل شوقي على Vercel
echo ════════════════════════════════════════════════════════════
echo.

echo [الخطوة 1/3] تسجيل الدخول إلى Vercel...
echo ⚠️ سيفتح المتصفح لتسجيل الدخول
echo.
timeout /t 3 /nobreak >nul

vercel login

if %errorlevel% neq 0 (
    color 0C
    echo ❌ فشل تسجيل الدخول
    pause
    exit /b 1
)

echo.
echo ✅ تم تسجيل الدخول بنجاح
echo.

echo [الخطوة 2/3] إعداد المشروع...
echo.
vercel link --yes

echo.
echo [الخطوة 3/3] النشر على الإنترنت...
echo ⏳ جاري النشر... (قد يستغرق دقائق)
echo.

vercel --prod

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ════════════════════════════════════════════════════════════
    echo              ✅ تم النشر بنجاح! ✅
    echo ════════════════════════════════════════════════════════════
    echo.
    echo 🌐 المشروع الآن متاح على الإنترنت!
    echo.
    echo 📋 الرابط موجود في الأعلى ☝️
    echo.
    echo 💡 يمكنك أيضاً:
    echo    - إدارة المشروع: https://vercel.com/dashboard
    echo    - مشاهدة الـ Logs والإحصائيات
    echo    - ربط Domain مخصص
    echo.
) else (
    color 0E
    echo.
    echo ════════════════════════════════════════════════════════════
    echo              ⚠️ حدثت مشكلة في النشر
    echo ════════════════════════════════════════════════════════════
    echo.
    echo جرب:
    echo 1. تأكد من تسجيل الدخول: vercel login
    echo 2. جرب مرة أخرى: vercel --prod
    echo.
)

echo.
pause
