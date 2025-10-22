export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      Charities: {
        Row: {
          address: string;
          admin: string;
          c_name: string | null;
          cid: string;
          city: string;
          created_at: string;
          email: string | null;
          state: string;
          zip_code: string;
        };
        Insert: {
          address: string;
          admin: string;
          c_name?: string | null;
          cid?: string;
          city: string;
          created_at?: string;
          email?: string | null;
          state: string;
          zip_code: string;
        };
        Update: {
          address?: string;
          admin?: string;
          c_name?: string | null;
          cid?: string;
          city?: string;
          created_at?: string;
          email?: string | null;
          state?: string;
          zip_code?: string;
        };
        Relationships: [];
      };
      Donation: {
        Row: {
          cid: string | null;
          created_at: string;
          donation_id: string;
          fulfilled: boolean | null;
          item_id: string | null;
          pid: string | null;
          quantitiy_comitted: number | null;
          scheduled_date: string | null;
        };
        Insert: {
          cid?: string | null;
          created_at?: string;
          donation_id?: string;
          fulfilled?: boolean | null;
          item_id?: string | null;
          pid?: string | null;
          quantitiy_comitted?: number | null;
          scheduled_date?: string | null;
        };
        Update: {
          cid?: string | null;
          created_at?: string;
          donation_id?: string;
          fulfilled?: boolean | null;
          item_id?: string | null;
          pid?: string | null;
          quantitiy_comitted?: number | null;
          scheduled_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Donation_cid_fkey";
            columns: ["cid"];
            isOneToOne: false;
            referencedRelation: "Charities";
            referencedColumns: ["cid"];
          },
          {
            foreignKeyName: "Donation_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "Request";
            referencedColumns: ["item_id"];
          },
          {
            foreignKeyName: "Donation_pid_fkey";
            columns: ["pid"];
            isOneToOne: false;
            referencedRelation: "Profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      Profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
        };
        Relationships: [];
      };
      Request: {
        Row: {
          cid: string | null;
          created_at: string;
          item_id: string;
          item_name: string | null;
          post_id: string;
          quantitiy_requested: number | null;
          quantity_fulfilled: number | null;
          urgency: number | null;
        };
        Insert: {
          cid?: string | null;
          created_at?: string;
          item_id?: string;
          item_name?: string | null;
          post_id?: string;
          quantitiy_requested?: number | null;
          quantity_fulfilled?: number | null;
          urgency?: number | null;
        };
        Update: {
          cid?: string | null;
          created_at?: string;
          item_id?: string;
          item_name?: string | null;
          post_id?: string;
          quantitiy_requested?: number | null;
          quantity_fulfilled?: number | null;
          urgency?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Request_cid_fkey";
            columns: ["cid"];
            isOneToOne: false;
            referencedRelation: "Charities";
            referencedColumns: ["cid"];
          },
          {
            foreignKeyName: "Request_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "RequestPost";
            referencedColumns: ["post_id"];
          },
        ];
      };
      RequestPost: {
        Row: {
          cid: string | null;
          created_at: string;
          dropoff_details: string | null;
          is_active: boolean | null;
          post_id: string;
          post_title: string | null;
        };
        Insert: {
          cid?: string | null;
          created_at?: string;
          dropoff_details?: string | null;
          is_active?: boolean | null;
          post_id?: string;
          post_title?: string | null;
        };
        Update: {
          cid?: string | null;
          created_at?: string;
          dropoff_details?: string | null;
          is_active?: boolean | null;
          post_id?: string;
          post_title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "RequestPost_cid_fkey";
            columns: ["cid"];
            isOneToOne: false;
            referencedRelation: "Charities";
            referencedColumns: ["cid"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
