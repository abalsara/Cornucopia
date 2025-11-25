import { fetchNeedsByAdmin } from './needs';
import { supabase } from './supabase';
import { DonationItem } from '../types/DonationItem/DonationItem.types';
import { ScheduledDonation } from '../types/DonationItem/ScheduledDonation';
import { Tables } from '../types/database.types';

export type Donation = Tables<'Donation'>;

type DonationDetails = {
  pid: string;
  scheduledDate: string;
  item: DonationItem;
  fulfilled: boolean;
};

export const getCharityScheduledDonationsByAdmin = async (): Promise<ScheduledDonation[]> => {
  const donations = await fetchDonations();
  const adminNeeds = await fetchNeedsByAdmin();
  const user = await supabase.auth.getUser();
  const uid = user.data.user?.id;
  if (!uid) throw new Error('user id is undefined');

  return donationsToScheduledDonations(donations, adminNeeds.needs, adminNeeds.cid ?? 'null');
};

export const fetchDonations = async (): Promise<Donation[]> => {
  const { data, error } = await supabase.from('Donation').select();
  if (error) throw error;

  const donations: Donation[] = data;
  return donations;
};

export const updateDonationsAsFulfilled = async (
  scheduledDonation: ScheduledDonation,
): Promise<void> => {
  const { pid, cid, items, scheduledDate } = scheduledDonation;
  const updated = [];
  for (const item of items) {
    if (!item.donationId) throw new Error('donationId is undefined');
    updated.push({
      donation_id: item.donationId,
      item_id: item.item_id,
      pid,
      cid,
      quantity_comitted: item.quantity,
      scheduled_date: scheduledDate,
      fulfilled: item.fulfilled === true,
    });
  }

  const { error } = await supabase.from('Donation').upsert(updated);
  if (error) throw error;
};

// returns a new array of items that exist in both parameters
const donationsToScheduledDonations = (
  donations: Donation[],
  needs: DonationItem[],
  cid: string,
): ScheduledDonation[] => {
  const items: ScheduledDonation[] = [];
  const donationMap: Map<string, DonationDetails[]> = new Map();
  for (const donation of donations) {
    const need = needs.find((need) => need.item_id === donation.item_id);
    if (need) {
      const merge = structuredClone(need);
      merge.quantity = donation.quantity_comitted;
      merge.donationId = donation.donation_id;
      merge.fulfilled = donation.fulfilled;

      const key = hashDonation(donation.scheduled_date, donation.pid);

      if (!donationMap.get(key)) donationMap.set(key, []);
      const curr = donationMap.get(key);
      curr!.push({
        pid: donation.pid,
        scheduledDate: donation.scheduled_date,
        item: merge,
        fulfilled: donation.fulfilled,
      });
    }
  }

  for (const entry of donationMap) {
    const [time] = entry[0].split('?');
    const scheduledDate = new Date(time);
    const donationDetails = entry[1];

    const groupedDonationItems: DonationItem[] = [];
    for (const details of donationDetails) {
      groupedDonationItems.push(details.item);
    }
    items.push({
      pid: donationDetails[0].pid,
      cid,
      scheduledDate,
      items: groupedDonationItems,
    });
  }
  return items;
};

const hashDonation = (scheduledDate: string, uid: string): string => {
  return `${scheduledDate}?${uid}`;
};
