@echo off
setlocal
cd /d "%~dp0"
echo ========================================
echo ROCK STYLES - Windows Setup
echo ========================================
if not exist .env.local (
  copy /Y .env.local.example .env.local >nul
  echo.
  echo .env.local created.
  echo Paste your existing Firebase values into .env.local before starting.
  echo.
)
echo Installing packages...
npm install
if errorlevel 1 goto fail
echo.
echo Starting Rock Styles...
npm run dev
exit /b 0
:fail
echo.
echo npm install failed. Check Node.js/npm and internet connection.
pause
exit /b 1
