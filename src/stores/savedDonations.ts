import { DonationItem } from '../types/DonationItem/DonationItem.types';

// store the user's saved donations
let donations: DonationItem[] = [];

/**
 *
 * @returns the user's saved donations
 */
export const getSavedDonations = (): DonationItem[] => {
  return [...donations];
};

/**
 * Adds a DonationItem to the user's saved donations
 * @param item - The DonationItem to store
 */
export const saveDonation = (item: DonationItem): void => {
  donations.push(item);
};

/**
 * Clears the user's saved donations
 */
export const resetSavedDonations = (): void => {
  donations = [];
};
