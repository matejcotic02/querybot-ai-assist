export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_insights: {
        Row: {
          action_url: string | null
          created_at: string
          description: string
          id: string
          impact_score: number | null
          title: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          description: string
          id?: string
          impact_score?: number | null
          title: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          description?: string
          id?: string
          impact_score?: number | null
          title?: string
        }
        Relationships: []
      }
      ai_responses: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          prompt_text: string
          response_text: string
          reviewed_by_agent: boolean
          ticket_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          prompt_text: string
          response_text: string
          reviewed_by_agent?: boolean
          ticket_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          prompt_text?: string
          response_text?: string
          reviewed_by_agent?: boolean
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_responses_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics: {
        Row: {
          created_at: string
          id: string
          metric_name: string
          metric_value: number
          owner_id: string | null
          period_end: string
          period_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          metric_name: string
          metric_value: number
          owner_id?: string | null
          period_end: string
          period_start: string
        }
        Update: {
          created_at?: string
          id?: string
          metric_name?: string
          metric_value?: number
          owner_id?: string | null
          period_end?: string
          period_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          ai_confidence: number | null
          created_at: string
          id: string
          is_visible_to_customer: boolean
          message_text: string
          sender_id: string | null
          sender_type: Database["public"]["Enums"]["sender_type"]
          ticket_id: string
        }
        Insert: {
          ai_confidence?: number | null
          created_at?: string
          id?: string
          is_visible_to_customer?: boolean
          message_text: string
          sender_id?: string | null
          sender_type: Database["public"]["Enums"]["sender_type"]
          ticket_id: string
        }
        Update: {
          ai_confidence?: number | null
          created_at?: string
          id?: string
          is_visible_to_customer?: boolean
          message_text?: string
          sender_id?: string | null
          sender_type?: Database["public"]["Enums"]["sender_type"]
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          id: string
          message: string
          sender_type: string
          timestamp: string | null
          user_name: string
        }
        Insert: {
          id?: string
          message: string
          sender_type: string
          timestamp?: string | null
          user_name: string
        }
        Update: {
          id?: string
          message?: string
          sender_type?: string
          timestamp?: string | null
          user_name?: string
        }
        Relationships: []
      }
      customer_feedback: {
        Row: {
          agent_name: string
          date: string | null
          id: string
          score: number
        }
        Insert: {
          agent_name: string
          date?: string | null
          id?: string
          score: number
        }
        Update: {
          agent_name?: string
          date?: string | null
          id?: string
          score?: number
        }
        Relationships: []
      }
      insights: {
        Row: {
          created_at: string | null
          customer_churn: number
          description: string
          id: string
          revenue_growth: number
          top_product: string
        }
        Insert: {
          created_at?: string | null
          customer_churn: number
          description: string
          id?: string
          revenue_growth: number
          top_product: string
        }
        Update: {
          created_at?: string | null
          customer_churn?: number
          description?: string
          id?: string
          revenue_growth?: number
          top_product?: string
        }
        Relationships: []
      }
      knowledge_base: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: string
          is_published: boolean
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          id?: string
          is_published?: boolean
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_base_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_analytics: {
        Row: {
          created_at: string
          customer_count: number
          growth_rate: number | null
          icon_name: string
          id: string
          platform_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_count?: number
          growth_rate?: number | null
          icon_name: string
          id?: string
          platform_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_count?: number
          growth_rate?: number | null
          icon_name?: string
          id?: string
          platform_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          full_name: string
          id: string
          last_login: string | null
          plan_id: string | null
          source_platform: string | null
          status: Database["public"]["Enums"]["user_status"]
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          full_name: string
          id: string
          last_login?: string | null
          plan_id?: string | null
          source_platform?: string | null
          status?: Database["public"]["Enums"]["user_status"]
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string
          id?: string
          last_login?: string | null
          plan_id?: string | null
          source_platform?: string | null
          status?: Database["public"]["Enums"]["user_status"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_plan"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      revenues: {
        Row: {
          amount: number
          created_at: string | null
          growth_rate: number
          id: string
          period: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          growth_rate: number
          id?: string
          period: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          growth_rate?: number
          id?: string
          period?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          ai_calls_per_month: number
          created_at: string
          id: string
          max_tickets: number
          monthly_price: number
          plan_name: string
        }
        Insert: {
          ai_calls_per_month: number
          created_at?: string
          id?: string
          max_tickets: number
          monthly_price: number
          plan_name: string
        }
        Update: {
          ai_calls_per_month?: number
          created_at?: string
          id?: string
          max_tickets?: number
          monthly_price?: number
          plan_name?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          ai_assigned: boolean
          assigned_agent_id: string | null
          category: string | null
          created_at: string
          customer_id: string
          description: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at: string
        }
        Insert: {
          ai_assigned?: boolean
          assigned_agent_id?: string | null
          category?: string | null
          created_at?: string
          customer_id: string
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at?: string
        }
        Update: {
          ai_assigned?: boolean
          assigned_agent_id?: string | null
          category?: string | null
          created_at?: string
          customer_id?: string
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_agent_id_fkey"
            columns: ["assigned_agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean
          payment_status: Database["public"]["Enums"]["payment_status"]
          plan_id: string
          start_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          payment_status?: Database["public"]["Enums"]["payment_status"]
          plan_id: string
          start_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean
          payment_status?: Database["public"]["Enums"]["payment_status"]
          plan_id?: string
          start_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      payment_status: "trial" | "paid" | "failed"
      sender_type: "customer" | "agent" | "ai"
      ticket_priority: "low" | "medium" | "high" | "critical"
      ticket_status: "open" | "pending" | "resolved" | "closed"
      user_role: "admin" | "agent" | "customer"
      user_status: "active" | "inactive" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_status: ["trial", "paid", "failed"],
      sender_type: ["customer", "agent", "ai"],
      ticket_priority: ["low", "medium", "high", "critical"],
      ticket_status: ["open", "pending", "resolved", "closed"],
      user_role: ["admin", "agent", "customer"],
      user_status: ["active", "inactive", "suspended"],
    },
  },
} as const
