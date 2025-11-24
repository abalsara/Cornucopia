import { fetchNeedsByAdmin, getCharityNeeds } from './needs';
import { supabase } from './supabase';
import { DonationItem } from '../types/DonationItem/DonationItem.types';
import { ScheduledDonation } from '../types/DonationItem/ScheduledDonation';
import { Tables } from '../types/database.types';

export type Donation = Tables<'Donation'>;

export const getScheduledDonations = async (): Promise<ScheduledDonation[]> => {
  const donations = await fetchDonations();
  const adminNeeds = await fetchNeedsByAdmin();
  const user = await supabase.auth.getUser();
  const uid = user.data.user?.id;
  if (!uid) throw new Error('user id is undefined');

  console.log(`donations length: ${donations.length}`);
  return donationsToScheduledDonations(donations, adminNeeds.needs, uid, adminNeeds.cid ?? '1');
};

export const fetchDonations = async (): Promise<Donation[]> => {
  const { data, error } = await supabase.from('Donation').select();
  if (error) throw error;

  const donations: Donation[] = data;
  return donations;
};

// returns a new array of items that exist in both parameters
const donationsToScheduledDonations = (
  donations: Donation[],
  needs: DonationItem[],
  pid: string,
  cid: string,
): ScheduledDonation[] => {
  const items: ScheduledDonation[] = [];
  const donationMap: Map<string, DonationItem[]> = new Map();
  for (const donation of donations) {
    const need = needs.find((need) => need.itemId === donation.item_id);
    if (need) {
      const merge = structuredClone(need);
      console.log('record:', merge);
      merge.quantity = donation.quantitiy_comitted ?? 1;
      merge.pid = donation.pid ?? '';

      const key = hashDonation(donation.scheduled_date ?? '', merge.pid);

      if (!donationMap.get(key)) donationMap.set(key, []);
      const curr = donationMap.get(key);
      curr!.push(merge);
    }
  }

  for (const entry of donationMap) {
    console.log('entry key:', entry[0]);
    const [time] = entry[0].split('?');
    console.log('time:', time);
    const scheduledDate = new Date(time);
    items.push({
      pid,
      cid,
      scheduledDate,
      items: entry[1],
    });
  }
  return items;
};

const hashDonation = (scheduledDate: string, uid: string): string => {
  return `${scheduledDate}?${uid}`;
};
