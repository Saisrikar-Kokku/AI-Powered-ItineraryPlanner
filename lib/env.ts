// Environment variable validation for production
export function validateEnv() {
  const requiredEnvVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_OPENROUTER_API_KEY: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  }

  const missingVars: string[] = []

  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value || value.trim() === '') {
      missingVars.push(key)
    }
  }

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(errorMessage)
    } else {
      console.warn(`⚠️  ${errorMessage}`)
    }
  }

  return {
    supabaseUrl: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    openRouterApiKey: requiredEnvVars.NEXT_PUBLIC_OPENROUTER_API_KEY!,
  }
}

// Validate environment variables on module load
export const env = validateEnv()
