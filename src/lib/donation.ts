import { fetchAdmin } from './admin';
import {
  fetchAnimalCareSupplies,
  fetchClothing,
  fetchElectronics,
  fetchFood,
  fetchFurniture,
  fetchHouseholdGoods,
  fetchMedicalSupplies,
  fetchSportsEquipment,
  fetchToysGames,
} from './category';
import { fetchNeedsByAdmin } from './needs';
import { supabase } from './supabase';
import { BaseDonationItem, DonationItem } from '../types/DonationItem/DonationItem.types';
import { ScheduledDonation } from '../types/DonationItem/ScheduledDonation';
import { Tables } from '../types/database.types';

export type Donation = Tables<'Donation'>;

type DonationRequestJoin = Donation & { Request: Tables<'Request'> };

type DonationDetails = {
  pid: string;
  scheduledDate: string;
  item: DonationItem;
  fulfilled: boolean;
};

/**
 * Fetches all scheduled donations associated with the currently authenticated donor.
 *
 * This function:
 * 1. Retrieves the current user's pid from Supabase authentication.
 * 2. Queries the `Donation` table (joined with the related `Request` data) for that pid.
 * 3. Groups donation rows by their `scheduled_date` and `cid` to form composite scheduled donations.
 * 4. Converts each grouped entry into a `ScheduledDonation` object containing metadata
 *    and a list of associated `DonationItem` entries.
 *
 * The resulting `ScheduledDonation[]` provides a structured view of the donor's scheduled donations,
 * consolidating all items scheduled for the same date and charity.
 *
 * @returns {Promise<ScheduledDonation[]>} A list of grouped and structured scheduled donations.
 *
 * @throws {Error} Throws if the user is not authenticated or if the database query fails.
 */
