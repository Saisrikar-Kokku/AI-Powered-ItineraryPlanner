#!/bin/bash

# AI-Powered Itinerary Planner Setup Script
echo "🚀 Setting up AI-Powered Itinerary Planner..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp env.template .env.local
    echo "📝 Please update .env.local with your Supabase credentials:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p components/ui
mkdir -p lib
mkdir -p app

echo "✅ Setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run the SQL schema in your Supabase dashboard"
echo "3. Start the development server: npm run dev"
echo ""
echo "🌐 Your app will be available at: http://localhost:3000"
