// supabase/functions/get_charity_needs/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
Deno.serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: {
            Authorization: req.headers.get('Authorization'),
          },
        },
      },
    );
    const url = new URL(req.url);
    const cid = url.searchParams.get('cid');
    if (!cid) {
      return new Response(
        JSON.stringify({
          error: 'Missing required parameter: cid',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 400,
        },
      );
    }
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
    const results = await Promise.all(
      needsTables.map(async (table) => {
        const { data, error } = await supabase
          .from(table)
          .select(
            `
            *,
            Request (
              item_name,
              quantity,
              quantity_fulfilled,
              notes,
              unit,
              type,
              created_at
            )
          `,
          )
          .eq('cid', cid);
        if (error) {
          console.error(`Error fetching from ${table}:`, error.message);
          return {
            table,
            error: error.message,
            data: [],
          };
        }
        return {
          table,
          data,
        };
      }),
    );
    return new Response(
      JSON.stringify({
        cid,
        results,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(
      JSON.stringify({
        message: err?.message ?? String(err),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 500,
      },
    );
  }
});
