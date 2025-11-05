// supabase/functions/get_charity_needs/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
Deno.serve(async (req) => {
  try {
    // Initialize admin Supabase client (bypasses RLS)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // full access
    );
    // Extract the caller's session
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: 'Missing Authorization header',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: userErr,
    } = await supabaseAdmin.auth.getUser(token);
    if (userErr || !user) {
      return new Response(
        JSON.stringify({
          error: 'Invalid or expired token',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Parse CID from query
    const { cid } = await req.json();
    if (!cid) {
      return new Response(
        JSON.stringify({
          error: 'Missing required parameter: cid',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Define all tables that hold needs
    const needsTables = [
      'AnimalCareSupplies',
      'Clothing',
      'Electronics',
      'Food',
      'Furniture',
      'HouseholdGoods',
      'HygieneProduct',
      'MedicalSupplies',
      'SchoolOfficeSupplies',
      'SportsEquipment',
      'ToysGames',
      'Uncatergorized',
    ];
    // Fetch needs data for each category
    const results = await Promise.all(
      needsTables.map(async (table) => {
        const { data, error } = await supabaseAdmin
          .from(table)
          .select(
            `
            *,
            Request (
              item_name,
              quantitiy,
              quantity_fulfilled,
              notes,
              unit,
              category,
              created_at
            )
          `,
          )
          .eq('cid', cid);
        if (error) {
          console.error(`Error fetching from ${table}:`, error.message);
          return [];
        }
        return (data ?? []).map((item) => ({
          category: table,
          ...item,
        }));
      }),
    );
    const allNeeds = results.flat();
    return new Response(
      JSON.stringify({
        cid,
        needs: allNeeds,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(
      JSON.stringify({
        error: err?.message ?? String(err),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
