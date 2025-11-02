import { DonationItem } from '../types/DonationItem/DonationItem.types';

/**
 * Store the user's saved donations for a single charity during the schedule a donation user flow.
 * Maps DonationItem.name to the corresponding DonationItem.
 */
let donations: Map<string, DonationItem> = new Map();

/**
 * @returns the user's saved donations
 */
export const getSavedDonations = (): DonationItem[] => {
  return Array.from(donations.values());
};

/**
 * Adds a DonationItem to the user's saved donations
 * @param item - The DonationItem to store
 */
export const saveDonation = (item: DonationItem): void => {
  donations.set(item.itemName, item);
};

/**
 * Clears the user's saved donations
 */
export const resetSavedDonations = (): void => {
  donations = new Map();
};
