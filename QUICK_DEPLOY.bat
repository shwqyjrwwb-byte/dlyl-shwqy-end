@echo off
chcp 65001 >nul
echo ========================================
echo   رفع المشروع على GitHub
echo ========================================
echo.

echo [1/6] التحقق من Git...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git غير مثبت!
    echo يرجى تحميله من: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git مثبت

echo.
echo [2/6] إضافة جميع الملفات...
git add .
if %errorlevel% neq 0 (
    echo ❌ فشل في إضافة الملفات
    pause
    exit /b 1
)
echo ✅ تم إضافة الملفات

echo.
echo [3/6] عمل Commit...
git commit -m "Update: Complete system with authentication and area management"
if %errorlevel% neq 0 (
    echo ⚠️ لا توجد تغييرات جديدة أو تم عمل commit مسبقاً
)
echo ✅ تم عمل Commit

echo.
echo [4/6] التحقق من الريموت...
git remote -v | find "origin" >nul
if %errorlevel% neq 0 (
    echo إضافة الريموت...
    git remote add origin https://github.com/shawkyservice-del/-.git
) else (
    echo تحديث الريموت...
    git remote set-url origin https://github.com/shawkyservice-del/-.git
)
echo ✅ تم إعداد الريموت

echo.
echo [5/6] التحقق من الفرع...
git branch -M main
echo ✅ الفرع: main

echo.
echo [6/6] رفع المشروع...
echo جاري الرفع... (قد يستغرق بعض الوقت)
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ⚠️ فشل الرفع. جرب:
    echo git push -u origin main --force
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ تم رفع المشروع بنجاح!
echo ========================================
echo.
echo يمكنك الآن زيارة:
echo https://github.com/shawkyservice-del/-
echo.
pause
