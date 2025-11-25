// supabase/functions/create_need/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
const tableHandlers = {
  AnimalCareSupplies: (body, cid) => ({
    cid,
    animal: body.animal ?? 'Dogs',
    type: body.type ?? 'Other',
    notes: body.notes ?? null,
    quantity: body.quantity ?? 1,
    unit: body.unit ?? 'Ea.',
    item_name: body.item_name,
  }),
  Clothing: (body, cid) => ({
    cid,
    item_name: body.item_name,
    size: body.size ?? 'Unknown',
    gender: body.gender ?? 'Unisex',
    age_group: body.age_group ?? 'All Ages',
    season: body.season ?? 'All',
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
  Electronics: (body, cid) => ({
    cid,
    item_name: body.item_name,
    type: body.type ?? 'Other',
    condition: body.condition ?? 'Used',
    power_type: body.power_type ?? 'Unknown',
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
  Food: (body, cid) => ({
    cid,
    item_name: body.item_name,
    quantity: body.quantity ?? 1,
    unit: body.unit ?? 'Ea.',
    storage_reqs: body.storage_reqs ?? 'Shelf Stable',
    notes: body.notes ?? null,
  }),
  Furniture: (body, cid) => ({
    cid,
    item_name: body.item_name,
    type: body.type ?? 'Other',
    quantity: body.quantity ?? 1,
    condition: body.condition ?? 'Used',
    notes: body.notes ?? null,
  }),
  HouseholdGoods: (body, cid) => ({
    cid,
    item_name: body.item_name,
    type: body.type ?? 'Other',
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
  HygieneProduct: (body, cid) => ({
    cid,
    item_name: body.item_name,
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
  MedicalSupplies: (body, cid) => ({
    cid,
    item_name: body.item_name,
    type: body.type ?? 'Other',
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
  SchoolOfficeSupplies: (body, cid) => ({
    cid,
    item_name: body.item_name,
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
  SportsEquipment: (body, cid) => ({
    cid,
    item_name: body.item_name,
    type: body.type ?? 'Other',
    age_group: body.age_group ?? 'All Ages',
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
  ToysGames: (body, cid) => ({
    cid,
    item_name: body.item_name,
    age_group: body.age_group ?? 'All Ages',
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
  Uncatergorized: (body, cid) => ({
    cid,
    item_name: body.item_name,
    quantity: body.quantity ?? 1,
    notes: body.notes ?? null,
  }),
};
Deno.serve(async (req) => {
  try {
    // Validate method
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
    // Initialize Supabase client with Service Role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    // Validate authorization header
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
    // Parse query params
    const url = new URL(req.url);
    const cid = url.searchParams.get('cid');
    const table = url.searchParams.get('table');
    if (!cid || !table) {
      return new Response(
        JSON.stringify({
          error: 'Missing required params: cid, table',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Whitelist valid tables
    const validTables = [
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
    if (!validTables.includes(table)) {
      return new Response(
        JSON.stringify({
          error: `Invalid table: ${table}`,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Verify admin permissions
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
          headers: {
            'Content-Type': 'application/json',
          },
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
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Parse body
    const body = await req.json().catch(() => null);
    if (!body || !body.item_name) {
      return new Response(
        JSON.stringify({
          error: 'Missing request body or item_name',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Create new Request record
    const { data: requestData, error: requestErr } = await supabaseAdmin
      .from('Request')
      .insert({
        cid,
        item_name: body.item_name,
        quantity: body.quantity ?? 1,
        quantity_fulfilled: 0,
        unit: body.unit ?? 'Ea.',
        notes: body.notes ?? 'No additional notes.',
        type: body.type ?? 'Uncategorized',
      })
      .select()
      .single();
    if (requestErr) {
      console.error('Error inserting into Request:', requestErr);
      return new Response(
        JSON.stringify({
          error: 'Failed to insert into Request',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Insert into the corresponding item table
    const handler = tableHandlers[table];
    if (!handler) {
      return new Response(
        JSON.stringify({
          error: `Invalid table: ${table}`,
        }),
        {
          status: 400,
        },
      );
    }
    const insertRow = handler(body, cid);
    const { data: itemData, error: itemErr } = await supabaseAdmin
      .from(table)
      .insert(insertRow)
      .select()
      .single();
    if (itemErr) {
      console.error(`Error inserting into ${table}:`, itemErr);
      return new Response(
        JSON.stringify({
          error: `Failed to insert into ${table}`,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Combine response
    return new Response(
      JSON.stringify({
        message: 'Need created successfully',
        request: requestData,
        item: {
          table,
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
