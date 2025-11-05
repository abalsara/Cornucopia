import { createNeed } from '@/src/lib/needs';
import { supabase } from '@/src/lib/supabase';

jest.mock('@/src/lib/supabase', () => ({
  supabase: {
    functions: {
      invoke: jest.fn(),
    },
  },
}));

describe('createNeed', () => {
  const mockInvoke = supabase.functions.invoke as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns success response when need is created successfully', async () => {
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

    mockInvoke.mockResolvedValueOnce({
      data: mockResponse,
      error: null,
    });

    const result = await createNeed(
      '7c7a3c42-1234-4567-890a-abcdef123456',
      'Food',
      JSON.parse('{"item_name":"Canned Tuna","quantity":50,"unit":"Can","notes":"No salt added"}'),
    );

    expect(mockInvoke).toHaveBeenCalledWith('insert-need', {
      body: {
        cid: '7c7a3c42-1234-4567-890a-abcdef123456',
        table: 'Food',
        body: JSON.parse(
          '{"item_name":"Canned Tuna","quantity":50,"unit":"Can","notes":"No salt added"}',
        ),
      },
      method: 'POST',
    });
    expect(result.message).toBe('Need created successfully');
    expect(result.request.item_name).toBe('Canned Tuna');
    expect(result.item.item_name).toBe('Canned Tuna');
    expect(typeof result.item.item_id).toBe('string');
    expect(typeof result.request.created_at).toBe('string');
  });

  it('handles error when Supabase returns an error', async () => {
    mockInvoke.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid request data' },
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await createNeed('test-cid', 'Food', JSON.parse('{}'));

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error inserting charity need:',
      expect.objectContaining({ message: 'Invalid request data' }),
    );
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  it('handles missing authorization', async () => {
    mockInvoke.mockResolvedValueOnce({
      data: null,
      error: { message: 'Missing Authorization header' },
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await createNeed('test-cid', 'Food', JSON.parse('{"item_name":"Test"}'));

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error inserting charity need:',
      expect.objectContaining({ message: 'Missing Authorization header' }),
    );
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });

  it('handles server error', async () => {
    mockInvoke.mockResolvedValueOnce({
      data: null,
      error: { message: 'Database connection failed' },
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await createNeed('test-cid', 'Food', JSON.parse('{"item_name":"Test"}'));

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error inserting charity need:',
      expect.objectContaining({ message: 'Database connection failed' }),
    );
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
});
