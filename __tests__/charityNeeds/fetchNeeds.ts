import { fetchAllCharityNeeds } from '@/src/lib/needs';
import { supabase } from '@/src/lib/supabase'; // adjust import path if needed

jest.mock('@/src/lib/supabase', () => ({
  supabase: {
    functions: {
      invoke: jest.fn(),
    },
  },
}));

describe('fetchAllCharityNeeds', () => {
  const mockInvoke = supabase.functions.invoke as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns charity needs when fetch is successful', async () => {
    const mockNeeds = [
      { id: '1', category: 'Clothing', item: 'Jackets' },
      { id: '2', category: 'Food', item: 'Canned Beans' },
    ];

    mockInvoke.mockResolvedValueOnce({
      data: { needs: mockNeeds },
      error: null,
    });

    const result = await fetchAllCharityNeeds('test-cid');

    expect(mockInvoke).toHaveBeenCalledWith('get-all-charity-needs-flat', {
      body: { cid: 'test-cid' },
    });
    expect(result).toEqual(mockNeeds);
  });

  it('returns an empty array when Supabase returns an error', async () => {
    mockInvoke.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid request' },
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await fetchAllCharityNeeds('bad-cid');

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching charity needs:',
      expect.objectContaining({ message: 'Invalid request' }),
    );
    consoleSpy.mockRestore();
  });

  it('returns an empty array if no needs are present in data', async () => {
    mockInvoke.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    const result = await fetchAllCharityNeeds('test-cid');
    expect(result).toEqual([]);
  });
});
