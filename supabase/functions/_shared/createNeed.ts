const SUPABASE_FUNCTION_URL = 'https://ifawtxdthbiyhmpzjuwf.supabase.co/functions/v1/insert-need';

/**
 * Creates a new need entry in the specified table for the given charity ID (cid).
 * @param authToken - The authorization token for the request.
 * @param cid - The charity ID for which the need is being created.
 * @param table - The table in which to create the need.
 * @param body - The body of the request containing need details.
 * @returns The response data from the Supabase function.
 * @throws An error if the request fails.
 */
export async function createNeed(authToken: string, cid: string, table: string, body: JSON) {
  const response = await fetch(`${SUPABASE_FUNCTION_URL}?cid=${cid}&table=${table}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }

  const data = await response.json();
  return data;
}
