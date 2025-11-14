import { Admin } from '../lib/admin';

/**
 * Holds the row in the admin table that corresponds to the user
 */
let adminStore: Admin | undefined = undefined;

/**
 * Returns a copy of the currently cached admin, if any.
 *
 * @returns A cloned Admin object, or `undefined` if no charity is stored.
 */
export const getAdmin = (): Admin | undefined => {
  return adminStore ? { ...adminStore } : undefined;
};

/**
 * Updates the cached admin.
 *
 * @param admin - The admin to store in memory as the admin's active charity.
 */
export const setAdmin = (admin?: Admin): void => {
  adminStore = admin;
};
