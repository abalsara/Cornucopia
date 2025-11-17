export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
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
      admin: {
        Row: {
          cid: string | null;
          created_at: string;
          uid: string;
        };
        Insert: {
          cid?: string | null;
          created_at?: string;
          uid: string;
        };
        Update: {
          cid?: string | null;
          created_at?: string;
          uid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'admin_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'admin_uid_fkey';
            columns: ['uid'];
            isOneToOne: true;
            referencedRelation: 'Profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      AnimalCareSupplies: {
        Row: {
          animal: Database['public']['Enums']['AnimalTypeT'] | null;
          cid: string;
          created_at: string;
          item_id: string;
          type: Database['public']['Enums']['AnimalNeedT'];
        };
        Insert: {
          animal?: Database['public']['Enums']['AnimalTypeT'] | null;
          cid: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['AnimalNeedT'];
        };
        Update: {
          animal?: Database['public']['Enums']['AnimalTypeT'] | null;
          cid?: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['AnimalNeedT'];
        };
        Relationships: [
          {
            foreignKeyName: 'AnimalCareSupplies_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'AnimalCareSupplies_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      Charities: {
        Row: {
          address: string;
          c_name: string;
          causes: string[] | null;
          cid: string;
          city: string;
          created_at: string;
          email: string | null;
          latitude: number | null;
          longitude: number | null;
          mission: string;
          phone_num: string | null;
          state: string;
          zip_code: string;
        };
        Insert: {
          address: string;
          c_name: string;
          causes?: string[] | null;
          cid?: string;
          city: string;
          created_at?: string;
          email?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          mission?: string;
          phone_num?: string | null;
          state: string;
          zip_code: string;
        };
        Update: {
          address?: string;
          c_name?: string;
          causes?: string[] | null;
          cid?: string;
          city?: string;
          created_at?: string;
          email?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          mission?: string;
          phone_num?: string | null;
          state?: string;
          zip_code?: string;
        };
        Relationships: [];
      };
      Clothing: {
        Row: {
          age_group: Database['public']['Enums']['AgeGroupT'] | null;
          cid: string;
          created_at: string;
          gender: Database['public']['Enums']['GenderT'] | null;
          item_id: string;
        };
        Insert: {
          age_group?: Database['public']['Enums']['AgeGroupT'] | null;
          cid: string;
          created_at?: string;
          gender?: Database['public']['Enums']['GenderT'] | null;
          item_id?: string;
        };
        Update: {
          age_group?: Database['public']['Enums']['AgeGroupT'] | null;
          cid?: string;
          created_at?: string;
          gender?: Database['public']['Enums']['GenderT'] | null;
          item_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Clothing_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'Clothing_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
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
        Relationships: [];
      };
      Electronics: {
        Row: {
          cid: string;
          created_at: string;
          item_id: string;
          type: Database['public']['Enums']['ElectronicsTypeT'];
        };
        Insert: {
          cid: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['ElectronicsTypeT'];
        };
        Update: {
          cid?: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['ElectronicsTypeT'];
        };
        Relationships: [
          {
            foreignKeyName: 'Electronics_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'Electronics_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      Food: {
        Row: {
          cid: string;
          created_at: string;
          item_id: string;
          storage_reqs: Database['public']['Enums']['StorageRequirementT'];
        };
        Insert: {
          cid: string;
          created_at?: string;
          item_id?: string;
          storage_reqs?: Database['public']['Enums']['StorageRequirementT'];
        };
        Update: {
          cid?: string;
          created_at?: string;
          item_id?: string;
          storage_reqs?: Database['public']['Enums']['StorageRequirementT'];
        };
        Relationships: [
          {
            foreignKeyName: 'Food_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'Food_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      Furniture: {
        Row: {
          cid: string;
          created_at: string;
          item_id: string;
          type: Database['public']['Enums']['FurnitureTypeT'];
        };
        Insert: {
          cid: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['FurnitureTypeT'];
        };
        Update: {
          cid?: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['FurnitureTypeT'];
        };
        Relationships: [
          {
            foreignKeyName: 'Furniture_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'Furniture_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      HouseholdGoods: {
        Row: {
          cid: string;
          created_at: string;
          item_id: string;
          type: Database['public']['Enums']['HouseholdGoodsTypeT'];
        };
        Insert: {
          cid: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['HouseholdGoodsTypeT'];
        };
        Update: {
          cid?: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['HouseholdGoodsTypeT'];
        };
        Relationships: [
          {
            foreignKeyName: 'HouseholdGoods_cid_fkey1';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'HouseholdGoods_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      HygieneProduct: {
        Row: {
          cid: string;
          created_at: string;
          item_id: string;
        };
        Insert: {
          cid: string;
          created_at?: string;
          item_id?: string;
        };
        Update: {
          cid?: string;
          created_at?: string;
          item_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'HygieneProduct_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'HygieneProduct_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      MedicalSupplies: {
        Row: {
          cid: string;
          created_at: string;
          item_id: string;
          type: Database['public']['Enums']['MedicalSuppliesTypeT'];
        };
        Insert: {
          cid: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['MedicalSuppliesTypeT'];
        };
        Update: {
          cid?: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['MedicalSuppliesTypeT'];
        };
        Relationships: [
          {
            foreignKeyName: 'MedicalSupplies_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'MedicalSupplies_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
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
      Ratings: {
        Row: {
          cid: string | null;
          created_at: string;
          desc: string | null;
          pid: string;
          star: number | null;
        };
        Insert: {
          cid?: string | null;
          created_at?: string;
          desc?: string | null;
          pid: string;
          star?: number | null;
        };
        Update: {
          cid?: string | null;
          created_at?: string;
          desc?: string | null;
          pid?: string;
          star?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Ratings_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'Ratings_pid_fkey';
            columns: ['pid'];
            isOneToOne: true;
            referencedRelation: 'Profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      Request: {
        Row: {
          category: Database['public']['Enums']['RequestTypeT'];
          cid: string;
          created_at: string;
          item_name: string;
          notes: string | null;
          quantitiy: number;
          quantity_fulfilled: number;
          request_id: string;
          unit: string;
        };
        Insert: {
          category?: Database['public']['Enums']['RequestTypeT'];
          cid: string;
          created_at?: string;
          item_name: string;
          notes?: string | null;
          quantitiy?: number;
          quantity_fulfilled?: number;
          request_id?: string;
          unit?: string;
        };
        Update: {
          category?: Database['public']['Enums']['RequestTypeT'];
          cid?: string;
          created_at?: string;
          item_name?: string;
          notes?: string | null;
          quantitiy?: number;
          quantity_fulfilled?: number;
          request_id?: string;
          unit?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Request_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
        ];
      };
      SchoolOfficeSupplies: {
        Row: {
          cid: string;
          created_at: string;
          item_id: string;
        };
        Insert: {
          cid: string;
          created_at?: string;
          item_id?: string;
        };
        Update: {
          cid?: string;
          created_at?: string;
          item_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'SchoolOfficeSupplies_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'SchoolOfficeSupplies_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      SportsEquipment: {
        Row: {
          age_group: Database['public']['Enums']['AgeGroupT'];
          cid: string;
          created_at: string;
          item_id: string;
          type: Database['public']['Enums']['SportsEquipmentTypeT'];
        };
        Insert: {
          age_group?: Database['public']['Enums']['AgeGroupT'];
          cid: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['SportsEquipmentTypeT'];
        };
        Update: {
          age_group?: Database['public']['Enums']['AgeGroupT'];
          cid?: string;
          created_at?: string;
          item_id?: string;
          type?: Database['public']['Enums']['SportsEquipmentTypeT'];
        };
        Relationships: [
          {
            foreignKeyName: 'SportsEquipment_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'SportsEquipment_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      ToysGames: {
        Row: {
          age_group: Database['public']['Enums']['AgeGroupT'] | null;
          cid: string;
          created_at: string;
          item_id: string;
        };
        Insert: {
          age_group?: Database['public']['Enums']['AgeGroupT'] | null;
          cid: string;
          created_at?: string;
          item_id?: string;
        };
        Update: {
          age_group?: Database['public']['Enums']['AgeGroupT'] | null;
          cid?: string;
          created_at?: string;
          item_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ToysGames_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'ToysGames_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
          },
        ];
      };
      Uncatergorized: {
        Row: {
          cid: string;
          created_at: string;
          item_id: string;
        };
        Insert: {
          cid: string;
          created_at?: string;
          item_id?: string;
        };
        Update: {
          cid?: string;
          created_at?: string;
          item_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Uncatergorized_cid_fkey';
            columns: ['cid'];
            isOneToOne: false;
            referencedRelation: 'Charities';
            referencedColumns: ['cid'];
          },
          {
            foreignKeyName: 'Uncatergorized_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: true;
            referencedRelation: 'Request';
            referencedColumns: ['request_id'];
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
      AgeGroupT: 'Baby' | 'Kids' | 'Teenager' | 'Adult' | 'All Ages';
      AnimalNeedT:
        | 'Food'
        | 'Bedding'
        | 'Crates'
        | 'Toys'
        | 'Grooming'
        | 'Bowls & Feeders'
        | 'Health & Wellness'
        | 'Accessories'
        | 'Other';
      AnimalTypeT: 'Dogs' | 'Cats' | 'Small Animals' | 'Birds' | 'Reptiles';
      ElectronicsTypeT:
        | 'Computers/Tablets'
        | 'Phones/Mobile Devices'
        | 'TVs & Monitors'
        | 'Appliances'
        | 'Accessories & Cables'
        | 'Other';
      FurnitureTypeT: 'Seating' | 'Tables' | 'Bedroom' | 'Storage' | 'Outdoor Furniture' | 'Other';
      GenderT: 'Male' | 'Female' | 'Unisex' | 'Other';
      HouseholdGoodsTypeT:
        | 'Kitchen Items'
        | 'Bedding & Linens'
        | 'Cleaning Supplies'
        | 'Small Appliances'
        | 'Storage & Organization'
        | 'Decor & Lighting'
        | 'Other';
      MedicalSuppliesTypeT: 'First Aid' | 'Mobility Aids' | 'OTC Medications/Supplements' | 'Other';
      RequestTypeT:
        | 'Food'
        | 'Clothing'
        | 'Hygiene Products'
        | 'Household Goods'
        | 'Furniture'
        | 'Toys & Games'
        | 'Medical Supplies'
        | 'School & Office Supplies'
        | 'Animal Care Supplies'
        | 'Electronics'
        | 'Sports Equipment'
        | 'Uncategorized';
      SportsEquipmentTypeT:
        | 'Team Sports'
        | 'Winter Sports'
        | 'Fitness Equipment'
        | 'Bikes & Recreation'
        | 'Other';
      StorageRequirementT: 'Fridge' | 'Freezer' | 'Shelf Stable';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      AgeGroupT: ['Baby', 'Kids', 'Teenager', 'Adult', 'All Ages'],
      AnimalNeedT: [
        'Food',
        'Bedding',
        'Crates',
        'Toys',
        'Grooming',
        'Bowls & Feeders',
        'Health & Wellness',
        'Accessories',
        'Other',
      ],
      AnimalTypeT: ['Dogs', 'Cats', 'Small Animals', 'Birds', 'Reptiles'],
      ElectronicsTypeT: [
        'Computers/Tablets',
        'Phones/Mobile Devices',
        'TVs & Monitors',
        'Appliances',
        'Accessories & Cables',
        'Other',
      ],
      FurnitureTypeT: ['Seating', 'Tables', 'Bedroom', 'Storage', 'Outdoor Furniture', 'Other'],
      GenderT: ['Male', 'Female', 'Unisex', 'Other'],
      HouseholdGoodsTypeT: [
        'Kitchen Items',
        'Bedding & Linens',
        'Cleaning Supplies',
        'Small Appliances',
        'Storage & Organization',
        'Decor & Lighting',
        'Other',
      ],
      MedicalSuppliesTypeT: ['First Aid', 'Mobility Aids', 'OTC Medications/Supplements', 'Other'],
      RequestTypeT: [
        'Food',
        'Clothing',
        'Hygiene Products',
        'Household Goods',
        'Furniture',
        'Toys & Games',
        'Medical Supplies',
        'School & Office Supplies',
        'Animal Care Supplies',
        'Electronics',
        'Sports Equipment',
        'Uncategorized',
      ],
      SportsEquipmentTypeT: [
        'Team Sports',
        'Winter Sports',
        'Fitness Equipment',
        'Bikes & Recreation',
        'Other',
      ],
      StorageRequirementT: ['Fridge', 'Freezer', 'Shelf Stable'],
    },
  },
} as const;
