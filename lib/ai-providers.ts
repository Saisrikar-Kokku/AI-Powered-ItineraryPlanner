// OpenRouter AI integration for itinerary generation
// Using free models via OpenRouter API

export type AIProvider = 'openrouter'

export interface AIProviderConfig {
  name: string
  enabled: boolean
  apiKey?: string
  model: string
  baseUrl: string
}

// Free models with fallback order (most reliable first)
export const FREE_MODELS = [
  'meta-llama/llama-3.1-8b-instruct:free',     // Most reliable, fast
  'microsoft/phi-3-mini-128k-instruct:free',   // Very fast, good quality
  'google/gemini-flash-1.5:free',              // Stable Gemini version
  'qwen/qwen-2-7b-instruct:free',              // Good alternative
  'google/gemini-2.0-flash-exp:free'           // Newest but often rate-limited
]

// Get OpenRouter configuration
export function getAIProvider(): AIProviderConfig | null {
  const openrouterKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
  
  if (openrouterKey) {
    return {
      name: 'openrouter',
      enabled: true,
      apiKey: openrouterKey,
      model: FREE_MODELS[0], // Use most reliable model by default
      baseUrl: 'https://openrouter.ai/api/v1'
    }
  }

  return null
}

// Generate content using OpenRouter API with free models
export async function generateWithOpenRouter(
  prompt: string, 
  apiKey?: string, 
  model: string = FREE_MODELS[0] // Use most reliable model by default
): Promise<string> {
  const key = apiKey || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
  
  if (!key) {
    throw new Error('OpenRouter API key is required')
  }

  console.log('📤 OpenRouter request - Model:', model)

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
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
      // No max_tokens limit - let the model generate complete responses
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ OpenRouter error:', errorText)
    let error
    try {
      error = JSON.parse(errorText)
    } catch {
      throw new Error(`OpenRouter API error (${response.status}): ${errorText}`)
    }
    throw new Error(error.error?.message || `OpenRouter API error: ${response.status}`)
  }

  const data = await response.json()
  
  if (!data.choices || data.choices.length === 0) {
    console.error('❌ No choices in response')
    throw new Error('OpenRouter returned empty response')
  }
  
  const content = data.choices[0]?.message?.content || ''
  
  if (!content || content.trim().length === 0) {
    console.error('❌ Empty content in response')
    throw new Error('OpenRouter returned empty content')
  }
  
  console.log('✅ Response received:', content.length, 'characters')
  return content
}

