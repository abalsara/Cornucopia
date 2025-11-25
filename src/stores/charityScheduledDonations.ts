import { getCharityScheduledDonationsByAdmin } from '../lib/donation';
import { ScheduledDonation } from '../types/DonationItem/ScheduledDonation';

const charityScheduledDonationsStore: Map<string, ScheduledDonation> = new Map();

/**
 * Retrieves a single scheduled donation for a given date and user id.
 * Throws an error if the entry does not exist in the store.
 *
 * @param {Date} date - The scheduled donation date.
 * @param {string} pid - The user ID associated with the donation.
 * @returns {ScheduledDonation} The matching scheduled donation record.
 * @throws {Error} If the scheduled donation cannot be found in the store.
 */
export const getCharityScheduledDonation = (date: Date, pid: string): ScheduledDonation => {
  const scheduledDonation = charityScheduledDonationsStore.get(hash(date, pid));
  if (!scheduledDonation) throw new Error(`scheduled donation is undefined`);

  return scheduledDonation;
};

/**
 * Retrieves all scheduled donations currently stored in memory.
 *
 * @returns {ScheduledDonation[]} An array of all stored scheduled donation entries.
 */
export const getAllCharityScheduledDonations = (): ScheduledDonation[] => {
  return Array.from(charityScheduledDonationsStore.values());
};

/**
 * Initializes (or reinitializes) the in-memory scheduled donations store by
 * fetching all scheduled donations for the charity administered by the
 * current user. Clears any previously stored values before repopulating.
 *
 * @returns {Promise<void>} Resolves once the store has been completely refreshed.
 * @throws {Error} If fetching scheduled donations fails.
 */
export const loadScheduledDonations = async (): Promise<void> => {
  charityScheduledDonationsStore.clear();
  const donations = await getCharityScheduledDonationsByAdmin();
  for (const donation of donations) {
    charityScheduledDonationsStore.set(hash(donation.scheduledDate, donation.pid), donation);
  }
};

/**
 * Creates a unique key for a scheduled donation by combining the date and
 * user ID. Used internally for indexing store entries.
 *
 * @param {Date} date - The scheduled date.
 * @param {string} pid - The user ID.
 * @returns {string} A unique hash string representing the donation entry.
 */
const hash = (date: Date, pid: string): string => {
  return `${date.getTime()}?${pid}`;
};
