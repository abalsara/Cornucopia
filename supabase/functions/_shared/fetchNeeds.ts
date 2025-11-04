import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from 'npm:@supabase/supabase-js@2.76.1';

import { supabase } from '../../../src/lib/supabase.ts';

/**
 * Fetch all charity needs.
 * @param authToken Supabase Auth JWT of the logged-in user
 * @param cid Charity ID
 * @returns Array of charity needs
 */
export async function fetchAllCharityNeeds(cid: string) {
  try {
    const { data, error } = await supabase.functions.invoke('get-all-charity-needs-flat', {
      body: { cid },
    });

    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json();
      console.log('Function returned an error', errorMessage);
    } else if (error instanceof FunctionsRelayError) {
      console.log('Relay error:', error.message);
    } else if (error instanceof FunctionsFetchError) {
      console.log('Fetch error:', error.message);
    }

    // data format: { needs: [...], cid: ... }
    return data.needs ?? [];
  } catch (err) {
    console.error('Error fetching charity needs:', err);
    return [];
  }
}
