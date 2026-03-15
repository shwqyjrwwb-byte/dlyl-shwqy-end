@echo off
title Next.js Server - dlyl-shwqy-2
color 0A

echo ========================================
echo    Starting Next.js Development Server
echo ========================================
echo.

echo Current directory: %CD%
echo.

echo Checking Node.js...
"C:\Program Files\nodejs\node.exe" --version
if errorlevel 1 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)

echo.
echo Starting server...
echo.
echo *** IMPORTANT ***
echo Wait for "Ready" message before opening browser
echo Then open: http://localhost:3000
echo.
echo Press Ctrl+C to stop server
echo ========================================
echo.

"C:\Program Files\nodejs\node.exe" node_modules\.bin\next dev

echo.
echo Server stopped.
pause