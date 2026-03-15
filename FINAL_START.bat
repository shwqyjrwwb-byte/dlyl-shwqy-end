@echo off
title Next.js Development Server
color 0A

echo ========================================
echo   Next.js Development Server
echo ========================================
echo.

echo Checking Node.js installation...
"C:\Program Files\nodejs\node.exe" --version
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo.
echo Checking npm...
"C:\Program Files\nodejs\npm.cmd" --version
if errorlevel 1 (
    echo ERROR: npm not found!
    pause
    exit /b 1
)

echo.
echo Installing/updating dependencies...
"C:\Program Files\nodejs\npm.cmd" install

echo.
echo Starting development server...
echo.
echo *** WAIT FOR "Ready" MESSAGE ***
echo Then open: http://localhost:3000
echo.
echo Press Ctrl+C to stop server
echo ========================================
echo.

"C:\Program Files\nodejs\npm.cmd" run dev

echo.
echo Server stopped.
pause