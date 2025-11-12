import { NextRequest, NextResponse } from 'next/server'
import { TripPreferences, createItineraryPrompt, FREE_MODELS } from '@/lib/gemini-server'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const preferences: TripPreferences = await request.json()

    // Validate preferences
    if (!preferences.destination || !preferences.duration || !preferences.budget) {
      return NextResponse.json(
        { error: 'Missing required preferences' },
        { status: 400 }
      )
    }

    // Get API key from environment (server-side only)
    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      console.error('❌ OpenRouter API key not configured')
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured. Please set OPENROUTER_API_KEY in environment variables.' },
        { status: 500 }
      )
    }

    const prompt = createItineraryPrompt(preferences)

    // Try models in order until one works
    let lastError: any = null

    for (let i = 0; i < FREE_MODELS.length; i++) {
      const model = FREE_MODELS[i]

      try {
        console.log(`🚀 Generating itinerary with OpenRouter (attempt ${i + 1}/${FREE_MODELS.length})...`)
        console.log('📦 Using model:', model)

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
            'X-Title': 'AI Itinerary Planner'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7
          })
        })

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
            throw new Error('Invalid OpenRouter API key. Please check OPENROUTER_API_KEY in your environment variables.')
          }

          throw new Error(error.error?.message || `OpenRouter API error: ${response.status}`)
        }

        const data = await response.json()

        if (!data.choices || data.choices.length === 0) {
          console.error('❌ No choices in response:', data)
          throw new Error('OpenRouter returned empty response. The AI model may be unavailable. Please try again.')
        }

        const text = data.choices[0]?.message?.content || ''
        const finishReason = data.choices[0]?.finish_reason

        console.log('📝 Response length:', text.length, 'characters')
        console.log('📝 Finish reason:', finishReason)

        if (!text || text.trim().length === 0) {
          console.error('❌ Empty content in response')
          throw new Error('OpenRouter returned empty content. The AI model may be having issues. Please try again.')
        }

        // Check if response was cut off due to token limits
        if (finishReason === 'length') {
          console.warn('⚠️ Warning: Response may be incomplete (finish_reason: length)')
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

          // Check if response was likely cut off
          if (finishReason === 'length') {
            return NextResponse.json(
              {
                error: 'AI response was incomplete due to model output limits. ' +
                  'The response was cut off before completing the JSON structure. ' +
                  'Please try with a shorter trip duration (fewer days) or simpler preferences.'
              },
              { status: 500 }
            )
          }

          return NextResponse.json(
            {
              error: 'Failed to parse AI response. The response may not be in valid JSON format. ' +
                'Please try again or adjust your trip preferences.'
            },
            { status: 500 }
          )
        }

        // Add metadata
        const generatedItinerary = {
          ...itinerary,
          id: `itinerary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString()
        }

        console.log(`✅ Successfully generated itinerary with ${model}!`)
        return NextResponse.json(generatedItinerary)

      } catch (error: any) {
        console.error(`❌ Model ${model} failed:`, error.message)
        lastError = error

        // Check if it's a permanent error (don't retry for these)
        if (error?.message?.includes('401') || error?.message?.includes('403') || error?.message?.includes('Invalid OpenRouter API key')) {
          return NextResponse.json(
            { error: 'Invalid OpenRouter API key. Please check OPENROUTER_API_KEY in environment variables.' },
            { status: 401 }
          )
        }

        // If it's a rate limit or temporary error, try next model
        if (i < FREE_MODELS.length - 1) {
          console.log(`🔄 Trying next model (${FREE_MODELS[i + 1]})...`)
          continue
        }

        // All models failed
        return NextResponse.json(
          {
            error: `All AI models are temporarily unavailable. Last error: ${lastError.message}. ` +
              `Please try again in a few moments.`
          },
          { status: 503 }
        )
      }
    }

    // Should never reach here
    return NextResponse.json(
      { error: 'Failed to generate itinerary: All models unavailable' },
      { status: 503 }
    )

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
