@echo off
title Simple Node.js Server - dlyl-shwqy-2
color 0A

echo ========================================
echo   Starting Simple Server
echo ========================================
echo.

echo Checking Node.js...
"C:\Program Files\nodejs\node.exe" --version
if errorlevel 1 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)

echo.
echo Starting simple server...
echo This will work while we fix Next.js
echo.

"C:\Program Files\nodejs\node.exe" SIMPLE_SERVER.js

echo.
echo Server stopped.
pause