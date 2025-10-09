'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/SectionTitle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ItineraryDemo } from '@/components/ItineraryDemo'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  ArrowRight,
  Play,
  Calendar,
  Users,
  Heart,
  Share2,
  Download,
  Smartphone,
  Globe,
  Zap
} from 'lucide-react'
import Link from 'next/link'

const sampleItinerary = {
  destination: 'Tokyo, Japan',
  duration: '5 days',
  budget: '$2,500',
  travelers: '2 adults',
  rating: 4.9,
  activities: [
    {
      day: 'Day 1',
      date: 'March 15, 2024',
      title: 'Arrival & Exploration',
      activities: [
        { time: '10:00 AM', activity: 'Arrive at Narita Airport', location: 'Narita International Airport' },
        { time: '12:00 PM', activity: 'Check into hotel', location: 'Shibuya Sky Hotel' },
        { time: '2:00 PM', activity: 'Lunch at local ramen shop', location: 'Ichiran Ramen, Shibuya' },
        { time: '4:00 PM', activity: 'Explore Shibuya Crossing', location: 'Shibuya District' },
        { time: '7:00 PM', activity: 'Dinner at traditional izakaya', location: 'Torikizoku, Shibuya' }
      ]
    },
    {
      day: 'Day 2',
      date: 'March 16, 2024',
      title: 'Cultural Immersion',
      activities: [
        { time: '9:00 AM', activity: 'Visit Senso-ji Temple', location: 'Asakusa District' },
        { time: '11:00 AM', activity: 'Explore Nakamise Shopping Street', location: 'Asakusa' },
        { time: '1:00 PM', activity: 'Lunch at traditional restaurant', location: 'Asakusa Imahan' },
        { time: '3:00 PM', activity: 'Tokyo Skytree observation deck', location: 'Sumida City' },
        { time: '6:00 PM', activity: 'Evening in Ginza district', location: 'Ginza' }
      ]
    },
    {
      day: 'Day 3',
      date: 'March 17, 2024',
      title: 'Modern Tokyo',
      activities: [
        { time: '9:00 AM', activity: 'TeamLab Borderless digital art museum', location: 'Odaiba' },
        { time: '12:00 PM', activity: 'Lunch at Odaiba', location: 'Aqua City Odaiba' },
        { time: '2:00 PM', activity: 'Harajuku shopping and culture', location: 'Harajuku District' },
        { time: '5:00 PM', activity: 'Meiji Shrine visit', location: 'Shibuya' },
        { time: '7:00 PM', activity: 'Dinner in Roppongi', location: 'Roppongi Hills' }
      ]
    }
  ]
}

const features = [
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Access your itinerary anywhere with our intuitive mobile app'
  },
  {
    icon: Globe,
    title: 'Offline Maps',
    description: 'Download maps and itineraries for offline access during travel'
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description: 'Get instant notifications about weather, crowds, and changes'
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your itinerary with travel companions and family'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    location: 'San Francisco, CA',
    rating: 5,
    comment: 'The AI perfectly understood my love for hidden gems and local experiences. It suggested places I never would have found!'
  },
  {
    name: 'Michael Rodriguez',
    location: 'New York, NY',
    rating: 5,
    comment: 'Saved me 15+ hours of research. The itinerary was perfectly balanced between must-see attractions and unique experiences.'
  },
  {
    name: 'Emma Thompson',
    location: 'London, UK',
    rating: 5,
    comment: 'The real-time weather adjustments were a game-changer. We avoided the crowds and had the best experience possible.'
  }
]

export default function DemoPage() {
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
              See It In Action
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Experience how our AI creates personalized itineraries that adapt to your preferences, 
              budget, and real-time conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="gradient" asChild>
                <Link href="/contact">
                  Try Live Demo
                  <Play className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/contact">
                  Join Waitlist
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Itinerary Demo */}
      <section className="py-20">
        <ItineraryDemo />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Platform Features"
            subtitle="Everything you need for seamless travel planning"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What Travelers Say"
            subtitle="Real feedback from our community"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 mb-4 italic">
                      "{testimonial.comment}"
                    </blockquote>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                title="Try It Yourself"
                subtitle="Experience the power of AI-driven travel planning"
                centered={false}
                className="mb-8"
              />
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Our interactive demo lets you experience how our AI creates personalized itineraries. 
                  Simply input your preferences and watch as we generate a complete travel plan.
                </p>
                <p>
                  See how our platform adapts to different travel styles, budgets, and interests. 
                  From adventure seekers to culture enthusiasts, we've got you covered.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" variant="gradient" asChild>
                  <Link href="/contact">
                    Start Interactive Demo
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
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Interactive Demo</h3>
                    <p className="text-gray-600">Experience AI-powered planning</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700 mb-2">Demo Status</div>
                      <div className="text-2xl font-bold gradient-text">Ready to Launch</div>
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
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the power of AI-driven itinerary planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/contact">
                  Get Early Access
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
