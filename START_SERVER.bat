@echo off
echo ========================================
echo تشغيل سيرفر المشروع
echo ========================================
echo.

cd /d "%~dp0"

echo جاري تشغيل السيرفر...
echo.
echo بعد التشغيل، افتح المتصفح على:
echo http://localhost:3000/contacts
echo.
echo للإيقاف: اضغط Ctrl + C
echo ========================================
echo.

npm run dev

pause
