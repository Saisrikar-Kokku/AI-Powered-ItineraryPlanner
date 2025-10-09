'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/SectionTitle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  User, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Clock,
  DollarSign,
  Heart,
  Globe,
  Smartphone,
  Zap
} from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: User,
    title: 'Tell Us About Yourself',
    description: 'Share your travel preferences, interests, budget, and any special requirements. Our AI learns your unique style.',
    details: [
      'Travel style preferences',
      'Budget range and constraints',
      'Interests and activities',
      'Group size and composition',
      'Special requirements'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: '02',
    icon: MapPin,
    title: 'Choose Your Destination',
    description: 'Select where you want to go, or let our AI suggest destinations based on your preferences and current trends.',
    details: [
      'Destination selection',
      'Travel dates and duration',
      'Accommodation preferences',
      'Transportation options',
      'Seasonal considerations'
    ],
    color: 'from-cyan-500 to-teal-500'
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'AI Generates Your Itinerary',
    description: 'Our advanced AI creates a personalized day-by-day itinerary with activities, restaurants, and attractions.',
    details: [
      'Personalized activity selection',
      'Optimal timing and routing',
      'Restaurant recommendations',
      'Attraction bookings',
      'Local insights and tips'
    ],
    color: 'from-teal-500 to-green-500'
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Review & Customize',
    description: 'Review your itinerary and make adjustments. Our AI provides alternatives and explains its recommendations.',
    details: [
      'Interactive itinerary review',
      'One-tap modifications',
      'Alternative suggestions',
      'Real-time updates',
      'Collaborative planning'
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    number: '05',
    icon: Smartphone,
    title: 'Travel & Enjoy',
    description: 'Access your itinerary on mobile, get real-time updates, and enjoy your perfectly planned trip.',
    details: [
      'Mobile app access',
      'Real-time notifications',
      'Weather-based adjustments',
      'Crowd level updates',
      'Emergency assistance'
    ],
    color: 'from-emerald-500 to-lime-500'
  }
]

const features = [
  {
    icon: Clock,
    title: 'Time Optimization',
    description: 'AI calculates optimal timing for each activity to minimize travel time and maximize experiences.'
  },
  {
    icon: DollarSign,
    title: 'Budget Management',
    description: 'Real-time cost tracking and budget optimization to help you stay within your financial limits.'
  },
  {
    icon: Heart,
    title: 'Personalization',
    description: 'Machine learning algorithms adapt to your preferences for increasingly personalized recommendations.'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Comprehensive data for destinations worldwide with local insights and cultural considerations.'
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description: 'Dynamic itinerary adjustments based on weather, crowds, and real-time conditions.'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description: 'Seamless mobile experience with offline access and GPS integration for on-the-go planning.'
  }
]

const benefits = [
  'Save 10+ hours of research time',
  'Discover 3x more unique experiences',
  'Reduce travel costs by up to 25%',
  'Avoid tourist traps and crowds',
  'Get real-time recommendations',
  'Access local insights and hidden gems'
]

export default function HowItWorksPage() {
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
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              From idea to adventure in just 5 simple steps. 
              Our AI-powered platform makes travel planning effortless and enjoyable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="The Process"
            subtitle="Simple steps to your perfect trip"
            className="mb-16"
          />
          
          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
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
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Step {step.number}</div>
                        <h3 className="text-3xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className={`bg-gradient-to-br ${step.color} rounded-3xl p-8 text-white`}>
                    <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="h-4 bg-white/30 rounded-full w-3/4"></div>
                        <div className="h-4 bg-white/30 rounded-full w-1/2"></div>
                        <div className="h-4 bg-white/30 rounded-full w-2/3"></div>
                        <div className="h-4 bg-white/30 rounded-full w-4/5"></div>
                        <div className="h-4 bg-white/30 rounded-full w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Advanced Features"
            subtitle="Powerful tools that make the difference"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                title="Why It Works"
                subtitle="The benefits of AI-powered travel planning"
                centered={false}
                className="mb-8"
              />
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-lg text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" variant="gradient" asChild>
                  <Link href="/demo">
                    Try It Now
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
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">95%</div>
                    <p className="text-gray-600">User Satisfaction Rate</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">10+</div>
                      <p className="text-sm text-gray-600">Hours Saved</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">25%</div>
                      <p className="text-sm text-gray-600">Cost Reduction</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/50 rounded-2xl p-4">
                    <blockquote className="text-sm italic text-gray-700">
                      "The AI understood my travel style better than I did. 
                      It suggested places I never would have found on my own."
                    </blockquote>
                    <div className="text-xs text-gray-500 mt-2">- Sarah M., Traveler</div>
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
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the power of AI-driven itinerary planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/demo">
                  Start Planning Now
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
