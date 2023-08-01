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
      drinks: {
        Row: {
          alcohol_actual: number | null
          alcohol_potential: number
          created_at: string | null
          id: number
          name: string | null
          recipe: string | null
        }
        Insert: {
          alcohol_actual?: number | null
          alcohol_potential: number
          created_at?: string | null
          id?: number
          name?: string | null
          recipe?: string | null
        }
        Update: {
          alcohol_actual?: number | null
          alcohol_potential?: number
          created_at?: string | null
          id?: number
          name?: string | null
          recipe?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      secrets: {
        Row: {
          created_at: string | null
          id: number
          ip_addr: string
          message: string
          read: boolean
        }
        Insert: {
          created_at?: string | null
          id?: number
          ip_addr: string
          message: string
          read?: boolean
        }
        Update: {
          created_at?: string | null
          id?: number
          ip_addr?: string
          message?: string
          read?: boolean
        }
        Relationships: []
      }
      "tarot-cards": {
        Row: {
          card_name: string
          id: number
          image_url: string | null
          meaning: string
          suit: string
          value: number
        }
        Insert: {
          card_name: string
          id?: number
          image_url?: string | null
          meaning: string
          suit: string
          value: number
        }
        Update: {
          card_name?: string
          id?: number
          image_url?: string | null
          meaning?: string
          suit?: string
          value?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
