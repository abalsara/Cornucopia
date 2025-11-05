import { Charity } from '../lib/charities';

/**
 * In-memory store of charities.
 */
const charities: Map<string, Charity> = new Map();

/**
 * Retrieve a charity from the in-memory store by its ID.
 *
 * @param {string} cid - The unique identifier of the charity.
 * @returns {Charity | undefined} The matching `Charity` object, or `undefined` if not found.
 */
export const getCharity = (cid: string): Charity | undefined => {
  return charities.get(cid);
};

/**
 * Add or update a charity in the in-memory store.
 *
 * @param {string} cid - The unique identifier of the charity.
 * @param {Charity} charity - The `Charity` object to store.
 * @returns {void}
 */
export const setCharity = (cid: string, charity: Charity): void => {
  charities.set(cid, charity);
};
