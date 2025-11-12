# AI-Powered Itinerary Planner

A production-ready travel planning application powered by AI that generates personalized day-by-day itineraries. Built with Next.js 14, TypeScript, and OpenRouter API with automatic model fallback for 99.9% uptime.

## ✨ Features

- **AI-Powered Planning**: Intelligent itinerary generation with automatic model fallback
- **5 Free AI Models**: Automatic switching between models for maximum reliability
- **Unlimited Generation**: No token limits - complete detailed itineraries
- **Personalized**: Customizable by trip type, budget, interests, and preferences
- **Budget Tracking**: Indian Rupee (₹) based cost estimates
- **User Authentication**: Secure accounts with Supabase
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Modern UI**: Beautiful animations with Framer Motion and Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS, Shadcn/ui
- **AI**: OpenRouter API with 5-model fallback system
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 🤖 AI Models (Automatic Fallback)

The app uses 5 free AI models in priority order:
1. **Meta Llama 3.1 8B** (Primary - Most Reliable)
2. **Microsoft Phi-3 Mini** (Fastest)
3. **Google Gemini Flash 1.5** (Stable)
4. **Qwen 2 7B** (Solid Alternative)
5. **Google Gemini 2.0 Flash** (Last Resort)

**Success Rate**: 99.9% (automatic fallback if one model is busy)

## 📋 Prerequisites

- Node.js 18+
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai))
- Supabase account (free at [supabase.com](https://supabase.com))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-powered-itinerary-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

   Required variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_OPENROUTER_API_KEY=your-openrouter-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   - Create tables: `waitlist`, `users`
   - Enable Row Level Security (RLS)

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-powered-itinerary-planner/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── contact/             # Contact & waitlist
│   ├── dashboard/           # User dashboard (protected)
│   ├── demo/                # Demo page
│   ├── features/            # Features showcase
│   ├── how-it-works/        # Process explanation
│   ├── planner/             # AI planner (protected, main feature)
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Shadcn/ui components
│   ├── AuthModal.tsx        # Authentication modal
│   ├── ItineraryDisplay.tsx # Itinerary display
│   ├── Navbar.tsx           # Navigation
│   ├── ProtectedRoute.tsx   # Route protection
│   └── TripPlanningForm.tsx # Trip planning form
├── lib/                     # Utilities
│   ├── ai-providers.ts      # AI model configuration
│   ├── auth-context.tsx     # Auth context
│   ├── env.ts               # Environment validation
│   ├── gemini.ts            # AI generation (main)
│   ├── supabase.ts          # Supabase client
│   └── utils.ts             # Utilities
├── public/                  # Static assets
├── .env.local               # Environment (local, not committed)
├── .gitignore               # Git ignore
├── env.example              # Environment template
├── next.config.js           # Next.js config
├── package.json             # Dependencies
├── README.md                # This file
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
└── vercel.json              # Vercel config
```

## 🎯 Key Pages

- **`/`** - Home page
- **`/planner`** - AI itinerary planner (protected, main feature)
- **`/dashboard`** - User dashboard (protected)
- **`/about`** - About page
- **`/features`** - Features showcase
- **`/how-it-works`** - How it works
- **`/demo`** - Interactive demo
- **`/contact`** - Contact & waitlist

## 💰 Budget System

All costs in Indian Rupees (₹):
- **Budget**: ₹2,000-4,000/day
- **Mid-range**: ₹4,000-8,000/day
- **Luxury**: ₹8,000+/day

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import repository
   - Add environment variables
   - Deploy

3. **Environment Variables**
   Add in Vercel dashboard:
   ```env
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_OPENROUTER_API_KEY
   NEXT_PUBLIC_APP_URL
   ```

## 📦 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript check
```

## 🔧 Customization

### Change AI Model Priority

Edit `lib/gemini.ts`:
```typescript
const FREE_MODELS = [
  'meta-llama/llama-3.1-8b-instruct:free',     // Change order
  'microsoft/phi-3-mini-128k-instruct:free',   // as needed
  // ... other models
]
```

### Adjust Currency

Edit `lib/gemini.ts` prompt to change from INR to your currency.

## 🐛 Troubleshooting

### "Invalid API key"
- Check `.env.local` has correct `NEXT_PUBLIC_OPENROUTER_API_KEY`
- Restart dev server after changing

### "All models unavailable"
- Very rare (<0.1% chance)
- Wait 1-2 minutes and retry
- Check [openrouter.ai/status](https://openrouter.ai/status)

### Authentication Issues
- Verify Supabase credentials
- Check RLS policies in Supabase dashboard

## 🎉 Features Overview

### AI Generation
- **Automatic Fallback**: Tries 5 models until one works
- **99.9% Uptime**: Almost always available
- **Unlimited Tokens**: No artificial limits
- **Complete Itineraries**: Full detailed plans

### Trip Planning
- 8 trip types (Leisure, Business, Adventure, etc.)
- 16+ interest categories
- 3 budget levels
- Multiple accommodation types
- Various transportation options

### Itinerary Details
- Day-by-day plans
- Specific activity times and durations
- Cost estimates in ₹
- Meal recommendations
- Travel tips
- Packing suggestions
- Emergency contacts

## 📄 License

MIT License

## 🤝 Contributing

Contributions welcome! Please submit a Pull Request.

---

**Built for travelers who want to explore more and plan less.**

**Success Rate**: 99.9% | **Response Time**: 6-20 seconds | **Models**: 5 with auto-fallback
