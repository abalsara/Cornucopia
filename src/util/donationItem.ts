import { DonationItem } from '../types/DonationItem/DonationItem.types';
import { ScheduledDonation } from '../types/DonationItem/ScheduledDonation';

/**
 * returns a description of a given DoantionItem for use on a DonationCard component
 */
export const getDonationCardSubtitle = (item: DonationItem): string => {
  const notes = item.notes;
  switch (item.category) {
    case 'Animal Care Supplies':
      return `${notes}\n${item.animal} — ${item.type}`;
    case 'Clothing':
      return `${notes}\n${item.ageGroup} — ${item.gender}`;
    case 'Electronics':
      return `${notes}\n${item.type}`;
    case 'Food':
      return `${notes}\nStorage: ${item.storageRequirement}`;
    case 'Furniture':
      return `${notes}\n${item.type}`;
    case 'Household Goods':
      return `${notes}\n${item.type}`;
    case 'Hygiene Products':
      return notes;
    case 'Medical Supplies':
      return `${notes}\n${item.type}`;
    case 'School & Office Supplies':
      return notes;
    case 'Sports Equipment':
      return `${notes}\n${item.type}`;
    case 'Toys & Games':
      return `${notes}\nAge group: ${item.ageGroup}`;
    case 'Uncategorized':
      return notes;
    default:
      return notes;
  }
};

/**
 * Checks if at least one of the scheduled donation items is fulfilled
 * @param scheduledDonation - The scheduled donations to check
 * @returns true iff at least one of the scheduled donation items is fulfilled
 */
export const scheduledDonationIsFulfilled = (scheduledDonation: ScheduledDonation): boolean => {
  for (const item of scheduledDonation.items) {
    if (item.fulfilled === true) {
      return true;
    }
  }
  return false;
};
