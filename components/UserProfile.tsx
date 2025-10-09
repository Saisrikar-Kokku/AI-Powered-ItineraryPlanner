'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Mail,
  Calendar,
  MapPin
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface UserProfileProps {
  className?: string
}

export function UserProfile({ className }: UserProfileProps) {
  const { user, userProfile, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  // Generate avatar from email
  const getAvatarUrl = (email: string, name?: string) => {
    const initials = name 
      ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : email.slice(0, 2).toUpperCase()
    
    // Create a simple avatar with initials and background color
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ]
    const colorIndex = email.charCodeAt(0) % colors.length
    const bgColor = colors[colorIndex]
    
    return (
      <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white text-sm font-semibold`}>
        {initials}
      </div>
    )
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsOpen(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`relative ${className}`}>
      {/* Profile Button */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
      >
        {getAvatarUrl(user.email || 'user@example.com', user.user_metadata?.name)}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">
            {userProfile?.name || user.user_metadata?.name || 'User'}
          </div>
          <div className="text-xs text-gray-500 truncate max-w-32">
            {user.email || 'user@example.com'}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                    {(userProfile?.name || user.user_metadata?.name)
                      ? (userProfile?.name || user.user_metadata?.name).split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                      : (user.email || 'user@example.com').slice(0, 2).toUpperCase()
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {userProfile?.name || user.user_metadata?.name || 'User'}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{user.email || 'user@example.com'}</span>
                </div>
                
                {userProfile?.created_at && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Joined {formatDate(userProfile.created_at)}</span>
                  </div>
                )}
                
                {userProfile?.login_count && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{userProfile.login_count} login{userProfile.login_count !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              {/* Menu Actions */}
              <div className="p-4 border-t border-gray-100 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => {
                    console.log('Navigate to settings')
                    setIsOpen(false)
                  }}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  AI-Powered Itinerary Planner
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