export const fetchDonorScheduledDonations = async (): Promise<ScheduledDonation[]> => {
  const userResponse = await supabase.auth.getUser();
  if (!userResponse.data.user) throw new Error('user is undefined');
  const pid = userResponse.data.user.id;

  const { data, error } = await supabase.from('Donation').select(`*, Request(*)`).eq('pid', pid);
  if (error) throw error;

  const join: DonationRequestJoin[] = data;

  const groups = new Map<string, DonationItem[]>();
  for (const row of join) {
    const key = `${row.scheduled_date}?${row.cid}`;

    const category = row.Request.category;
    const getSubtypes = async () => {
      switch (category) {
        case 'Animal Care Supplies': {
          const data = await fetchAnimalCareSupplies(row.item_id);
          return { animal: data.animal, type: data.type };
        }
        case 'Clothing': {
          const data = await fetchClothing(row.item_id);
          return { ageGroup: data.age_group, gender: data.gender };
        }
        case 'Electronics': {
          const data = await fetchElectronics(row.item_id);
          return { type: data.type };
        }
        case 'Food': {
          const data = await fetchFood(row.item_id);
          return { storageRequirement: data.storage_reqs };
        }
        case 'Household Goods': {
          const data = await fetchHouseholdGoods(row.item_id);
          return { type: data.type };
        }
        case 'Medical Supplies': {
          const data = await fetchMedicalSupplies(row.item_id);
          return { type: data.type };
        }
        case 'Sports Equipment': {
          const data = await fetchSportsEquipment(row.item_id);
          return { type: data.type };
        }
        case 'Toys & Games': {
          const data = await fetchToysGames(row.item_id);
          return { ageGroup: data.age_group };
        }
        case 'Furniture': {
          const data = await fetchFurniture(row.item_id);
          return { type: data.type };
        }
        default:
          return {};
      }
    };

    const base: BaseDonationItem = {
      itemName: row.Request.item_name,
      notes: row.Request.notes ?? '',
      quantity: row.quantity_comitted,
      unit: row.Request.unit,
      category: row.Request.category,
      item_id: row.item_id,
      cid: row.cid,
      priority: row.Request.priority,
      donationId: row.donation_id,
      fulfilled: row.fulfilled,
    };
    const subtypes = await getSubtypes();
    const curr: DonationItem = { ...base, ...subtypes };
    if (!groups.get(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(curr);
  }

  const scheduledDonations: ScheduledDonation[] = [];
  for (const entry of groups.entries()) {
    const [key, items] = entry;
    const [date, cid] = key.split('?');
    const scheduledDate = new Date(date);
    scheduledDonations.push({
      cid,
      pid,
      scheduledDate,
      items,
    });
  }

  return scheduledDonations;
};

/**
 * Deletes all donation entries for the currently authenticated donor
 * that match the specified scheduled date.
 *
 * This operation removes *all* donation items scheduled for that date, effectively
 * canceling the donor's scheduled donation for that day.
 *
 * @param {Date} date - The scheduled date whose donation entries should be deleted.
 * @returns {Promise<void>} Resolves when the delete operation completes.
 *
 * @throws {Error} Throws if the user is not authenticated or if the database delete fails.
 */
export const deleteDonationByDate = async (date: Date): Promise<void> => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error('user is undefined');
  const pid = data.user.id;
  const { error } = await supabase
    .from('Donation')
    .delete()
    .eq('pid', pid)
    .eq('scheduled_date', date.toJSON());
  if (error) throw error;
};

/**
 * Fetches all donations and the admin's needs, then merges them into a list
 * of scheduled donations
 *
 * @returns {Promise<ScheduledDonation[]>} A list of scheduled donation groups.
 * @throws {Error} If the user ID cannot be retrieved.
 */
export const getCharityScheduledDonationsByAdmin = async (): Promise<ScheduledDonation[]> => {
  const admin = await fetchAdmin();
  if (!admin) throw new Error('User is not a charity admin');
  if (!admin.cid) return [];

  const donations = await fetchDonationsByCharity(admin.cid);
  const adminNeeds = await fetchNeedsByAdmin();

  return groupDonations(donations, adminNeeds.needs, adminNeeds.cid ?? 'null');
};

/**
 * Fetches all donation records from the database
 * where cid column matches the charity.
 *
 * @param cid - The uuid of the charity.
 * @returns {Promise<Donation[]>} A list of all donations.
 * @throws {PostgrestError} If Supabase query fails.
 */
export const fetchDonationsByCharity = async (cid: string): Promise<Donation[]> => {
  const { data, error } = await supabase.from('Donation').select().eq('cid', cid);
  if (error) throw error;

  const donations: Donation[] = data;
  return donations;
};

/**
 * Updates all donation items within a scheduled donation as fulfilled or not
 * by performing an UPSERT operation.
 *
 * @param {ScheduledDonation} scheduledDonation - The donation group to update.
 * @returns {Promise<void>} Resolves when all updates are committed.
 * @throws {Error} If any item is missing its donationId.
 * @throws {PostgrestError} If the database update fails.
 */
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

/**
 * Converts raw donation records and needs into grouped scheduled donation objects.
 * A scheduled donation groups all DonationItems that share the same pid
 * and scheduled date.
 *
 * @param {Donation[]} donations - Raw donation rows from the database.
 * @param {DonationItem[]} needs - Need items associated with the admin’s charity.
 * @param {string} cid - The charity ID.
 * @returns {ScheduledDonation[]} A list of grouped scheduled donations.
 */
const groupDonations = (
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

      const key = hashDonationKey(donation.scheduled_date, donation.pid);

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

/**
 * Generates a unique hash for grouping donation items based on
 * scheduled date and pid.
 *
 * @param {string} scheduledDate - The scheduled pickup date.
 * @param {string} uid - The unique donor ID.
 * @returns {string} A stable composite hash key.
 */
const hashDonationKey = (scheduledDate: string, uid: string): string => {
  return `${scheduledDate}?${uid}`;
};
