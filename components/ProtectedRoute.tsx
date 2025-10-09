'use client'

import { useAuth } from '@/lib/auth-context'
import { AuthModal } from '@/components/AuthModal'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Lock } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Authentication Required</CardTitle>
              <CardDescription>
                Please sign in to access your personalized dashboard and create amazing itineraries.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <User className="w-4 h-4 text-primary" />
                  <span>Create personalized itineraries</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <User className="w-4 h-4 text-primary" />
                  <span>Save your favorite destinations</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <User className="w-4 h-4 text-primary" />
                  <span>Access your travel history</span>
                </div>
              </div>
              
              <Button 
                variant="gradient" 
                className="w-full" 
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In / Sign Up
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    )
  }

  return <>{children}</>
}
