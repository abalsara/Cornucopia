import { supabase } from './supabase';

/**
 * Takes in all of a Donations information to store it in the database.
 * @param uid user id
 * @param itemId request_id/item_id
 * @param cid charity id
 * @param quantity quanitity promised
 * @param scheduledDate date proimsed at
 * @returns JSON object with { success: true, donation: data } or null if error
 */
export async function createDonation(
  uid: string,
  itemId: string,
  cid: string,
  quantity: number,
  scheduledDate: string,
) {
  const payload = {
    pid: uid,
    item_id: itemId,
    cid,
    quantity_comitted: quantity,
    scheduled_date: new Date(scheduledDate),
  };

  const { data, error } = await supabase.functions.invoke('create-donation', {
    method: 'POST',
    body: payload,
  });

  if (error) {
    console.error('Error creating donation:', error);
    return null;
  }

  console.log('Donation created:', data);
  return data;
}
