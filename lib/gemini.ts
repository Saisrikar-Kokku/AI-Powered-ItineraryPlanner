// Client-side module for itinerary generation
// This calls the server-side API route which securely handles the AI API key

export interface TripPreferences {
  tripType: 'leisure' | 'business' | 'adventure' | 'cultural' | 'romantic' | 'family' | 'solo' | 'group'
  destination: string
  duration: number
  budget: 'budget' | 'mid-range' | 'luxury'
  travelers: number
  interests: string[]
  accommodation: 'hotel' | 'hostel' | 'airbnb' | 'resort' | 'camping'
  transportation: 'flight' | 'train' | 'bus' | 'car' | 'cruise'
  specialRequirements?: string
}

export interface DayPlan {
  day: number
  date: string
  title: string
  activities: Activity[]
  meals: Meal[]
  accommodation?: string
  transportation?: string
  budget: {
    estimated: number
    currency: string
  }
  tips: string[]
}

export interface Activity {
  time: string
  title: string
  description: string
  duration: string
  cost: number
  location: string
  category: 'sightseeing' | 'dining' | 'shopping' | 'entertainment' | 'relaxation' | 'adventure'
}

export interface Meal {
  time: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  restaurant: string
  cuisine: string
  cost: number
  location: string
  description: string
}

export interface GeneratedItinerary {
  id: string
  title: string
  destination: string
  duration: number
  totalBudget: {
    estimated: number
    currency: string
  }
  summary: string
  highlights: string[]
  days: DayPlan[]
  recommendations: {
    packing: string[]
    localTips: string[]
    emergencyContacts: string[]
    weatherAdvice: string
  }
  createdAt: string
}

// Call the server-side API route to generate itinerary
export async function generateItinerary(preferences: TripPreferences): Promise<GeneratedItinerary> {
  console.log('🚀 Generating itinerary via API route...')
  
  try {
    const response = await fetch('/api/generate-itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    const itinerary: GeneratedItinerary = await response.json()
    console.log('✅ Successfully received itinerary from API')
    return itinerary

  } catch (error) {
    console.error('❌ Error calling API:', error)
    throw error
  }
}




// Helper function to validate trip preferences
export function validateTripPreferences(preferences: Partial<TripPreferences>): string[] {
  const errors: string[] = []

  if (!preferences.destination || preferences.destination.trim() === '') {
    errors.push('Destination is required')
  }

  if (!preferences.duration || preferences.duration < 1 || preferences.duration > 30) {
    errors.push('Duration must be between 1 and 30 days')
  }

  if (!preferences.travelers || preferences.travelers < 1 || preferences.travelers > 20) {
    errors.push('Number of travelers must be between 1 and 20')
  }

  if (!preferences.tripType) {
    errors.push('Trip type is required')
  }

  if (!preferences.budget) {
    errors.push('Budget level is required')
  }

  return errors
}

// Helper function to estimate total budget based on preferences (INR)
export function estimateBudget(preferences: TripPreferences): number {
  const baseCosts = {
    budget: { daily: 2000, accommodation: 1500, food: 800 }, // ₹2,000-4,300 per day
    'mid-range': { daily: 4000, accommodation: 3000, food: 1500 }, // ₹4,000-8,500 per day
    luxury: { daily: 12000, accommodation: 8000, food: 4000 } // ₹12,000-24,000 per day
  }

  const costs = baseCosts[preferences.budget]
  const totalDaily = (costs.daily + costs.accommodation + costs.food) * preferences.travelers
  const total = totalDaily * preferences.duration

  // Add transportation cost estimate (INR)
  const transportationCosts = {
    flight: 15000 * preferences.travelers, // Domestic flights
    train: 5000 * preferences.travelers,   // Train journeys
    bus: 2000 * preferences.travelers,     // Bus travel
    car: 8000 + (preferences.duration * 2000), // Car rental + fuel
    cruise: 25000 * preferences.travelers  // Cruise packages
  }

  return Math.round(total + (transportationCosts[preferences.transportation] || 5000))
}
