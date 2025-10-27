import { DonationItem } from '../types/DonationItem/DonationItem.types';

export const getCharityNeeds = (cid: string): DonationItem[] => {
  return DONATION_ITEMS;
};

const DONATION_ITEMS: DonationItem[] = [
  {
    category: 'animalCareSupplies',
    itemName: 'Dog Food - Large Bag',
    notes: 'High-protein dry kibble for adult dogs',
    quantity: 5,
    unit: 'bags',
    animal: 'Dogs',
    type: 'Food',
  },
  {
    category: 'clothing',
    itemName: 'Winter Jacket',
    notes: 'Warm and waterproof',
    quantity: 10,
    unit: 'pieces',
    ageGroup: 'Adult',
    gender: 'Neutral',
  },
  {
    category: 'electronics',
    itemName: 'Used Laptop',
    notes: 'Refurbished and in good condition',
    quantity: 3,
    unit: 'units',
    type: 'Computers, Tablets',
  },
  {
    category: 'food',
    itemName: 'Canned Vegetables',
    notes: 'Assorted vegetables, long shelf life',
    quantity: 100,
    unit: 'cans',
    storageRequirement: 'Shelf Stable',
  },
  {
    category: 'furniture',
    itemName: 'Wooden Dining Table',
    notes: 'Seats four, light wear',
    quantity: 1,
    unit: 'item',
    type: 'Tables',
  },
  {
    category: 'householdGoods',
    itemName: 'Bed Sheets Set',
    notes: 'Queen size, new in package',
    quantity: 8,
    unit: 'sets',
    type: 'Bedding & linens',
  },
  {
    category: 'hygiene',
    itemName: 'Toothpaste Tubes',
    notes: 'Fluoride toothpaste, travel size',
    quantity: 50,
    unit: 'tubes',
  },
  {
    category: 'medical',
    itemName: 'First Aid Kits',
    notes: 'Includes bandages, antiseptic, gloves',
    quantity: 15,
    unit: 'kits',
    type: 'First aid',
  },
  {
    category: 'schoolAndOffice',
    itemName: 'Notebooks',
    notes: 'Wide-ruled, 70 pages each',
    quantity: 120,
    unit: 'pieces',
  },
  {
    category: 'sports',
    itemName: 'Soccer Balls',
    notes: 'Standard size 5, suitable for youth teams',
    quantity: 20,
    unit: 'balls',
    type: 'Team sports',
  },
  {
    category: 'toysAndGames',
    itemName: 'Building Blocks Set',
    notes: 'Colorful blocks for ages 3–7',
    quantity: 12,
    unit: 'sets',
    ageGroup: 'Kids',
  },
  {
    category: 'uncategorized',
    itemName: 'Miscellaneous Donations',
    notes: 'Unsorted items pending classification',
    quantity: 30,
    unit: 'items',
  },
];
