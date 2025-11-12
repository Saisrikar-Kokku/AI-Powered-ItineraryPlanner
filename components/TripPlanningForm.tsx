'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TripPreferences, validateTripPreferences } from '@/lib/gemini'
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart,
  Car,
  Plane,
  Train,
  Bus,
  Ship,
  Hotel,
  Home,
  Tent,
  Building,
  Loader2,
  Sparkles
} from 'lucide-react'

interface TripPlanningFormProps {
  onSubmit: (preferences: TripPreferences) => Promise<void>
  isLoading: boolean
  initialValues?: Partial<TripPreferences>
}

const tripTypes = [
  { value: 'leisure', label: 'Leisure', icon: Heart, description: 'Relaxing vacation' },
  { value: 'business', label: 'Business', icon: Building, description: 'Work-related travel' },
  { value: 'adventure', label: 'Adventure', icon: MapPin, description: 'Exciting outdoor activities' },
  { value: 'cultural', label: 'Cultural', icon: Heart, description: 'Arts, history, and culture' },
  { value: 'romantic', label: 'Romantic', icon: Heart, description: 'Couple getaway' },
  { value: 'family', label: 'Family', icon: Users, description: 'Family-friendly trip' },
  { value: 'solo', label: 'Solo', icon: MapPin, description: 'Solo adventure' },
  { value: 'group', label: 'Group', icon: Users, description: 'Friends or group travel' }
]

const budgetLevels = [
  { value: 'budget', label: 'Budget', description: '₹2,000-4,000 per day', color: 'bg-green-100 text-green-800' },
  { value: 'mid-range', label: 'Mid-range', description: '₹4,000-8,000 per day', color: 'bg-blue-100 text-blue-800' },
  { value: 'luxury', label: 'Luxury', description: '₹8,000+ per day', color: 'bg-purple-100 text-purple-800' }
]

const accommodationTypes = [
  { value: 'hotel', label: 'Hotel', icon: Hotel },
  { value: 'hostel', label: 'Hostel', icon: Building },
  { value: 'airbnb', label: 'Airbnb', icon: Home },
  { value: 'resort', label: 'Resort', icon: Building },
  { value: 'camping', label: 'Camping', icon: Tent }
]

const transportationTypes = [
  { value: 'flight', label: 'Flight', icon: Plane },
  { value: 'train', label: 'Train', icon: Train },
  { value: 'bus', label: 'Bus', icon: Bus },
  { value: 'car', label: 'Car', icon: Car },
  { value: 'cruise', label: 'Cruise', icon: Ship }
]

const commonInterests = [
  'Museums & Art', 'Nature & Hiking', 'Beaches & Water Sports', 'Food & Cuisine',
  'Nightlife & Entertainment', 'Shopping', 'Photography', 'History & Culture',
  'Adventure Sports', 'Relaxation & Spa', 'Local Experiences', 'Architecture',
  'Music & Festivals', 'Wildlife', 'Religious Sites', 'Markets & Bazaars'
]

export function TripPlanningForm({ onSubmit, isLoading, initialValues }: TripPlanningFormProps) {
  const [formData, setFormData] = useState<TripPreferences>({
    tripType: initialValues?.tripType || 'leisure',
    destination: initialValues?.destination || '',
    duration: initialValues?.duration || 3,
    budget: initialValues?.budget || 'mid-range',
    travelers: initialValues?.travelers || 2,
    interests: initialValues?.interests || [],
    accommodation: initialValues?.accommodation || 'hotel',
    transportation: initialValues?.transportation || 'flight',
    specialRequirements: initialValues?.specialRequirements || ''
  })

  const [errors, setErrors] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when initialValues change
  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        ...initialValues
      }))
    }
  }, [initialValues])

  const handleInputChange = (field: keyof TripPreferences, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Only allow submission from the final step
    if (currentStep !== 3) {
      return
    }

    // Prevent multiple submissions
    if (isSubmitting || isLoading) {
      return
    }

    setIsSubmitting(true)
    
    const validationErrors = validateTripPreferences(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }

    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prevent form submission on Enter key in input fields (except on last step)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // Don't submit form on Enter - user must click the button
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Plan Your Perfect Trip
        </CardTitle>
        <CardDescription className="text-lg">
          Tell us about your dream destination and we'll create a personalized itinerary
        </CardDescription>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mt-6 space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= currentStep 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Basic Trip Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Destination
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Goa, Kerala, Rajasthan, Himachal Pradesh"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Duration (days)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 1)}
                      onKeyDown={handleInputKeyDown}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Number of Travelers
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.travelers}
                      onChange={(e) => handleInputChange('travelers', parseInt(e.target.value) || 1)}
                      onKeyDown={handleInputKeyDown}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Budget Level
                    </label>
                    <div className="space-y-2">
                      {budgetLevels.map((budget) => (
                        <label key={budget.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="budget"
                            value={budget.value}
                            checked={formData.budget === budget.value}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            className="text-primary"
                          />
                          <span className={`px-3 py-1 rounded-full text-sm ${budget.color}`}>
                            {budget.label} - {budget.description}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Trip Type & Interests */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Trip Type & Interests</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Trip Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {tripTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleInputChange('tripType', type.value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.tripType === type.value
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-6 h-6 mx-auto mb-2" />
                          <div className="text-sm font-medium">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Your Interests</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {commonInterests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-2 rounded-lg text-sm transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Travel Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Accommodation Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {accommodationTypes.map((accommodation) => {
                        const Icon = accommodation.icon
                        return (
                          <button
                            key={accommodation.value}
                            type="button"
                            onClick={() => handleInputChange('accommodation', accommodation.value)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.accommodation === accommodation.value
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">{accommodation.label}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Transportation</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {transportationTypes.map((transport) => {
                        const Icon = transport.icon
                        return (
                          <button
                            key={transport.value}
                            type="button"
                            onClick={() => handleInputChange('transportation', transport.value)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.transportation === transport.value
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">{transport.label}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Special Requirements (Optional)
                    </label>
                    <textarea
                      placeholder="Any special needs, dietary restrictions, accessibility requirements, etc."
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Display */}
          {errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-red-800 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                prevStep()
              }}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button 
                type="button" 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  nextStep()
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || isSubmitting || currentStep !== 3}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={(e) => {
                  // Ensure this is the only way to submit
                  if (currentStep !== 3) {
                    e.preventDefault()
                    e.stopPropagation()
                    return
                  }
                }}
              >
                {isLoading || isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Itinerary...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate My Itinerary
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
