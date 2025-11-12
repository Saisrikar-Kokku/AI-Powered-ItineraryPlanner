// Server-side only module for AI generation
// This file should only be imported by API routes, never by client components

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

// Free models with fallback order (most reliable first)
export const FREE_MODELS = [
  'meta-llama/llama-3.1-8b-instruct:free',     // Most reliable, fast
  'microsoft/phi-3-mini-128k-instruct:free',   // Very fast, good quality
  'google/gemini-flash-1.5:free',              // Stable Gemini version
  'qwen/qwen-2-7b-instruct:free',              // Good alternative
  'google/gemini-2.0-flash-exp:free'           // Newest but often rate-limited
]

export function createItineraryPrompt(preferences: TripPreferences): string {
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
