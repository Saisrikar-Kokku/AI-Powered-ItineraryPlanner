'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/SectionTitle'
import { FeatureCard } from '@/components/FeatureCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plane, 
  MapPin, 
  Clock, 
  DollarSign, 
  Cloud, 
  Users,
  Sparkles,
  Shield,
  Smartphone,
  Globe,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

const mainFeatures = [
  {
    icon: Plane,
    title: 'Automated Day-by-Day Itinerary Creation',
    description: 'AI generates complete itineraries based on your preferences, interests, and travel dates. Get detailed schedules with optimal timing and route planning.',
    benefits: [
      'Personalized daily schedules',
      'Optimal route optimization',
      'Time-based activity planning',
      'Multi-day trip coordination'
    ]
  },
  {
    icon: DollarSign,
    title: 'Smart Budgeting Assistance',
    description: 'Get real-time cost estimates and budget optimization suggestions for your entire trip. Track expenses and find the best deals automatically.',
    benefits: [
      'Real-time cost tracking',
      'Budget optimization tips',
      'Deal alerts and discounts',
      'Expense categorization'
    ]
  },
  {
    icon: Cloud,
    title: 'Real-Time Weather & Crowd Adaptation',
    description: 'Your itinerary automatically adjusts based on weather forecasts and crowd predictions. Never get caught in bad weather or long lines.',
    benefits: [
      'Weather-based adjustments',
      'Crowd level predictions',
      'Alternative indoor activities',
      'Peak time avoidance'
    ]
  },
  {
    icon: MapPin,
    title: 'Personalized Points of Interest',
    description: 'Discover hidden gems and attractions tailored to your interests and travel style. Go beyond tourist traps to find authentic experiences.',
    benefits: [
      'Hidden gem discovery',
      'Interest-based filtering',
      'Local expert recommendations',
      'Off-the-beaten-path suggestions'
    ]
  },
  {
    icon: Sparkles,
    title: 'Explainable AI Recommendations',
    description: 'Understand why AI suggests specific activities with clear explanations and alternatives. Make informed decisions about your travel plans.',
    benefits: [
      'Transparent AI reasoning',
      'Alternative suggestions',
      'Confidence scoring',
      'User preference learning'
    ]
  },
  {
    icon: Clock,
    title: 'One-Tap Replanning & Adjustments',
    description: 'Easily modify your itinerary with intelligent suggestions for alternative activities. Make changes on the go without losing your progress.',
    benefits: [
      'Instant replanning',
      'Smart alternatives',
      'Real-time updates',
      'Seamless modifications'
    ]
  }
]

const additionalFeatures = [
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Your travel data is encrypted and secure. We never share your personal information without your consent.'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Access your itineraries anywhere with our responsive mobile app. Perfect for on-the-go travel planning.'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Plan trips to destinations worldwide with comprehensive data for cities, attractions, and local insights.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate complete itineraries in seconds. Our optimized AI delivers results faster than traditional planning methods.'
  },
  {
    icon: Heart,
    title: 'Personal Touch',
    description: 'AI learns from your preferences to provide increasingly personalized recommendations over time.'
  },
  {
    icon: Users,
    title: 'Group Planning',
    description: 'Collaborate with travel companions. Share itineraries and get group-optimized suggestions for everyone.'
  }
]

const comparisonFeatures = [
  'AI-powered recommendations',
  'Real-time weather adaptation',
  'Budget optimization',
  'Crowd level predictions',
  'Hidden gem discovery',
  'One-tap replanning',
  'Mobile accessibility',
  'Group collaboration',
  'Privacy protection',
  'Global coverage'
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">
              Powerful Features
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Discover how our AI-powered platform transforms travel planning 
              with intelligent features designed for modern travelers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Core Features"
            subtitle="The essential tools that make travel planning effortless"
            className="mb-16"
          />
          
          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="bg-white/50 rounded-2xl p-6">
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Additional Features"
            subtitle="Everything you need for a complete travel planning experience"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Our Platform?"
            subtitle="See how we compare to traditional travel planning methods"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-primary/20 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-primary">AI-Powered Planning</CardTitle>
                  <CardDescription className="text-lg">
                    Our intelligent platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comparisonFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-gray-200 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gray-200 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-10 h-10 text-gray-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-600">Traditional Planning</CardTitle>
                  <CardDescription className="text-lg">
                    Manual research and planning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comparisonFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                      <span className="text-gray-400 line-through">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
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
              Experience the Future of Travel Planning
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the power of AI-driven itinerary planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/demo">
                  Try Demo Now
                  <ArrowRight className="ml-2 w-5 h-5" />
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
