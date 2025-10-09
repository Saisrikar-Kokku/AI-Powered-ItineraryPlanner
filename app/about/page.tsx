'use client'

import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/SectionTitle'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Brain, 
  Target, 
  Heart, 
  Globe, 
  Users, 
  Lightbulb,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const values = [
  {
    icon: Brain,
    title: 'Intelligence',
    description: 'We harness the power of advanced AI to understand your unique travel preferences and create personalized experiences.'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We share your love for travel and adventure, constantly working to make your journeys more meaningful and memorable.'
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Every recommendation is carefully crafted to match your interests, budget, and travel style with pinpoint accuracy.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'From hidden local gems to world-famous landmarks, we help you discover the best of every destination.'
  }
]

const team = [
  {
    name: 'AI Travel Engine',
    role: 'Core Intelligence',
    description: 'Our advanced AI system that learns from millions of travel experiences to provide personalized recommendations.'
  },
  {
    name: 'Local Experts Network',
    role: 'Human Insight',
    description: 'A global network of local travel experts who validate and enhance our AI recommendations with real-world knowledge.'
  },
  {
    name: 'Data Science Team',
    role: 'Continuous Learning',
    description: 'Experts who continuously improve our algorithms using real-time data, user feedback, and travel trends.'
  }
]

const milestones = [
  {
    year: '2024',
    title: 'Platform Launch',
    description: 'Launched the first AI-powered itinerary planner with core features'
  },
  {
    year: '2024',
    title: '10K Users',
    description: 'Reached our first 10,000 active users within 6 months'
  },
  {
    year: '2024',
    title: 'AI Enhancement',
    description: 'Integrated advanced machine learning for better personalization'
  },
  {
    year: '2025',
    title: 'Global Expansion',
    description: 'Expanding to support travel planning in 50+ countries'
  }
]

export default function AboutPage() {
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
              About Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              We believe that travel planning should be as exciting as the journey itself. 
              Our AI-powered platform transforms the way you discover and experience the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
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
                title="Our Story"
                subtitle="Born from a passion for travel and technology"
                centered={false}
                className="mb-8"
              />
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  The idea for AI-Powered Itinerary Planner was born from a simple frustration: 
                  planning a trip was taking longer than the trip itself. We spent countless hours 
                  researching destinations, comparing prices, and trying to piece together the perfect itinerary.
                </p>
                <p>
                  We realized that while technology had transformed many aspects of our lives, 
                  travel planning remained stuck in the past. That's when we decided to change everything.
                </p>
                <p>
                  Today, our AI-powered platform helps travelers around the world discover amazing 
                  destinations, create personalized itineraries, and make the most of every journey. 
                  We're not just building a tool – we're building the future of travel.
                </p>
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
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">The Vision</h3>
                      <p className="text-gray-600">Making travel planning effortless and enjoyable</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/50 rounded-2xl p-6">
                    <blockquote className="text-lg italic text-gray-700">
                      "We envision a world where every traveler can discover their perfect journey 
                      with the help of intelligent technology that understands their unique preferences."
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Values"
            subtitle="The principles that guide everything we do"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Team"
            subtitle="The minds behind the magic"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Journey"
            subtitle="Key milestones in our story"
            className="mb-16"
          />
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
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
              Join Our Journey
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Be part of the revolution in travel planning. Experience the future of personalized travel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/demo">
                  Try Our Platform
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
