import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClientAuthProvider } from '@/components/ClientAuthProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'AI-Powered Itinerary Planner | Your Smart Travel Companion',
  description: 'Plan less, explore more with our AI-powered travel itinerary planner. Get personalized day-by-day itineraries, smart budgeting, and real-time adaptations.',
  keywords: ['travel', 'itinerary', 'AI', 'planner', 'tourism', 'vacation', 'trip planning'],
  authors: [{ name: 'AI Itinerary Planner Team' }],
  openGraph: {
    title: 'AI-Powered Itinerary Planner',
    description: 'Your smart travel companion that uses AI to create personalized itineraries.',
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Itinerary Planner',
    description: 'Your smart travel companion that uses AI to create personalized itineraries.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ErrorBoundary>
          <ClientAuthProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ClientAuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
