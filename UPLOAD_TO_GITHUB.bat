@echo off
chcp 65001 >nul
color 0A
title رفع المشروع على GitHub

echo.
echo ════════════════════════════════════════════════════════════
echo            رفع مشروع دليل شوقي على GitHub
echo ════════════════════════════════════════════════════════════
echo.

REM التحقق من Git
echo [الخطوة 1/7] التحقق من Git...
where git >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ❌ خطأ: Git غير مثبت أو غير موجود في PATH
    echo.
    echo الرجاء:
    echo 1. إعادة تشغيل Command Prompt
    echo 2. أو إعادة تشغيل الكمبيوتر
    echo 3. أو تثبيت Git من: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)
echo ✅ Git موجود
timeout /t 1 /nobreak >nul

REM إضافة الملفات
echo.
echo [الخطوة 2/7] إضافة جميع الملفات...
git add .
if %errorlevel% neq 0 (
    color 0C
    echo ❌ فشل في إضافة الملفات
    pause
    exit /b 1
)
echo ✅ تم إضافة الملفات
timeout /t 1 /nobreak >nul

REM عمل Commit
echo.
echo [الخطوة 3/7] عمل Commit...
git commit -m "Complete Shawky Guide System: Authentication, Areas, Employees, Ramadan Banner"
if %errorlevel% equ 0 (
    echo ✅ تم عمل Commit بنجاح
) else (
    echo ⚠️ لا توجد تغييرات جديدة أو تم عمل Commit مسبقاً
)
timeout /t 1 /nobreak >nul

REM التحقق من الريموت
echo.
echo [الخطوة 4/7] إعداد الريموت...
git remote -v | find "origin" >nul 2>nul
if %errorlevel% neq 0 (
    echo إضافة الريموت الجديد...
    git remote add origin https://github.com/shawkyservice-del/-.git
) else (
    echo تحديث الريموت الموجود...
    git remote set-url origin https://github.com/shawkyservice-del/-.git
)
echo ✅ تم إعداد الريموت
timeout /t 1 /nobreak >nul

REM التأكد من الفرع
echo.
echo [الخطوة 5/7] التأكد من الفرع الرئيسي...
git branch -M main
echo ✅ الفرع: main
timeout /t 1 /nobreak >nul

REM عرض معلومات
echo.
echo [الخطوة 6/7] معلومات الرفع:
echo ────────────────────────────────────────
git remote -v
echo ────────────────────────────────────────
timeout /t 2 /nobreak >nul

REM رفع المشروع
echo.
echo [الخطوة 7/7] رفع المشروع على GitHub...
echo.
echo ⏳ جاري الرفع... (قد يستغرق بعض الوقت)
echo.
echo ⚠️ إذا طلب منك تسجيل الدخول:
echo    - Username: اسم المستخدم في GitHub
echo    - Password: استخدم Personal Access Token
echo.

git push -u origin main

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ════════════════════════════════════════════════════════════
    echo              ✅ تم رفع المشروع بنجاح! ✅
    echo ════════════════════════════════════════════════════════════
    echo.
    echo 🌐 يمكنك الآن زيارة المشروع على:
    echo    https://github.com/shawkyservice-del/-
    echo.
    echo 📋 الملفات المرفوعة:
    echo    ✓ جميع ملفات الكود
    echo    ✓ نظام تسجيل الدخول للمناطق
    echo    ✓ روابط Google Drive
    echo    ✓ دليل الموظفين
    echo    ✓ الشريط الرمضاني
    echo.
    echo 🔐 بيانات تسجيل الدخول موجودة في:
    echo    AREA_LOGIN_CREDENTIALS.md
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
    echo 1. إذا طلب تسجيل دخول:
    echo    - تأكد من استخدام Personal Access Token
    echo    - احصل عليه من: https://github.com/settings/tokens
    echo.
    echo 2. إذا كان الريبو موجود مسبقاً:
    echo    git pull origin main --allow-unrelated-histories
    echo    git push -u origin main
    echo.
    echo 3. للإجبار على الرفع (احذر: سيحذف التاريخ):
    echo    git push -u origin main --force
    echo.
)

echo.
pause
