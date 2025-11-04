const NEEDS_ENDPOINT =
  'https://ifawtxdthbiyhmpzjuwf.supabase.co/functions/v1/get-all-charity-needs-flat';

/**
 * Fetch all charity needs.
 * @param authToken Supabase Auth JWT of the logged-in user
 * @param cid Charity ID
 * @returns Array of charity needs
 */
export async function fetchAllCharityNeeds(authToken: string, cid: string) {
  try {
    const response = await fetch(`${NEEDS_ENDPOINT}?cid=${cid}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Failed to fetch charity needs');
    }

    const data = await response.json();
    // data format: { needs: [...], cid: ... }
    return data.needs ?? [];
  } catch (err) {
    console.error('Error fetching charity needs:', err);
    return [];
  }
}
