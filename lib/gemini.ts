import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from './env'

// Initialize Gemini AI with validated API key
const genAI = new GoogleGenerativeAI(env.geminiApiKey)

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

export async function generateItinerary(preferences: TripPreferences): Promise<GeneratedItinerary> {
  try {
    // Try Gemini 2.0 Flash first, fallback to Gemini Pro if not available
    let model
    try {
      model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    } catch (error) {
      console.log('Gemini 2.0 Flash not available, falling back to Gemini Pro')
      model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    }

    const prompt = `
You are an expert travel planner and AI assistant specializing in creating detailed, personalized travel itineraries using the latest travel data and insights. 
Create a comprehensive, realistic, and highly detailed day-by-day itinerary based on the following preferences:

**Trip Details:**
- Destination: ${preferences.destination}
- Trip Type: ${preferences.tripType}
- Duration: ${preferences.duration} days
- Budget Level: ${preferences.budget}
- Number of Travelers: ${preferences.travelers}
- Interests: ${preferences.interests.join(', ')}
- Accommodation Preference: ${preferences.accommodation}
- Transportation: ${preferences.transportation}
- Special Requirements: ${preferences.specialRequirements || 'None'}

**Instructions:**
1. Create a highly detailed day-by-day itinerary with specific activities, exact timings, and precise locations
2. Include realistic, up-to-date costs for activities, meals, and transportation in Indian Rupees (₹) based on current Indian market rates
3. Consider the trip type and interests when planning activities, ensuring perfect alignment with user preferences
4. Provide practical tips, local insights, and insider knowledge about the destination
5. Include meal recommendations with authentic local cuisine and popular restaurants
6. Suggest appropriate accommodation options that match the budget level and trip type
7. Consider efficient transportation routes and timing between locations
8. Include accurate budget estimates for each day in Indian Rupees (₹)
9. Provide comprehensive packing suggestions and local cultural tips
10. Include emergency contact information and important local services
11. Ensure all recommendations are current and reflect the latest travel conditions
12. Optimize the itinerary for the best possible travel experience

**Output Format:**
Please provide a comprehensive itinerary in JSON format with the following structure:

{
  "title": "Amazing ${preferences.destination} Adventure",
  "destination": "${preferences.destination}",
  "duration": ${preferences.duration},
  "totalBudget": {
    "estimated": 0,
    "currency": "INR"
  },
  "summary": "Brief overview of the trip",
  "highlights": ["Key highlights of the trip"],
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "title": "Day 1 Title",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity Title",
          "description": "Detailed description",
          "duration": "2 hours",
          "cost": 25,
          "location": "Specific location",
          "category": "sightseeing"
        }
      ],
      "meals": [
        {
          "time": "12:00",
          "type": "lunch",
          "restaurant": "Restaurant Name",
          "cuisine": "Local cuisine type",
          "cost": 15,
          "location": "Restaurant location",
          "description": "What to expect"
        }
      ],
      "accommodation": "Hotel/Accommodation details",
      "transportation": "Transportation details",
      "budget": {
        "estimated": 4000,
        "currency": "INR"
      },
      "tips": ["Practical tips for the day"]
    }
  ],
  "recommendations": {
    "packing": ["Essential items to pack"],
    "localTips": ["Local customs and tips"],
    "emergencyContacts": ["Emergency numbers"],
    "weatherAdvice": "Weather information and advice"
  }
}

Make sure the itinerary is realistic, well-researched, and perfectly tailored to the specific preferences provided. 
Include diverse, engaging activities that match the trip type and interests. Provide accurate, current cost estimates and practical, actionable information.
Ensure the itinerary offers an exceptional travel experience with optimal timing, logical flow, and memorable experiences.
Use your advanced reasoning capabilities to create the most comprehensive and personalized travel plan possible.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean up the response (remove markdown formatting if present)
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    // Parse the JSON response
    const itinerary = JSON.parse(cleanedText)
    
    // Add metadata
    const generatedItinerary: GeneratedItinerary = {
      ...itinerary,
      id: `itinerary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }

    return generatedItinerary
  } catch (error) {
    console.error('Error generating itinerary:', error)
    throw new Error('Failed to generate itinerary. Please try again.')
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
