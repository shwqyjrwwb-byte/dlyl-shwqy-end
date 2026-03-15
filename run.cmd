@echo off
title Next.js Development Server
echo ========================================
echo   Starting Next.js Development Server
echo ========================================
echo.

REM Check if Node.js is available
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Node.js version:
"C:\Program Files\nodejs\node.exe" --version
echo.

echo Starting development server...
echo Open your browser to: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

"C:\Program Files\nodejs\node.exe" node_modules\.bin\next dev

echo.
echo Server stopped.
pause