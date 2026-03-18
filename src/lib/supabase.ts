import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Types
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string | null
          email: string | null
          phone: string | null
          company: string | null
          status: string | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          company?: string | null
          status?: string | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          company?: string | null
          status?: string | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string | null
          client_id: string | null
          status: string | null
          budget: string | null
          category: string | null
          description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title?: string | null
          client_id?: string | null
          status?: string | null
          budget?: string | null
          category?: string | null
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string | null
          client_id?: string | null
          status?: string | null
          budget?: string | null
          category?: string | null
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
      citas: {
        Row: {
          id: string
          client_id: string | null
          date: string | null
          time: string | null
          type: string | null
          notes: string | null
          status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          client_id?: string | null
          date?: string | null
          time?: string | null
          type?: string | null
          notes?: string | null
          status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string | null
          date?: string | null
          time?: string | null
          type?: string | null
          notes?: string | null
          status?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citas_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
      leads: {
        Row: {
          id: string
          name: string | null
          email: string | null
          phone: string | null
          status: string | null
          source: string | null
          message: string | null
          service_interest: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          status?: string | null
          source?: string | null
          message?: string | null
          service_interest?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          phone?: string | null
          status?: string | null
          source?: string | null
          message?: string | null
          service_interest?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      actividades: {
        Row: {
          id: string
          project_id: string | null
          type: string | null
          date: string | null
          description: string | null
          status: string | null
          assigned_to: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          project_id?: string | null
          type?: string | null
          date?: string | null
          description?: string | null
          status?: string | null
          assigned_to?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string | null
          type?: string | null
          date?: string | null
          description?: string | null
          status?: string | null
          assigned_to?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "actividades_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export default supabase
