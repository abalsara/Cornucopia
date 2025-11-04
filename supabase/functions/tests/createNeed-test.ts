import { assertEquals, assertRejects, assert } from 'jsr:@std/assert@1';

import { createNeed } from '../_shared/createNeed.ts';

// Mock fetch globally
const originalFetch = globalThis.fetch;

Deno.test('createNeed - successful creation', async () => {
  globalThis.fetch = () => {
    const mockResponse = {
      message: 'Need created successfully',
      request: {
        cid: '7c7a3c42-1234-4567-890a-abcdef123456',
        item_name: 'Canned Tuna',
        quantitiy: 50,
        quantity_fulfilled: 0,
        unit: 'Can',
        notes: 'No salt added',
        type: 'Food',
        created_at: new Date().toISOString(),
      },
      item: {
        table: 'Food',
        cid: '7c7a3c42-1234-4567-890a-abcdef123456',
        item_name: 'Canned Tuna',
        quantity: 50,
        unit: 'Can',
        storage_reqs: 'Shelf Stable',
        notes: 'No salt added',
        item_id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      },
    };
    return Promise.resolve(new Response(JSON.stringify(mockResponse), { status: 200 }));
  };

  const result = await createNeed(
    'mock-auth-token',
    '7c7a3c42-1234-4567-890a-abcdef123456',
    'Food',
    JSON.parse('{"item_name":"Canned Tuna","quantity":50,"unit":"Can","notes":"No salt added"}'),
  );

  assertEquals(result.message, 'Need created successfully');
  assertEquals(result.request.cid, '7c7a3c42-1234-4567-890a-abcdef123456');
  assertEquals(result.request.item_name, 'Canned Tuna');
  assertEquals(result.item.item_name, 'Canned Tuna');
  assert(typeof result.item.item_id === 'string');
  assert(typeof result.request.created_at === 'string');
  assert(typeof result.item.created_at === 'string');
  globalThis.fetch = originalFetch;
});

Deno.test('createNeed - handles error response', async () => {
  const mockError = { error: 'Invalid request data' };

  globalThis.fetch = () =>
    Promise.resolve(new Response(JSON.stringify(mockError), { status: 400 }));

  await assertRejects(
    () => createNeed('mock-auth-token', 'test-cid', 'Food', JSON.parse('{}')),
    Error,
    'Invalid request data',
  );

  globalThis.fetch = originalFetch;
});
