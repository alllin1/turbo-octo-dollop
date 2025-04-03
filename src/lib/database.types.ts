export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      competitions: {
        Row: {
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
        Insert: {
          id?: string
          title: string
          description: string
          prize_value: number
          ticket_price: number
          total_tickets: number
          tickets_sold?: number
          draw_date: string
          skill_question: string
          skill_answer: string
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          client_id: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          prize_value?: number
          ticket_price?: number
          total_tickets?: number
          tickets_sold?: number
          draw_date?: string
          skill_question?: string
          skill_answer?: string
          status?: 'active' | 'completed' | 'cancelled'
          created_at?: string
          client_id?: string
        }
      }
      tickets: {
        Row: {
          id: string
          competition_id: string
          user_id: string
          ticket_number: number
          skill_answer: string
          purchase_date: string
          transaction_id: string
        }
        Insert: {
          id?: string
          competition_id: string
          user_id: string
          ticket_number?: number
          skill_answer: string
          purchase_date?: string
          transaction_id: string
        }
        Update: {
          id?: string
          competition_id?: string
          user_id?: string
          ticket_number?: number
          skill_answer?: string
          purchase_date?: string
          transaction_id?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          phone: string | null
          name: string | null
          kyc_verified: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          phone?: string | null
          name?: string | null
          kyc_verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          name?: string | null
          kyc_verified?: boolean
          created_at?: string
        }
      }
    }
  }
}
