import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export type User = {
  id: string
  email: string
  phone?: string
  name?: string
  kyc_verified: boolean
  created_at: string
}

export type Competition = {
  id: string
  title: string
  description: string
  prize_value: number
  ticket_price: number
  total_tickets: number
  tickets_sold: number
  draw_date: string
  skill_question: string
  skill_answer: string
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
  client_id: string
}

export type Ticket = {
  id: string
  competition_id: string
  user_id: string
  ticket_number: number
  skill_answer: string
  purchase_date: string
  transaction_id: string
}

export type Transaction = {
  id: string
  user_id: string
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method: string
  created_at: string
}

// Authentication helpers with proper error handling and validation
export const signUp = async (email: string, password: string) => {
  if (!email || !validateEmail(email)) {
    return { data: null, error: { message: 'Invalid email address' } }
  }
  
  if (!password || !validatePassword(password).isValid) {
    return { 
      data: null, 
      error: { message: 'Password must be at least 8 characters with numbers and special characters' } 
    }
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  } catch (err) {
    console.error('Sign up error:', err)
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred during sign up' } 
    }
  }
}

export const signIn = async (email: string, password: string) => {
  if (!email || !validateEmail(email)) {
    return { data: null, error: { message: 'Invalid email address' } }
  }
  
  if (!password) {
    return { data: null, error: { message: 'Password is required' } }
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  } catch (err) {
    console.error('Sign in error:', err)
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred during sign in' } 
    }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (err) {
    console.error('Sign out error:', err)
    return { 
      error: { message: 'An unexpected error occurred during sign out' } 
    }
  }
}

export const resetPassword = async (email: string) => {
  if (!email || !validateEmail(email)) {
    return { data: null, error: { message: 'Invalid email address' } }
  }
  
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    return { data, error }
  } catch (err) {
    console.error('Password reset error:', err)
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred during password reset' } 
    }
  }
}

export const updatePassword = async (password: string) => {
  const validation = validatePassword(password)
  if (!validation.isValid) {
    return { 
      data: null, 
      error: { message: validation.errors.join(', ') } 
    }
  }
  
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    })
    return { data, error }
  } catch (err) {
    console.error('Update password error:', err)
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred during password update' } 
    }
  }
}

// Database query helpers with proper error handling
export const getCompetitions = async () => {
  try {
    const { data, error } = await supabase
      .from('competitions')
      .select('*')
      .eq('status', 'active')
      .order('draw_date', { ascending: true })
    
    return { data, error }
  } catch (err) {
    console.error('Get competitions error:', err)
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred while fetching competitions' } 
    }
  }
}

export const getCompetition = async (id: string) => {
  if (!id) {
    return { data: null, error: { message: 'Competition ID is required' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('competitions')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  } catch (err) {
    console.error('Get competition error:', err)
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred while fetching the competition' } 
    }
  }
}

export const getUserTickets = async (userId: string) => {
  if (!userId) {
    return { data: null, error: { message: 'User ID is required' } }
  }
  
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        competitions:competition_id (
          title,
          draw_date,
          status
        )
      `)
      .eq('user_id', userId)
    
    return { data, error }
  } catch (err) {
    console.error('Get user tickets error:', err)
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred while fetching user tickets' } 
    }
  }
}

export const purchaseTicket = async (
  competitionId: string, 
  userId: string, 
  skillAnswer: string,
  quantity: number,
  transactionId: string
) => {
  // Input validation
  if (!competitionId) {
    return { data: null, error: { message: 'Competition ID is required' } }
  }
  
  if (!userId) {
    return { data: null, error: { message: 'User ID is required' } }
  }
  
  if (!skillAnswer) {
    return { data: null, error: { message: 'Skill answer is required' } }
  }
  
  if (!quantity || quantity < 1 || quantity > 100) {
    return { data: null, error: { message: 'Quantity must be between 1 and 100' } }
  }
  
  if (!transactionId) {
    return { data: null, error: { message: 'Transaction ID is required' } }
  }
  
  try {
    // This would typically be a more complex operation with transaction handling
    const { data, error } = await supabase
      .from('tickets')
      .insert(
        Array.from({ length: quantity }).map((_, i) => ({
          competition_id: competitionId,
          user_id: userId,
          skill_answer: skillAnswer,
          purchase_date: new Date().toISOString(),
          transaction_id: transactionId
        }))
      )
    
    return { data, error }
  } catch (err) {
    console.error('Purchase ticket error:', err)
    return { 
      data: null, 
      error: { message: 'An unexpected error occurred during ticket purchase' } 
    }
  }
}

// Validation helpers
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePassword(password: string) {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const errors = []
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`)
  }
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!hasNumbers) {
    errors.push('Password must contain at least one number')
  }
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
