import { fetchAdmin } from '../lib/admin';
import { Availability, fetchAvailability, insertAvailability } from '../lib/availability';

type AvailabilityStore =
  | {
      cid: string | null;
      availability: Availability[];
    }
  | undefined;

let availabilityStore: AvailabilityStore = undefined;

/**
 * Initializes the in-memory availability store by fetching all availability
 * records for the given charity (`cid`). Any existing stored data is replaced.

 * @param {string} cid - The charity ID whose availability should be loaded.
 * @returns {Promise<void>} Resolves when the store is fully populated.
 * @throws {Error} If fetching availability data fails.
 */
export const initAvailabilityStore = async (): Promise<void> => {
  try {
    const admin = await fetchAdmin();
    if (admin === undefined) {
      availabilityStore = undefined;
      return;
    }

    const availability = await fetchAvailability();
    availabilityStore = { cid: admin.cid, availability };
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves a copy of the availability data stored in memory.
 *
 * @returns {Availability[]} A copy of the stored availability entries.
 */
export const getAvailabilityStore = (): AvailabilityStore => {
  return availabilityStore ? { ...availabilityStore } : undefined;
};

/**
 * Adds a new availability entry for the specified charity (`cid`) by inserting
 * it into the database, then refreshes the in-memory store to ensure the local
 * data stays in sync with the backend.
 *
 * @param {string} cid - The charity ID associated with the availability.
 * @param {number} day_of_week - The day of the week (0–6) the availability applies to.
 * @param {Date} open_time - Opening time as a JavaScript Date.
 * @param {Date} close_time - Closing time as a JavaScript Date.
 * @returns {Promise<void>} Resolves once the insert and refresh operations complete.
 * @throws {Error} If insertion or store refresh fails.
 */
export const addAvailability = async (
  cid: string,
  day_of_week: number,
  open_time: Date,
  close_time: Date,
): Promise<void> => {
  try {
    await insertAvailability(cid, day_of_week, open_time, close_time);
    await initAvailabilityStore();
  } catch (error) {
    throw error;
  }
};
