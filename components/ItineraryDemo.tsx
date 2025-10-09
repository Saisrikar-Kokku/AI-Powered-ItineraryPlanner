'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  Heart,
  Share2,
  Download,
  Edit3,
  RefreshCw,
  CheckCircle,
  Plane,
  Car,
  Train,
  Utensils,
  Camera,
  ShoppingBag,
  Calendar,
  Users
} from 'lucide-react'

interface Activity {
  id: string
  time: string
  title: string
  location: string
  duration: string
  cost: string
  type: 'transport' | 'activity' | 'food' | 'shopping' | 'sightseeing'
  rating: number
  description: string
}

interface DayPlan {
  day: number
  date: string
  title: string
  activities: Activity[]
  totalCost: string
  highlights: string[]
}

const sampleItinerary: DayPlan[] = [
  {
    day: 1,
    date: 'March 15, 2024',
    title: 'Arrival & Exploration',
    totalCost: '₹8,500',
    highlights: ['Airport Transfer', 'Red Fort Visit', 'Street Food Tour'],
    activities: [
      {
        id: '1',
        time: '10:00 AM',
        title: 'Arrive at Indira Gandhi Airport',
        location: 'New Delhi Airport',
        duration: '1 hour',
        cost: '₹0',
        type: 'transport',
        rating: 4.5,
        description: 'Welcome to Delhi! Collect your luggage and head to the city.'
      },
      {
        id: '2',
        time: '12:00 PM',
        title: 'Check into hotel',
        location: 'The Leela Palace Delhi',
        duration: '1 hour',
        cost: '₹6,000',
        type: 'activity',
        rating: 4.8,
        description: 'Luxury hotel in the heart of Delhi with amazing city views.'
      },
      {
        id: '3',
        time: '2:00 PM',
        title: 'Lunch at Karim\'s',
        location: 'Jama Masjid Area',
        duration: '1 hour',
        cost: '₹800',
        type: 'food',
        rating: 4.7,
        description: 'Famous Mughlai cuisine with authentic Delhi flavors.'
      },
      {
        id: '4',
        time: '4:00 PM',
        title: 'Visit Red Fort',
        location: 'Old Delhi',
        duration: '2 hours',
        cost: '₹500',
        type: 'sightseeing',
        rating: 4.9,
        description: 'Explore the historic Red Fort, a UNESCO World Heritage Site.'
      },
      {
        id: '5',
        time: '7:00 PM',
        title: 'Dinner at Bukhara',
        location: 'ITC Maurya',
        duration: '2 hours',
        cost: '₹1,200',
        type: 'food',
        rating: 4.6,
        description: 'World-famous restaurant known for its authentic North Indian cuisine.'
      }
    ]
  },
  {
    day: 2,
    date: 'March 16, 2024',
    title: 'Cultural Immersion',
    totalCost: '₹9,500',
    highlights: ['Akshardham Temple', 'India Gate', 'Chandni Chowk Shopping'],
    activities: [
      {
        id: '6',
        time: '9:00 AM',
        title: 'Visit Senso-ji Temple',
        location: 'Asakusa District',
        duration: '2 hours',
        cost: '$0',
        type: 'sightseeing',
        rating: 4.8,
        description: 'Tokyo\'s oldest temple with beautiful architecture and peaceful gardens.'
      },
      {
        id: '7',
        time: '11:00 AM',
        title: 'Nakamise Shopping Street',
        location: 'Asakusa',
        duration: '1 hour',
        cost: '$30',
        type: 'shopping',
        rating: 4.5,
        description: 'Traditional shopping street with souvenirs and local snacks.'
      },
      {
        id: '8',
        time: '1:00 PM',
        title: 'Lunch at Asakusa Imahan',
        location: 'Asakusa',
        duration: '1.5 hours',
        cost: '$35',
        type: 'food',
        rating: 4.7,
        description: 'Traditional sukiyaki restaurant with premium wagyu beef.'
      },
      {
        id: '9',
        time: '3:00 PM',
        title: 'Tokyo Skytree Observation Deck',
        location: 'Sumida City',
        duration: '2 hours',
        cost: '$25',
        type: 'sightseeing',
        rating: 4.6,
        description: 'Breathtaking 360-degree views of Tokyo from 450m above ground.'
      },
      {
        id: '10',
        time: '6:00 PM',
        title: 'Evening in Ginza',
        location: 'Ginza District',
        duration: '3 hours',
        cost: '$130',
        type: 'shopping',
        rating: 4.8,
        description: 'Tokyo\'s luxury shopping district with high-end stores and restaurants.'
      }
    ]
  }
]

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'transport': return Plane
    case 'activity': return Camera
    case 'food': return Utensils
    case 'shopping': return ShoppingBag
    case 'sightseeing': return MapPin
    default: return MapPin
  }
}

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'transport': return 'bg-blue-100 text-blue-600'
    case 'activity': return 'bg-green-100 text-green-600'
    case 'food': return 'bg-orange-100 text-orange-600'
    case 'shopping': return 'bg-purple-100 text-purple-600'
    case 'sightseeing': return 'bg-red-100 text-red-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

