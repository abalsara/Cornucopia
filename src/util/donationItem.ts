import { Category, DonationItem } from '../types/DonationItem/DonationItem.types';

/**
 * returns a user-friendly string representation of a given Category
 */
export const formatDonationItemCategory = (category: Category): string => {
  switch (category) {
    case 'food':
      return 'Food';
    case 'clothing':
      return 'Clothing';
    case 'furniture':
      return 'Furniture';
    case 'electronics':
      return 'Electronics';
    case 'hygiene':
      return 'Hygiene';
    case 'medical':
      return 'Medical supplies';
    case 'sports':
      return 'Sports equipment';
    case 'toysAndGames':
      return 'Toys & Games';
    case 'schoolAndOffice':
      return 'School & Office Supplies';
    case 'animalCareSupplies':
      return 'Animal Care Supplies';
    case 'householdGoods':
      return 'Household Goods';
    case 'uncategorized':
      return 'Uncategorized';
  }
};

/**
 * returns a description of a given DoantionItem for use on a DonationCard component
 */
export const getDonationCardSubtitle = (item: DonationItem): string => {
  const notes = item.notes;
  switch (item.category) {
    case 'animalCareSupplies':
      return `${notes}\n${item.animal} — ${item.type}`;
    case 'clothing':
      return `${notes}\n${item.ageGroup} — ${item.gender}`;
    case 'electronics':
      return `${notes}\n${item.type}`;
    case 'food':
      return `${notes}\nStorage: ${item.storageRequirement}`;
    case 'furniture':
      return `${notes}\n${item.type}`;
    case 'householdGoods':
      return `${notes}\n${item.type}`;
    case 'hygiene':
      return notes;
    case 'medical':
      return `${notes}\n${item.type}`;
    case 'schoolAndOffice':
      return notes;
    case 'sports':
      return `${notes}\n${item.type}`;
    case 'toysAndGames':
      return `${notes}\nAge group: ${item.ageGroup}`;
    case 'uncategorized':
      return notes;
    default:
      return notes;
  }
};
