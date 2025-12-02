import { fetchDonorScheduledDonations } from '../lib/donation';
import { DonationItem } from '../types/DonationItem/DonationItem.types';
import { ScheduledDonation } from '../types/DonationItem/ScheduledDonation';

/**
 * In-memory cache of all scheduled donations for the current donor.
 *
 * The map is keyed by a hashed combination of the donation's `cid`
 * and `scheduledDate`.
 */
const scheduledDonations: Map<string, ScheduledDonation> = new Map();

/**
 * Loads all scheduled donations for the current donor and stores them
 * in the in-memory `scheduledDonations` map.
 *
 * @returns {Promise<void>} Resolves when all scheduled donations have been loaded.
 *
 * @throws {Error} Propagates any error thrown by `fetchDonorScheduledDonations()`.
 */
export const loadScheduledDonations = async (): Promise<void> => {
  scheduledDonations.clear();
  const donations = await fetchDonorScheduledDonations();
  for (const donation of donations) {
    const key = hashSchedule(donation.cid, donation.scheduledDate);
    scheduledDonations.set(key, donation);
  }
};

/**
 * Retrieve a copy of all scheduled donations.
 */
export const getScheduledDonations = (): ScheduledDonation[] => {
  return Array.from(scheduledDonations.values());
};

export const getScheduledDonation = (cid: string, date: Date): ScheduledDonation | undefined => {
  return scheduledDonations.get(hashSchedule(cid, date));
};

/**
 * Remove a scheduled donation for a given charity and date.
 *
 * @param {string} cid - The unique ID of the charity.
 * @param {Date} date - The scheduled donation date to remove.
 */
export const removeScheduledDonation = (cid: string, date: Date): void => {
  scheduledDonations.delete(hashSchedule(cid, date));
};

/**
 * Add or update a scheduled donation for a specific charity and date.
 *
 * @param {string} cid - The unique ID of the charity.
 * @param {DonationItem[]} items - The items to be donated.
 * @param {Date} scheduledDate - The date the donation is scheduled for.
 */
export const setScheduledDonation = (
  cid: string,
  pid: string,
  items: DonationItem[],
  scheduledDate: Date,
): void => {
  scheduledDonations.set(hashSchedule(cid, scheduledDate), { cid, pid, scheduledDate, items });
};

/**
 * Generate a unique hash key for a charity and date combination.
 *
 * @private
 * @param {string} cid - The unique ID of the charity.
 * @param {Date} date - The date used for generating the key.
 * @returns {string} A unique hash string combining charity ID and timestamp.
 */
const hashSchedule = (cid: string, date: Date): string => {
  return `${cid}:${date.getTime()}`;
};