export function ItineraryDemo() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [favoriteActivities, setFavoriteActivities] = useState<Set<string>>(new Set())

  const toggleFavorite = (activityId: string) => {
    const newFavorites = new Set(favoriteActivities)
    if (newFavorites.has(activityId)) {
      newFavorites.delete(activityId)
    } else {
      newFavorites.add(activityId)
    }
    setFavoriteActivities(newFavorites)
  }

  const regenerateItinerary = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      // In a real app, this would call the AI API
    }, 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-4">
          Interactive Itinerary Demo
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience how our AI creates personalized itineraries. Click on activities, 
          modify timings, and see real-time updates.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="bg-white rounded-xl p-4 shadow-lg border">
            <h3 className="font-semibold mb-3">Tokyo, Japan - 5 Days</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Mar 15-19, 2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>2 Adults</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>Budget: $2,500</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={regenerateItinerary}
            disabled={isGenerating}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4" />
            <span>Customize</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {sampleItinerary.map((day, index) => (
          <Button
            key={day.day}
            onClick={() => setSelectedDay(index)}
            variant={selectedDay === index ? "default" : "outline"}
            className={`flex-shrink-0 ${selectedDay === index ? 'gradient-bg' : ''}`}
          >
            Day {day.day}
          </Button>
        ))}
      </div>

      {/* Itinerary Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="gradient-bg text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    Day {sampleItinerary[selectedDay].day} - {sampleItinerary[selectedDay].title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-4 text-white/90">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{sampleItinerary[selectedDay].date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Total: {sampleItinerary[selectedDay].totalCost}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span>4.7/5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Highlights */}
              <div className="p-6 bg-gray-50 border-b">
                <h4 className="font-semibold mb-3">Today's Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  {sampleItinerary[selectedDay].highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-0">
                {sampleItinerary[selectedDay].activities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type)
                  const isFavorite = favoriteActivities.has(activity.id)
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <div className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-xl ${getActivityColor(activity.type)} flex items-center justify-center`}>
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {activity.time}
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getActivityColor(activity.type)}`}>
                                    {activity.type}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                                    <span className="text-sm text-gray-600">{activity.rating}</span>
                                  </div>
                                </div>
                                
                                <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                                <div className="flex items-center space-x-2 mb-2">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{activity.location}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{activity.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{activity.cost}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFavorite(activity.id)}
                                className="flex-shrink-0"
                              >
                                <Heart 
                                  className={`w-5 h-5 ${
                                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                                  }`} 
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* AI Features Showcase */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Smart Regeneration</h3>
            <p className="text-sm text-gray-600">
              AI automatically adjusts your itinerary based on weather, crowds, and preferences.
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
            <p className="text-sm text-gray-600">
              Machine learning learns your preferences to suggest better activities over time.
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Real-time Updates</h3>
            <p className="text-sm text-gray-600">
              Get instant notifications about changes, delays, and alternative suggestions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
