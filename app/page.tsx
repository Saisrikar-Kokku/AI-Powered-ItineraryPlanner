'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/SectionTitle'
import { FeatureCard } from '@/components/FeatureCard'
import { FeatureList } from '@/components/FeatureList'
import { InteractiveHero } from '@/components/InteractiveHero'
import { 
  Plane, 
  MapPin, 
  Clock, 
  DollarSign, 
  Cloud, 
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Plane,
    title: 'Automated Day-by-Day Itinerary Creation',
    description: 'AI generates complete itineraries based on your preferences, interests, and travel dates.'
  },
  {
    icon: DollarSign,
    title: 'Smart Budgeting Assistance',
    description: 'Get real-time cost estimates and budget optimization suggestions for your entire trip.'
  },
  {
    icon: Cloud,
    title: 'Real-Time Weather & Crowd Adaptation',
    description: 'Your itinerary automatically adjusts based on weather forecasts and crowd predictions.'
  },
  {
    icon: MapPin,
    title: 'Personalized Points of Interest',
    description: 'Discover hidden gems and attractions tailored to your interests and travel style.'
  },
  {
    icon: Sparkles,
    title: 'Explainable AI Recommendations',
    description: 'Understand why AI suggests specific activities with clear explanations and alternatives.'
  },
  {
    icon: Clock,
    title: 'One-Tap Replanning & Adjustments',
    description: 'Easily modify your itinerary with intelligent suggestions for alternative activities.'
  }
]

const benefits = [
  'Save 10+ hours of research and planning time',
  'Discover 3x more unique experiences',
  'Reduce travel costs by up to 25%',
  'Avoid tourist traps and crowds',
  'Get real-time updates and recommendations',
  'Access local insights and hidden gems'
]

const stats = [
  { number: '50K+', label: 'Happy Travelers' },
  { number: '1M+', label: 'Itineraries Created' },
  { number: '95%', label: 'Satisfaction Rate' },
  { number: '4.9/5', label: 'User Rating' }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Interactive Hero Section */}
      <InteractiveHero />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Powerful Features"
            subtitle="Everything you need to plan the perfect trip with AI assistance"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                title="Why Choose Our AI Planner?"
                subtitle="Experience the future of travel planning"
                centered={false}
                className="mb-8"
              />
              <FeatureList features={benefits} />
              <div className="mt-8">
                <Button size="lg" variant="gradient" asChild>
                  <Link href="/features">
                    Explore All Features
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Smart Recommendations</h3>
                      <p className="text-gray-600">AI learns your preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Time Optimization</h3>
                      <p className="text-gray-600">Maximize your travel time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Group Planning</h3>
                      <p className="text-gray-600">Perfect for families & friends</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Travel Planning?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the power of AI-driven itinerary planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/demo">
                  Try Demo Now
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link href="/contact">
                  Join Waitlist
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
