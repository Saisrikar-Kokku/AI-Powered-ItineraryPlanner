import { createClient } from '@supabase/supabase-js'
import { env } from './env'

// Create client with validated credentials
export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey)

// Database types
export interface WaitlistEntry {
  id?: number
  name: string
  email: string
  message?: string
  created_at?: string
}

// Waitlist functions
export const addToWaitlist = async (entry: Omit<WaitlistEntry, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([entry])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getWaitlistEntries = async () => {
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Debug function to test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    // Test connection by trying to access the waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .select('id')
      .limit(1)

    if (error) {
      return { success: false, message: `Connection error: ${error.message}` }
    }

    return { success: true, message: 'Supabase connection successful!' }
  } catch (error) {
    return { success: false, message: `Unexpected error: ${error}` }
  }
}
