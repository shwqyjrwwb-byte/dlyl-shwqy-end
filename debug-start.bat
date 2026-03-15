@echo off
echo ========================================
echo   Debug Next.js Startup
echo ========================================

echo Current directory:
cd

echo.
echo Node.js path check:
if exist "C:\Program Files\nodejs\node.exe" (
    echo ✓ Node.js found
    "C:\Program Files\nodejs\node.exe" --version
) else (
    echo ✗ Node.js NOT found at expected location
    echo Searching for node.exe...
    where node 2>nul
)

echo.
echo Next.js binary check:
if exist "node_modules\.bin\next" (
    echo ✓ Next.js binary found
) else (
    echo ✗ Next.js binary NOT found
    echo Checking node_modules...
    dir node_modules\.bin\next* 2>nul
)

echo.
echo Package.json check:
if exist "package.json" (
    echo ✓ package.json found
) else (
    echo ✗ package.json NOT found
)

echo.
echo Starting server with full path...
"C:\Program Files\nodejs\node.exe" "node_modules\.bin\next" dev --port 3000

echo.
echo Press any key to exit...
pause