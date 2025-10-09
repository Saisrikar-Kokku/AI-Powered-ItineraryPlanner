@echo off
echo 🚀 Setting up AI-Powered Itinerary Planner...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check if .env.local exists
if not exist ".env.local" (
    echo ⚠️  .env.local not found. Creating from template...
    copy env.template .env.local
    echo 📝 Please update .env.local with your Supabase credentials:
    echo    - NEXT_PUBLIC_SUPABASE_URL
    echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
)

REM Create necessary directories
echo 📁 Creating directories...
if not exist "components\ui" mkdir components\ui
if not exist "lib" mkdir lib
if not exist "app" mkdir app

echo ✅ Setup complete!
echo.
echo 🔧 Next steps:
echo 1. Update .env.local with your Supabase credentials
echo 2. Run the SQL schema in your Supabase dashboard
echo 3. Start the development server: npm run dev
echo.
echo 🌐 Your app will be available at: http://localhost:3000
pause
