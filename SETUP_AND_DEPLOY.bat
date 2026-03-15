@echo off
chcp 65001 >nul
color 0B
title إعداد ونشر المشروع

echo.
echo ════════════════════════════════════════════════════════════
echo            إعداد ونشر مشروع دليل شوقي
echo ════════════════════════════════════════════════════════════
echo.

echo 📋 الخطوات المطلوبة:
echo.
echo 1. إنشاء قاعدة بيانات PostgreSQL على Vercel
echo 2. نسخ DATABASE_URL
echo 3. تشغيل Migrations
echo 4. نشر المشروع
echo.
echo ════════════════════════════════════════════════════════════
echo.

echo [الخطوة 1/4] إنشاء قاعدة البيانات
echo ────────────────────────────────────────
echo.
echo ⚠️ افتح المتصفح واذهب إلى:
echo    https://vercel.com/dashboard
echo.
echo ثم:
echo 1. اختر مشروعك
echo 2. Storage → Create Database → Postgres
echo 3. Name: shawky-guide-db
echo 4. Create → Connect Project
echo.
pause
echo.

echo [الخطوة 2/4] نسخ DATABASE_URL
echo ────────────────────────────────────────
echo.
echo في Vercel Dashboard:
echo 1. Settings → Environment Variables
echo 2. ابحث عن: POSTGRES_PRISMA_URL
echo 3. انسخ القيمة
echo.
echo الصق DATABASE_URL هنا:
set /p DATABASE_URL="DATABASE_URL="
echo.

if "%DATABASE_URL%"=="" (
    color 0C
    echo ❌ لم تدخل DATABASE_URL
    pause
    exit /b 1
)

echo ✅ تم حفظ DATABASE_URL
echo.

echo [الخطوة 3/4] إنشاء ملف .env.production
echo ────────────────────────────────────────
echo DATABASE_URL="%DATABASE_URL%" > .env.production
echo ✅ تم إنشاء .env.production
timeout /t 2 /nobreak >nul
echo.

echo [الخطوة 4/4] تشغيل Migrations
echo ────────────────────────────────────────
echo ⏳ جاري إنشاء الجداول في قاعدة البيانات...
echo.
npx prisma migrate deploy

if %errorlevel% neq 0 (
    color 0E
    echo.
    echo ⚠️ حدثت مشكلة في Migrations
    echo.
    echo جرب:
    echo 1. تأكد من DATABASE_URL صحيح
    echo 2. شغل: npx prisma migrate dev --name init
    echo.
    pause
    exit /b 1
)

echo ✅ تم إنشاء الجداول بنجاح
echo.

echo [الخطوة 5/4] النشر على Vercel
echo ────────────────────────────────────────
echo ⏳ جاري النشر...
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
    echo 📝 ملاحظات:
    echo    ✓ قاعدة البيانات جاهزة
    echo    ✓ المشروع يعمل بشكل كامل
    echo    ✓ يمكنك إضافة البيانات من لوحة التحكم
    echo.
) else (
    color 0E
    echo.
    echo ════════════════════════════════════════════════════════════
    echo              ⚠️ حدثت مشكلة في النشر
    echo ════════════════════════════════════════════════════════════
    echo.
    echo جرب:
    echo 1. vercel login
    echo 2. vercel --prod
    echo.
)

echo.
pause
