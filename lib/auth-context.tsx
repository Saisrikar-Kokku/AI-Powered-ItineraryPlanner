'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from './supabase'

// User profile interface
export interface UserProfile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
  last_login: string | null
  login_count: number
  profile_completed: boolean
  preferences: Record<string, any>
  metadata: Record<string, any>
}

interface AuthContextType {
  user: User | null
  session: Session | null
  userProfile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: { name?: string; avatar_url?: string }) => Promise<{ error: AuthError | null }>
  refreshUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Function to fetch user profile with timeout
  const fetchUserProfile = async (userId: string) => {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
      )

      const fetchPromise = supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any

      if (error) {
        // If table doesn't exist or user profile doesn't exist, that's okay
        if (error.code === 'PGRST116' || error.code === '42P01') {
          console.log('User profile table not found or user profile does not exist - this is okay')
          return null
        }
        console.error('Error fetching user profile:', error)
        return null
      }

      return data as UserProfile
    } catch (error: any) {
      // Timeout or other errors - just return null, don't block auth
      if (error?.message === 'Profile fetch timeout') {
        console.warn('User profile fetch timed out - continuing without profile')
      } else {
        console.error('Error fetching user profile:', error)
      }
      return null
    }
  }

  useEffect(() => {
    let mounted = true
    
    // Get initial session with timeout
    const getInitialSession = async () => {
      try {
        // Set a timeout for the entire auth check (10 seconds max)
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Auth initialization timeout')), 10000)
        )

        const sessionPromise = supabase.auth.getSession()
        
        let sessionResult
        try {
          sessionResult = await Promise.race([sessionPromise, timeoutPromise]) as any
        } catch (timeoutError) {
          console.warn('Auth session check timed out - continuing without session')
          if (mounted) {
            setLoading(false)
          }
          return
        }
        
        const { data: { session } } = sessionResult
        
        if (!mounted) return

        setSession(session)
        setUser(session?.user ?? null)
        
        // Fetch profile in background, don't block loading
        if (session?.user) {
          fetchUserProfile(session.user.id).then(profile => {
            if (mounted) {
              setUserProfile(profile)
            }
          }).catch(err => {
            console.error('Background profile fetch error:', err)
          })
        }
        
        setLoading(false)
      } catch (error: any) {
        console.error('Error initializing auth:', error)
        // Even on error, stop loading so user can see the page
        if (mounted) {
          setLoading(false)
          // Set user to null on error so protected routes show login
          setUser(null)
          setSession(null)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        setSession(session)
        setUser(session?.user ?? null)
        
        // Fetch profile in background
        if (session?.user) {
          fetchUserProfile(session.user.id).then(profile => {
            if (mounted) {
              setUserProfile(profile)
            }
          }).catch(err => {
            console.error('Background profile fetch error:', err)
          })
        } else {
          setUserProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
        }
      }
    })
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (!error) {
      // Fetch user profile after successful login
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const profile = await fetchUserProfile(user.id)
        setUserProfile(profile)
      }
    }
    
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUserProfile(null)
  }

  const updateProfile = async (updates: { name?: string; avatar_url?: string }) => {
    const { error } = await supabase.auth.updateUser({
      data: updates
    })
    
    if (!error && user) {
      // Refresh user profile after update
      const profile = await fetchUserProfile(user.id)
      setUserProfile(profile)
    }
    
    return { error }
  }

  const refreshUserProfile = async () => {
    if (user) {
      const profile = await fetchUserProfile(user.id)
      setUserProfile(profile)
    }
  }

  const value = {
    user,
    session,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
