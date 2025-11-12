import { env } from './env'

// Get OpenRouter API key
const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || env.openRouterApiKey
  
  if (process.env.NODE_ENV === 'development') {
    const keyPreview = apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : 'NOT FOUND'
    console.log('🔑 OpenRouter API Key:', keyPreview)
    console.log('📝 Key length:', apiKey?.length || 0)
  }
  
  return apiKey
}

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

// Free models with fallback order (best to use first)
const FREE_MODELS = [
  'meta-llama/llama-3.1-8b-instruct:free',     // Most reliable, fast
  'microsoft/phi-3-mini-128k-instruct:free',   // Very fast, good quality
  'google/gemini-flash-1.5:free',              // Stable Gemini version
  'qwen/qwen-2-7b-instruct:free',              // Good alternative
  'google/gemini-2.0-flash-exp:free'           // Newest but often rate-limited
]

export async function generateItinerary(preferences: TripPreferences): Promise<GeneratedItinerary> {
  const apiKey = getApiKey()
  
  if (!apiKey) {
    throw new Error('OpenRouter API key is not configured. Please set NEXT_PUBLIC_OPENROUTER_API_KEY in .env.local')
  }

  const prompt = createItineraryPrompt(preferences)

  // Try models in order until one works
  let lastError: any = null
  
  for (let i = 0; i < FREE_MODELS.length; i++) {
    const model = FREE_MODELS[i]
    
    try {
      console.log(`🚀 Generating itinerary with OpenRouter (attempt ${i + 1}/${FREE_MODELS.length})...`)
      console.log('📦 Using model:', model)
      console.log('📝 Prompt length:', prompt.length, 'characters')
      console.log('⚡ Max tokens: UNLIMITED (full response generation)')
      
      const requestBody = {
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
        // No max_tokens limit - allows complete response without truncation
      }
    
    console.log('📤 Sending request to OpenRouter...')
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AI Itinerary Planner'
      },
      body: JSON.stringify(requestBody)
    })

    console.log('📥 Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API Error Response:', errorText)
      let error
      try {
        error = JSON.parse(errorText)
      } catch {
        throw new Error(`OpenRouter API error (${response.status}): ${errorText}`)
      }
      
      // Check if it's a rate limit error
      if (response.status === 429) {
        throw new Error('OpenRouter rate limit reached. Please wait a moment and try again.')
      }
      
      // Check if it's an authentication error
      if (response.status === 401 || response.status === 403) {
        throw new Error('Invalid OpenRouter API key. Please check NEXT_PUBLIC_OPENROUTER_API_KEY in your environment variables.')
      }
      
      throw new Error(error.error?.message || `OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('📦 Response data structure:', Object.keys(data))
    console.log('📦 Choices available:', data.choices?.length)
    
    if (!data.choices || data.choices.length === 0) {
      console.error('❌ No choices in response:', data)
      throw new Error('OpenRouter returned empty response. The AI model may be unavailable. Please try again.')
    }
    
    const text = data.choices[0]?.message?.content || ''
    const finishReason = data.choices[0]?.finish_reason
    
    console.log('📝 Response length:', text.length, 'characters')
    console.log('📝 Finish reason:', finishReason)
    console.log('📝 Response preview:', text.substring(0, 200))
    
    if (!text || text.trim().length === 0) {
      console.error('❌ Empty content in response')
      console.error('Full response:', JSON.stringify(data, null, 2))
      throw new Error('OpenRouter returned empty content. The AI model may be having issues. Please try again.')
    }
    
    // Check if response was cut off due to token limits
    if (finishReason === 'length') {
      console.warn('⚠️ Warning: Response may be incomplete (finish_reason: length)')
      console.warn('⚠️ This means the model hit its output token limit')
      // Continue anyway - we'll try to parse what we got
    }

    // Clean up the response (remove markdown formatting if present)
    let cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    // Try to extract JSON if it's wrapped in other text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedText = jsonMatch[0]
    }
    
    // Parse the JSON response
    let itinerary
    try {
      itinerary = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError)
      console.error('📄 Cleaned text length:', cleanedText.length)
      console.error('📄 First 500 chars:', cleanedText.substring(0, 500))
      console.error('📄 Last 500 chars:', cleanedText.substring(Math.max(0, cleanedText.length - 500)))
      
      // Check if response was likely cut off
      if (finishReason === 'length') {
        throw new Error(
          'AI response was incomplete due to model output limits. ' +
          'The response was cut off before completing the JSON structure. ' +
          'Please try with a shorter trip duration (fewer days) or simpler preferences.'
        )
      }
      
      throw new Error(
        'Failed to parse AI response. The response may not be in valid JSON format. ' +
        'Please try again or adjust your trip preferences.'
      )
    }
    
    // Add metadata
    const generatedItinerary: GeneratedItinerary = {
      ...itinerary,
      id: `itinerary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }

      console.log(`✅ Successfully generated itinerary with ${model}!`)
      return generatedItinerary
      
    } catch (error: any) {
      console.error(`❌ Model ${model} failed:`, error.message)
      lastError = error
      
      // Check if it's a permanent error (don't retry for these)
      if (error?.message?.includes('401') || error?.message?.includes('403') || error?.message?.includes('Invalid OpenRouter API key')) {
        throw new Error('Invalid OpenRouter API key. Please check NEXT_PUBLIC_OPENROUTER_API_KEY in .env.local')
      }
      
      // If it's a rate limit or temporary error, try next model
      if (i < FREE_MODELS.length - 1) {
        console.log(`🔄 Trying next model (${FREE_MODELS[i + 1]})...`)
        continue
      }
      
      // All models failed
      throw new Error(
        `All AI models are temporarily unavailable. Last error: ${lastError.message}. ` +
        `Please try again in a few moments.`
      )
    }
  }
  
  // Should never reach here
  throw new Error('Failed to generate itinerary: All models unavailable')
}

function createItineraryPrompt(preferences: TripPreferences): string {
  return `
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
