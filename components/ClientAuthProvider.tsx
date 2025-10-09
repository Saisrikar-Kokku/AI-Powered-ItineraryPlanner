'use client'

import { AuthProvider } from '@/lib/auth-context'
import { ReactNode } from 'react'

interface ClientAuthProviderProps {
  children: ReactNode
}

export function ClientAuthProvider({ children }: ClientAuthProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
