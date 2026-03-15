@echo off
chcp 65001 >nul
color 0B
title نشر المشروع على Vercel

echo.
echo ════════════════════════════════════════════════════════════
echo            نشر مشروع دليل شوقي على الإنترنت
echo ════════════════════════════════════════════════════════════
echo.

echo 📋 الخطوات المطلوبة:
echo.
echo [1] تثبيت Vercel CLI
echo ────────────────────────────────────────
npm install -g vercel
if %errorlevel% neq 0 (
    color 0C
    echo ❌ فشل تثبيت Vercel CLI
    pause
    exit /b 1
)
echo ✅ تم تثبيت Vercel CLI
timeout /t 2 /nobreak >nul

echo.
echo [2] تسجيل الدخول إلى Vercel
echo ────────────────────────────────────────
echo ⚠️ سيفتح المتصفح لتسجيل الدخول...
timeout /t 3 /nobreak >nul
vercel login

echo.
echo [3] نشر المشروع
echo ────────────────────────────────────────
echo ⏳ جاري النشر... (قد يستغرق دقائق)
echo.
vercel --prod

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ════════════════════════════════════════════════════════════
    echo              ✅ تم نشر المشروع بنجاح! ✅
    echo ════════════════════════════════════════════════════════════
    echo.
    echo 🌐 المشروع الآن متاح على الإنترنت!
    echo.
    echo 📝 ملاحظات مهمة:
    echo    ✓ الرابط سيظهر في الأعلى
    echo    ✓ يمكنك إدارة المشروع من: https://vercel.com/dashboard
    echo    ✓ التحديثات المستقبلية: فقط شغل هذا الملف مرة أخرى
    echo.
) else (
    color 0E
    echo.
    echo ════════════════════════════════════════════════════════════
    echo              ⚠️ حدثت مشكلة في النشر
    echo ════════════════════════════════════════════════════════════
    echo.
    echo الحلول الممكنة:
    echo 1. تأكد من اتصالك بالإنترنت
    echo 2. تأكد من تسجيل الدخول بنجاح
    echo 3. جرب مرة أخرى: vercel --prod
    echo.
)

echo.
pause
