@echo off
echo Starting Next.js development server...
echo.
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" --version
echo.
echo Starting the application...
"C:\Program Files\nodejs\node.exe" "node_modules\next\dist\bin\next" dev --port 3000
echo.
echo Server stopped. Press any key to exit...
pause
