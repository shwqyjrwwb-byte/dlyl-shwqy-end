@echo off
title Installing and Running Next.js Project
color 0A

echo ========================================
echo   Installing Next.js Project
echo ========================================
echo.

echo Step 1: Checking Node.js...
"C:\Program Files\nodejs\node.exe" --version
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo.
echo Step 2: Cleaning old files...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "pnpm-lock.yaml" del "pnpm-lock.yaml"
if exist "package-lock.json" del "package-lock.json"

echo.
echo Step 3: Installing dependencies with npm...
echo This may take a few minutes...
"C:\Program Files\nodejs\npm.cmd" install --legacy-peer-deps

echo.
echo Step 4: Starting development server...
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