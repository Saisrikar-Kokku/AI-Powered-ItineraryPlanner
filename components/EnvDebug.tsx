'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export function EnvDebug() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const isUrlValid = supabaseUrl && !supabaseUrl.includes('placeholder') && supabaseUrl.includes('supabase.co')
  const isKeyValid = supabaseKey && !supabaseKey.includes('placeholder') && supabaseKey.startsWith('eyJ')

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-orange-800">
          <AlertTriangle className="w-5 h-5" />
          <span>Environment Debug</span>
        </CardTitle>
        <CardDescription className="text-orange-700">
          Check your Supabase configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Supabase URL:</span>
            <div className="flex items-center space-x-2">
              {isUrlValid ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs ${isUrlValid ? 'text-green-600' : 'text-red-600'}`}>
                {isUrlValid ? 'Valid' : 'Invalid/Missing'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Supabase Key:</span>
            <div className="flex items-center space-x-2">
              {isKeyValid ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-xs ${isKeyValid ? 'text-green-600' : 'text-red-600'}`}>
                {isKeyValid ? 'Valid' : 'Invalid/Missing'}
              </span>
            </div>
          </div>
        </div>

        {(!isUrlValid || !isKeyValid) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <h4 className="font-semibold text-red-800 mb-2">Issues Found:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {!isUrlValid && (
                <li>• NEXT_PUBLIC_SUPABASE_URL is missing or invalid</li>
              )}
              {!isKeyValid && (
                <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or invalid</li>
              )}
            </ul>
            <p className="text-sm text-red-600 mt-2">
              Check your .env.local file and restart the development server.
            </p>
          </div>
        )}

        <div className="text-xs text-gray-600">
          <p><strong>URL:</strong> {supabaseUrl ? 'Set' : 'Not set'}</p>
          <p><strong>Key:</strong> {supabaseKey ? 'Set (length: ' + supabaseKey.length + ')' : 'Not set'}</p>
        </div>
      </CardContent>
    </Card>
  )
}
