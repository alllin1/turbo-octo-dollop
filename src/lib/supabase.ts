import { createClient } from '@supabase/supabase-js'

// These would typically be environment variables in a production environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

// Create a single supabase client for interacting with your database
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

// Authentication helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Database query helpers
export const getCompetitions = async () => {
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .eq('status', 'active')
    .order('draw_date', { ascending: true })
  
  return { data, error }
}

export const getCompetition = async (id: string) => {
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}

export const getUserTickets = async (userId: string) => {
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
}

export const purchaseTicket = async (
  competitionId: string, 
  userId: string, 
  skillAnswer: string,
  quantity: number,
  transactionId: string
) => {
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
}
