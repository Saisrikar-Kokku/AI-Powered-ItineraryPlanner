'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search,
  ArrowRight,
  Sparkles,
  Globe,
  Clock
} from 'lucide-react'
import Link from 'next/link'

const destinations = [
  'Tokyo, Japan',
  'Paris, France', 
  'New York, USA',
  'Barcelona, Spain',
  'London, UK',
  'Rome, Italy',
  'Bangkok, Thailand',
  'Sydney, Australia'
]

const travelTypes = [
  { icon: Globe, label: 'Adventure', color: 'from-green-500 to-emerald-500' },
  { icon: Sparkles, label: 'Luxury', color: 'from-purple-500 to-pink-500' },
  { icon: Users, label: 'Family', color: 'from-blue-500 to-cyan-500' },
  { icon: Clock, label: 'Quick Trip', color: 'from-orange-500 to-red-500' }
]

export function InteractiveHero() {
  const [currentDestination, setCurrentDestination] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTravelType, setSelectedTravelType] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search
    setTimeout(() => {
      setIsSearching(false)
      // In a real app, this would navigate to results
      console.log('Searching for:', searchQuery, 'Type:', travelTypes[selectedTravelType].label)
    }, 1500)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg opacity-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzOEJERjgiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Your Smart Travel{' '}
              <span className="gradient-text">Companion</span>
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-xl md:text-2xl text-gray-600">
              <span>Plan your trip to</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentDestination}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="font-semibold text-primary"
                >
                  {destinations[currentDestination]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-primary"
                  />
                </div>

                {/* Travel Type Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {travelTypes.map((type, index) => (
                    <motion.button
                      key={type.label}
                      onClick={() => setSelectedTravelType(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        selectedTravelType === index
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mx-auto mb-2`}>
                        <type.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{type.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery}
                  size="lg"
                  variant="gradient"
                  className="w-full h-14 text-lg"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Planning Your Trip...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Generate My Itinerary
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {[
              { number: '50K+', label: 'Happy Travelers' },
              { number: '1M+', label: 'Itineraries Created' },
              { number: '95%', label: 'Satisfaction Rate' },
              { number: '4.9/5', label: 'User Rating' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
