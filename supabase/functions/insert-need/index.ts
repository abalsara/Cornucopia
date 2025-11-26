// supabase/functions/create_need/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { randomUUID } from 'node:crypto';
const tableHandlers = {
  'Animal Care Supplies': (body, cid, item_id) => ({
    tableName: 'AnimalCareSupplies',
    data: {
      cid,
      animal: body.animal ?? 'Dogs',
      type: body.type ?? 'Other',
      item_id,
    },
  }),
  Clothing: (body, cid, item_id) => ({
    tableName: 'Clothing',
    data: {
      cid,
      gender: body.gender ?? 'Unisex',
      age_group: body.age_group ?? 'All Ages',
      item_id,
    },
  }),
  Electronics: (body, cid, item_id) => ({
    tableName: 'Electronics',
    data: {
      cid,
      type: body.type ?? 'Other',
      item_id,
    },
  }),
  Food: (body, cid, item_id) => ({
    tableName: 'Food',
    data: {
      cid,
      storage_reqs: body.storage_reqs ?? 'Shelf Stable',
      item_id,
    },
  }),
  Furniture: (body, cid, item_id) => ({
    tableName: 'Furniture',
    data: {
      cid,
      type: body.type ?? 'Other',
      item_id,
    },
  }),
  'Household Goods': (body, cid, item_id) => ({
    tableName: 'HouseholdGoods',
    data: {
      cid,
      type: body.type ?? 'Other',
      item_id,
    },
  }),
  'Hygiene Products': (body, cid, item_id) => ({
    tableName: 'HygieneProducts',
    data: {
      cid,
      item_id,
    },
  }),
  'Medical Supplies': (body, cid, item_id) => ({
    tableName: 'MedicalSupplies',
    data: {
      cid,
      type: body.type ?? 'Other',
      item_id,
    },
  }),
  'School & Office Supplies': (body, cid, item_id) => ({
    tableName: 'SchoolOfficeSupplies',
    data: {
      cid,
      item_id,
    },
  }),
  'Sports Equipment': (body, cid, item_id) => ({
    tableName: 'SportsEquipment',
    data: {
      cid,
      type: body.type ?? 'Other',
      age_group: body.age_group ?? 'All Ages',
      item_id,
    },
  }),
  'Toys & Games': (body, cid, item_id) => ({
    tableName: 'ToysGames',
    data: {
      cid,
      age_group: body.age_group ?? 'All Ages',
      item_id,
    },
  }),
  Uncategorized: (body, cid, item_id) => ({
    tableName: 'Uncategorized',
    data: {
      cid,
      item_id,
    },
  }),
};
Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({
          error: 'Method not allowed. Use POST.',
        }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    // Validate auth token
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
    // Parse body
    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(
        JSON.stringify({
          error: 'Missing or invalid JSON body',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    const { cid, category, item_name } = body;
    if (!cid || !category || !item_name) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: 'cid', 'category', or 'item_name'",
        }),
        {
          status: 400,
        },
      );
    }
    const validCategories = Object.keys(tableHandlers);
    if (!validCategories.includes(category)) {
      return new Response(
        JSON.stringify({
          error: `Invalid category '${category}'. Must be one of: ${validCategories.join(', ')}`,
        }),
        {
          status: 400,
        },
      );
    }
    // Admin verification
    const { data: adminRecord, error: adminErr } = await supabaseAdmin
      .from('admin')
      .select('cid')
      .eq('uid', user.id)
      .eq('cid', cid)
      .maybeSingle();
    if (adminErr) {
      console.error('Admin check failed:', adminErr);
      return new Response(
        JSON.stringify({
          error: 'Admin verification failed',
        }),
        {
          status: 500,
        },
      );
    }
    if (!adminRecord) {
      return new Response(
        JSON.stringify({
          error: 'Forbidden: not an admin for this charity',
        }),
        {
          status: 403,
        },
      );
    }
    const item_id = randomUUID();
    // Insert into Request table
    const { data: requestData, error: requestErr } = await supabaseAdmin
      .from('Request')
      .insert({
        cid,
        item_name,
        quantity: body.quantity ?? 1,
        quantity_fulfilled: 0,
        unit: body.unit ?? 'Ea.',
        notes: body.notes ?? 'No additional notes.',
        category: body.category ?? 'Uncategorized',
        request_id: item_id,
        priority: body.priority,
      })
      .select()
      .single();
    if (requestErr) {
      console.error('Error inserting into Request:', requestErr);
      return new Response(
        JSON.stringify({
          error: 'Failed to insert into Request table',
          details: requestErr.message,
        }),
        {
          status: 500,
        },
      );
    }
    // Insert into the specific item table
    const handler = tableHandlers[category];
    const { tableName, data: insertRow } = handler(body, cid, item_id);
    const { data: itemData, error: itemErr } = await supabaseAdmin
      .from(tableName)
      .insert(insertRow)
      .select()
      .single();
    if (itemErr) {
      console.error(`Error inserting into ${tableName}:`, itemErr);
      return new Response(
        JSON.stringify({
          error: `Failed to insert into ${tableName}`,
          details: itemErr.message,
        }),
        {
          status: 500,
        },
      );
    }
    return new Response(
      JSON.stringify({
        message: 'Need created successfully',
        request: requestData,
        item: {
          category,
          ...itemData,
        },
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
