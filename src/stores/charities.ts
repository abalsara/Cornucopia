import { Charity } from '../lib/charities';

/**
 * In-memory store of charities. Maps cid to a Charity object
 */
const charitiesStore: Map<string, Charity> = new Map();

export const initCharitiesStore = (charities: Charity[]): void => {
  for (const charity of charities) {
    charitiesStore.set(charity.cid, charity);
  }
};

export const getCharities = (): Charity[] => {
  return Array.from(charitiesStore.values());
};

/**
 * Retrieve a charity from the in-memory store by its ID.
 *
 * @param {string} cid - The unique identifier of the charity.
 * @returns {Charity | undefined} The matching `Charity` object, or `undefined` if not found.
 */
export const getCharity = (cid: string): Charity | undefined => {
  return charitiesStore.get(cid);
};

/**
 * Add or update a charity in the in-memory store.
 *
 * @param {string} cid - The unique identifier of the charity.
 * @param {Charity} charity - The `Charity` object to store.
 * @returns {void}
 */
export const setCharity = (cid: string, charity: Charity): void => {
  charitiesStore.set(cid, charity);
};

export { Charity };
