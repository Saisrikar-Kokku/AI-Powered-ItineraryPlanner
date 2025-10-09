export interface ValidationError {
  field: string
  message: string
}

export interface FormErrors {
  [key: string]: string
}

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required'
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters long'
  }
  
  if (password.length > 100) {
    return 'Password must be less than 100 characters'
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter'
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter'
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number'
  }
  
  return null
}

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'Name is required'
  }
  
  if (name.length < 2) {
    return 'Name must be at least 2 characters long'
  }
  
  if (name.length > 50) {
    return 'Name must be less than 50 characters'
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!nameRegex.test(name)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes'
  }
  
  return null
}

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password'
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  
  return null
}

export const validateForm = (formData: any, mode: 'login' | 'register'): FormErrors => {
  const errors: FormErrors = {}
  
  // Email validation (required for both login and register)
  const emailError = validateEmail(formData.email)
  if (emailError) {
    errors.email = emailError
  }
  
  // Password validation (required for both login and register)
  const passwordError = validatePassword(formData.password)
  if (passwordError) {
    errors.password = passwordError
  }
  
  // Register-specific validations
  if (mode === 'register') {
    // Name validation
    const nameError = validateName(formData.name)
    if (nameError) {
      errors.name = nameError
    }
    
    // Confirm password validation
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword)
    if (confirmPasswordError) {
      errors.confirmPassword = confirmPasswordError
    }
  }
  
  return errors
}

export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0
}
