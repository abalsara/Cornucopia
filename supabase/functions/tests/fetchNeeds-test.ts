import { assertEquals, assert } from 'jsr:@std/assert@1';

import { fetchAllCharityNeeds } from '../_shared/fetchNeeds.ts';

// Mock fetch globally
const originalFetch = globalThis.fetch;

Deno.test('fetchAllCharityNeeds - successful fetch', async () => {
  globalThis.fetch = () => {
    const mockResponse = {
      cid: 'b44b6e27-1234-4567-890a-abcdef123456',
      needs: [
        {
          category: 'Clothing',
          item_id: 'b44b6e27-1234-4567-890a-abcdef123457',
          created_at: new Date().toISOString(),
          age_group: 'Adult',
          gender: 'Unisex',
          cid: 'b44b6e27-1234-4567-890a-abcdef123456',
          Request: {
            item_name: 'Winter Coats',
            quantitiy: 10,
            quantity_fulfilled: 4,
            unit: 'Ea.',
            notes: 'Adult sizes preferred',
            type: 'Clothing',
            created_at: new Date().toISOString(),
          },
        },
        {
          category: 'Food',
          item_id: 'b44b6e27-1234-4567-890a-abcdef123458',
          storage_reqs: 'Shelf Stable',
          created_at: new Date().toISOString(),
          cid: 'b44b6e27-1234-4567-890a-abcdef123456',
          Request: {
            item_name: 'Canned Vegetables',
            quantitiy: 100,
            quantity_fulfilled: 75,
            unit: 'Ea.',
            notes: 'Low-sodium preferred',
            type: 'Food',
            created_at: new Date().toISOString(),
          },
        },
      ],
    };
    return Promise.resolve(new Response(JSON.stringify(mockResponse), { status: 200 }));
  };

  const result = await fetchAllCharityNeeds('b44b6e27-1234-4567-890a-abcdef123456');

  assertEquals(result.length, 2);
  assertEquals(result[0].category, 'Clothing');
  assertEquals(result[0].Request.item_name, 'Winter Coats');
  assertEquals(result[1].category, 'Food');
  assertEquals(result[1].Request.item_name, 'Canned Vegetables');
  assert(typeof result[0].item_id === 'string');
  assert(typeof result[0].created_at === 'string');
  assert(typeof result[0].Request.created_at === 'string');
  globalThis.fetch = originalFetch;
});

Deno.test('fetchAllCharityNeeds - handles missing authorization header', async () => {
  globalThis.fetch = () =>
    Promise.resolve(
      new Response(JSON.stringify({ error: 'Missing Authorization header' }), { status: 401 }),
    );

  const result = await fetchAllCharityNeeds('test-cid');

  assertEquals(result, []);
  globalThis.fetch = originalFetch;
});

Deno.test('fetchAllCharityNeeds - handles missing cid parameter', async () => {
  globalThis.fetch = () =>
    Promise.resolve(
      new Response(JSON.stringify({ error: 'Missing required parameter: cid' }), { status: 400 }),
    );

  const result = await fetchAllCharityNeeds('');

  assertEquals(result, []);
  globalThis.fetch = originalFetch;
});

Deno.test('fetchAllCharityNeeds - handles missing needs property', async () => {
  const mockResponse = { cid: 'test-cid' };

  globalThis.fetch = () =>
    Promise.resolve(new Response(JSON.stringify(mockResponse), { status: 200 }));

  const result = await fetchAllCharityNeeds('test-cid');

  assertEquals(result, []);
  globalThis.fetch = originalFetch;
});
