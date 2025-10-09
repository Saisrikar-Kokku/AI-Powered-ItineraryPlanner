'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { TripPlanningForm } from '@/components/TripPlanningForm'
import { ItineraryDisplay } from '@/components/ItineraryDisplay'
import { TripPreferences, GeneratedItinerary, generateItinerary } from '@/lib/gemini'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react'

export default function PlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(true)

  const handleGenerateItinerary = async (preferences: TripPreferences) => {
    setIsGenerating(true)
    setError(null)
    setGeneratedItinerary(null)

    try {
      const itinerary = await generateItinerary(preferences)
      setGeneratedItinerary(itinerary)
      setShowForm(false)
    } catch (err) {
      console.error('Error generating itinerary:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveItinerary = async (itinerary: GeneratedItinerary) => {
    try {
      // Here you would typically save to your database
      console.log('Saving itinerary:', itinerary)
      // For now, we'll just show a success message
      alert('Itinerary saved successfully!')
    } catch (error) {
      console.error('Error saving itinerary:', error)
      alert('Failed to save itinerary')
    }
  }

  const handleShareItinerary = async (itinerary: GeneratedItinerary) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: itinerary.title,
          text: `Check out my ${itinerary.destination} itinerary!`,
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing itinerary:', error)
      alert('Failed to share itinerary')
    }
  }

  const handleNewItinerary = () => {
    setGeneratedItinerary(null)
    setError(null)
    setShowForm(true)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                AI-Powered Itinerary Planner
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Create personalized travel itineraries powered by advanced AI. 
                Get detailed day-by-day plans tailored to your preferences and interests.
              </p>
            </motion.div>

            {!showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <Button
                  onClick={handleNewItinerary}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Plan Another Trip</span>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-red-800">Error Generating Itinerary</h3>
                        <p className="text-red-700">{error}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        onClick={handleNewItinerary}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        Try Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <TripPlanningForm
                  onSubmit={handleGenerateItinerary}
                  isLoading={isGenerating}
                />
              </motion.div>
            ) : generatedItinerary ? (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Itinerary Generated Successfully!</span>
                  </motion.div>
                </div>
                <ItineraryDisplay
                  itinerary={generatedItinerary}
                  onSave={handleSaveItinerary}
                  onShare={handleShareItinerary}
                />
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <Card className="w-full max-w-md">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4">
                      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                    </div>
                    <CardTitle className="mb-2">Generating Your Itinerary</CardTitle>
                    <CardDescription>
                      Our AI is crafting the perfect travel plan for you. This may take a few moments...
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features Section */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Why Choose Our AI Planner?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Get personalized itineraries that match your unique travel style and preferences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">AI-Powered Planning</h3>
                  <p className="text-gray-600 text-sm">
                    Advanced AI analyzes your preferences to create the perfect itinerary
                  </p>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Personalized Experience</h3>
                  <p className="text-gray-600 text-sm">
                    Tailored recommendations based on your interests and travel style
                  </p>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowLeft className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Detailed Planning</h3>
                  <p className="text-gray-600 text-sm">
                    Complete day-by-day plans with activities, meals, and practical tips
                  </p>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
