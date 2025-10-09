// Production error handling and monitoring
export interface AppErrorInterface {
  message: string
  errorCode?: string
  statusCode?: number
  timestamp: string
  userAgent?: string
  url?: string
}

export class AppError extends Error {
  public statusCode: number
  public errorCode: string
  public timestamp: string
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500, errorCode: string = 'INTERNAL_ERROR') {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.timestamp = new Date().toISOString()
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export function createError(message: string, statusCode: number = 500, errorCode?: string) {
  return new AppError(message, statusCode, errorCode)
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('fetch')) {
      return new AppError('Network error occurred', 503, 'NETWORK_ERROR')
    }
    
    if (error.message.includes('JSON')) {
      return new AppError('Invalid data format', 400, 'INVALID_FORMAT')
    }

    return new AppError(error.message, 500, 'UNKNOWN_ERROR')
  }

  return new AppError('An unexpected error occurred', 500, 'UNKNOWN_ERROR')
}

export function logError(error: AppError, context?: Record<string, any>) {
  const errorLog = {
    message: error.message,
    errorCode: error.errorCode,
    statusCode: error.statusCode,
    timestamp: error.timestamp,
    stack: error.stack,
    context,
  }

  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    console.error('Production Error:', errorLog)
    // TODO: Send to monitoring service (e.g., Sentry, LogRocket, etc.)
  } else {
    console.error('Development Error:', errorLog)
  }
}

// API Error Response Helper
export function createErrorResponse(error: AppError) {
  return {
    error: {
      message: error.message,
      errorCode: error.errorCode,
      timestamp: error.timestamp,
    },
    success: false,
  }
}

// Client-side error boundary helper
export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}
