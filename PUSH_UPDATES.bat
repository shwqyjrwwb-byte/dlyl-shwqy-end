@echo off
chcp 65001 >nul
color 0A
title رفع التحديثات على GitHub

echo.
echo ════════════════════════════════════════════════════════════
echo            رفع التحديثات على GitHub
echo ════════════════════════════════════════════════════════════
echo.

echo [الخطوة 1/4] إضافة جميع الملفات المعدلة...
git add .
if %errorlevel% neq 0 (
    color 0C
    echo ❌ فشل في إضافة الملفات
    pause
    exit /b 1
)
echo ✅ تم إضافة الملفات
echo.

echo [الخطوة 2/4] عرض الملفات المعدلة...
git status --short
echo.
timeout /t 2 /nobreak >nul

echo [الخطوة 3/4] عمل Commit...
git commit -m "Remove database dependency - use Google Drive links only"
if %errorlevel% equ 0 (
    echo ✅ تم عمل Commit بنجاح
) else (
    echo ⚠️ لا توجد تغييرات جديدة
)
echo.
timeout /t 1 /nobreak >nul

echo [الخطوة 4/4] رفع التحديثات على GitHub...
git push origin main

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ════════════════════════════════════════════════════════════
    echo              ✅ تم رفع التحديثات بنجاح! ✅
    echo ════════════════════════════════════════════════════════════
    echo.
    echo 🌐 التحديثات الآن على:
    echo    https://github.com/shawkyservice-del/shawkyservice
    echo.
    echo 📝 التعديلات:
    echo    ✓ إزالة Prisma والاعتماد على قاعدة البيانات
    echo    ✓ المشروع يستخدم روابط Google Drive فقط
    echo    ✓ جاهز للنشر على Vercel بدون مشاكل
    echo.
    echo 🚀 الخطوة التالية:
    echo    - إذا كان المشروع مربوط بـ Vercel، سيتم النشر تلقائياً
    echo    - أو اذهب إلى: https://vercel.com/new
    echo.
) else (
    color 0E
    echo.
    echo ════════════════════════════════════════════════════════════
    echo              ⚠️ حدثت مشكلة في الرفع
    echo ════════════════════════════════════════════════════════════
    echo.
    echo الحلول الممكنة:
    echo.
    echo 1. تأكد من اتصالك بالإنترنت
    echo.
    echo 2. إذا طلب تسجيل دخول:
    echo    git config --global user.name "Your Name"
    echo    git config --global user.email "your@email.com"
    echo.
    echo 3. جرب مرة أخرى:
    echo    git push origin main
    echo.
)

echo.
pause
