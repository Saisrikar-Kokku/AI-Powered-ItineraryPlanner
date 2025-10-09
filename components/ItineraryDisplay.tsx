'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GeneratedItinerary, DayPlan } from '@/lib/gemini'
import { 
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Plane,
  Hotel,
  Utensils,
  Eye,
  EyeOff,
  Download,
  Share2,
  Heart,
  Star,
  Navigation,
  Camera,
  ShoppingBag,
  Coffee
} from 'lucide-react'

interface ItineraryDisplayProps {
  itinerary: GeneratedItinerary
  onSave?: (itinerary: GeneratedItinerary) => void
  onShare?: (itinerary: GeneratedItinerary) => void
}

export function ItineraryDisplay({ itinerary, onSave, onShare }: ItineraryDisplayProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1])) // Expand first day by default
  const [showFullDetails, setShowFullDetails] = useState(false)

  const toggleDayExpansion = (day: number) => {
    const newExpanded = new Set(expandedDays)
    if (newExpanded.has(day)) {
      newExpanded.delete(day)
    } else {
      newExpanded.add(day)
    }
    setExpandedDays(newExpanded)
  }

  const expandAllDays = () => {
    setExpandedDays(new Set(itinerary.days.map(day => day.day)))
  }

  const collapseAllDays = () => {
    setExpandedDays(new Set())
  }

  const getActivityIcon = (category: string) => {
    switch (category) {
      case 'sightseeing':
        return <Eye className="w-4 h-4" />
      case 'dining':
        return <Utensils className="w-4 h-4" />
      case 'shopping':
        return <ShoppingBag className="w-4 h-4" />
      case 'entertainment':
        return <Star className="w-4 h-4" />
      case 'relaxation':
        return <Heart className="w-4 h-4" />
      case 'adventure':
        return <Navigation className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return <Coffee className="w-4 h-4" />
      case 'lunch':
      case 'dinner':
        return <Utensils className="w-4 h-4" />
      case 'snack':
        return <Coffee className="w-4 h-4" />
      default:
        return <Utensils className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Itinerary Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {itinerary.title}
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                {itinerary.destination} • {itinerary.duration} days
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onSave?.(itinerary)}>
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={() => onShare?.(itinerary)}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">Budget:</span>
              <span>₹{itinerary.totalBudget.estimated.toLocaleString('en-IN')} {itinerary.totalBudget.currency}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span className="font-semibold">Duration:</span>
              <span>{itinerary.duration} days</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">Created:</span>
              <span>{new Date(itinerary.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{itinerary.summary}</p>

          <div>
            <h3 className="font-semibold mb-2">Trip Highlights:</h3>
            <div className="flex flex-wrap gap-2">
              {itinerary.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daily Itinerary</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={expandAllDays}>
            <Eye className="w-4 h-4 mr-2" />
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAllDays}>
            <EyeOff className="w-4 h-4 mr-2" />
            Collapse All
          </Button>
        </div>
      </div>

      {/* Days */}
      <div className="space-y-4">
        {itinerary.days.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardHeader
                className="cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all"
                onClick={() => toggleDayExpansion(day.day)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-primary">Day {day.day}</span>
                      <span className="text-lg font-medium">{day.title}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(day.date)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>₹{day.budget.estimated.toLocaleString('en-IN')}</span>
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-2xl">
                    {expandedDays.has(day.day) ? '−' : '+'}
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {expandedDays.has(day.day) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="space-y-6">
                      {/* Activities */}
                      <div>
                        <h4 className="font-semibold text-lg mb-3 flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          Activities
                        </h4>
                        <div className="space-y-3">
                          {day.activities.map((activity, activityIndex) => (
                            <div key={activityIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-shrink-0 w-12 text-center">
                                <div className="text-sm font-medium text-primary">{activity.time}</div>
                                <div className="text-xs text-gray-500">{activity.duration}</div>
                              </div>
                              <div className="flex-shrink-0 mt-1">
                                {getActivityIcon(activity.category)}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium">{activity.title}</h5>
                                <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{activity.location}</span>
                                  </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>₹{activity.cost.toLocaleString('en-IN')}</span>
                      </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Meals */}
                      <div>
                        <h4 className="font-semibold text-lg mb-3 flex items-center">
                          <Utensils className="w-5 h-5 mr-2" />
                          Meals
                        </h4>
                        <div className="space-y-3">
                          {day.meals.map((meal, mealIndex) => (
                            <div key={mealIndex} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                              <div className="flex-shrink-0 w-12 text-center">
                                <div className="text-sm font-medium text-primary">{meal.time}</div>
                                <div className="text-xs text-gray-500 capitalize">{meal.type}</div>
                              </div>
                              <div className="flex-shrink-0 mt-1">
                                {getMealIcon(meal.type)}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium">{meal.restaurant}</h5>
                                <p className="text-sm text-gray-600 mb-1">{meal.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{meal.location}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <DollarSign className="w-3 h-3" />
                                    <span>₹{meal.cost.toLocaleString('en-IN')}</span>
                                  </span>
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                    {meal.cuisine}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Info */}
                      {(day.accommodation || day.transportation || day.tips.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {day.accommodation && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h5 className="font-medium flex items-center mb-2">
                                <Hotel className="w-4 h-4 mr-2" />
                                Accommodation
                              </h5>
                              <p className="text-sm text-gray-600">{day.accommodation}</p>
                            </div>
                          )}

                          {day.transportation && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <h5 className="font-medium flex items-center mb-2">
                                <Plane className="w-4 h-4 mr-2" />
                                Transportation
                              </h5>
                              <p className="text-sm text-gray-600">{day.transportation}</p>
                            </div>
                          )}

                          {day.tips.length > 0 && (
                            <div className="p-3 bg-yellow-50 rounded-lg">
                              <h5 className="font-medium mb-2">Tips</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {day.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start space-x-2">
                                    <span className="text-yellow-600 mt-1">•</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Travel Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Packing Essentials</h4>
              <ul className="space-y-1">
                {itinerary.recommendations.packing.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Local Tips</h4>
              <ul className="space-y-1">
                {itinerary.recommendations.localTips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Emergency Contacts</h4>
            <ul className="space-y-1">
              {itinerary.recommendations.emergencyContacts.map((contact, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>{contact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Weather Advice</h4>
            <p className="text-sm text-gray-700">{itinerary.recommendations.weatherAdvice}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
