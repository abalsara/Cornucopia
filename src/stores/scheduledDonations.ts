import { DonationItem } from '../types/DonationItem/DonationItem.types';
import { ScheduledDonation } from '../types/DonationItem/ScheduledDonation';

/**
 * Internal store for all scheduled donations.
 */
const scheduledDonations: Map<string, ScheduledDonation> = new Map();

/**
 * Retrieve a copy of all scheduled donations.
 */
export const getScheduledDonations = (): ScheduledDonation[] => {
  return Array.from(scheduledDonations.values());
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
  items: DonationItem[],
  scheduledDate: Date,
): void => {
  scheduledDonations.set(hashSchedule(cid, scheduledDate), { cid, scheduledDate, items });
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
