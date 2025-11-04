import { supabase } from './supabase';
import { DonationItem } from '../types/DonationItem/DonationItem.types';

export async function getCharityNeeds(cid: string): Promise<DonationItem[]> {
  try {
    const needs = await fetchAllCharityNeeds(cid);
    return parseNeedsToDonationItems(needs);
  } catch (error) {
    console.error('Error getting charity needs:', error);
    return [];
  }
}

/**
 * Fetch all charity needs.
 * @param cid Charity ID
 * @returns Array of charity needs
 */
export async function fetchAllCharityNeeds(cid: string): Promise<any[]> {
  const { data, error } = await supabase.functions.invoke('get-all-charity-needs-flat', {
    body: { cid },
  });

  if (error) {
    console.error('Error fetching charity needs:', error);
    return [];
  }

  return data.needs ?? [];
}

function parseNeedsToDonationItems(needs: any[]): DonationItem[] {
  const parsedDonations: DonationItem[] = [];

  for (const need of needs) {
    const category = need.category?.toLowerCase();
    const request = need.Request ?? {};

    // Merge shared fields from both sources
    const base = {
      category,
      itemName: need.item_name ?? request.item_name ?? '',
      notes: need.notes ?? request.notes ?? '',
      quantity: need.quantity ?? request.quantitiy ?? 1,
      unit: need.unit ?? request.unit ?? 'Ea.',
    };

    let donationItem: DonationItem;

    switch (category) {
      case 'animalcaresupplies':
        donationItem = {
          ...base,
          animal: need.animal ?? 'Dogs',
          type: need.type ?? 'Other',
        };
        break;

      case 'clothing':
        donationItem = {
          ...base,
          ageGroup: need.age_group ?? 'All Ages',
          gender: need.gender ?? 'Unisex',
        };
        break;

      case 'electronics':
        donationItem = {
          ...base,
          type: need.type ?? 'Other',
        };
        break;

      case 'food':
        donationItem = {
          ...base,
          storageRequirement: need.storage_reqs ?? 'Shelf Stable',
        };
        break;

      case 'furniture':
        donationItem = {
          ...base,
          type: need.type ?? 'Other',
        };
        break;

      case 'householdgoods':
        donationItem = {
          ...base,
          type: need.type ?? 'Other',
        };
        break;

      case 'hygieneproduct':
        donationItem = {
          ...base,
        };
        break;

      case 'medicalsupplies':
        donationItem = {
          ...base,
          type: need.type ?? 'Other',
        };
        break;

      case 'schoolofficesupplies':
        donationItem = {
          ...base,
        };
        break;

      case 'sportsequipment':
        donationItem = {
          ...base,
          type: need.type ?? 'Other',
        };
        break;

      case 'toysgames':
        donationItem = {
          ...base,
          ageGroup: need.age_group ?? 'All Ages',
        };
        break;

      case 'uncatergorized':
        donationItem = {
          ...base,
        };
        break;

      default:
        console.warn('Unknown category:', category);
        continue;
    }

    parsedDonations.push(donationItem);
  }

  return parsedDonations;
}

// const DONATION_ITEMS: DonationItem[] = [
//   {
//     category: 'animalCareSupplies',
//     itemName: 'Dog Food - Large Bag',
//     notes: 'High-protein dry kibble for adult dogs',
//     quantity: 5,
//     unit: 'bags',
//     animal: 'Dogs',
//     type: 'Food',
//   },
//   {
//     category: 'animalCareSupplies',
//     itemName: 'Cat foot',
//     notes: 'Canned cat food',
//     quantity: 20,
//     unit: 'cans',
//     animal: 'Cats',
//     type: 'Food',
//   },
//   {
//     category: 'clothing',
//     itemName: 'Winter Jacket',
//     notes: 'Warm and waterproof',
//     quantity: 10,
//     unit: 'pieces',
//     ageGroup: 'Adult',
//     gender: 'Neutral',
//   },
//   {
//     category: 'electronics',
//     itemName: 'Used Laptop',
//     notes: 'Refurbished and in good condition',
//     quantity: 3,
//     unit: 'units',
//     type: 'Computers, Tablets',
//   },
//   {
//     category: 'food',
//     itemName: 'Canned Vegetables',
//     notes: 'Assorted vegetables, long shelf life',
//     quantity: 100,
//     unit: 'cans',
//     storageRequirement: 'Shelf Stable',
//   },
//   {
//     category: 'furniture',
//     itemName: 'Wooden Dining Table',
//     notes: 'Seats four, light wear',
//     quantity: 1,
//     unit: 'item',
//     type: 'Tables',
//   },
//   {
//     category: 'householdGoods',
//     itemName: 'Bed Sheets Set',
//     notes: 'Queen size, new in package',
//     quantity: 8,
//     unit: 'sets',
//     type: 'Bedding & linens',
//   },
//   {
//     category: 'hygiene',
//     itemName: 'Toothpaste Tubes',
//     notes: 'Fluoride toothpaste, travel size',
//     quantity: 50,
//     unit: 'tubes',
//   },
//   {
//     category: 'medical',
//     itemName: 'First Aid Kits',
//     notes: 'Includes bandages, antiseptic, gloves',
//     quantity: 15,
//     unit: 'kits',
//     type: 'First aid',
//   },
//   {
//     category: 'schoolAndOffice',
//     itemName: 'Notebooks',
//     notes: 'Wide-ruled, 70 pages each',
//     quantity: 120,
//     unit: 'pieces',
//   },
//   {
//     category: 'sports',
//     itemName: 'Soccer Balls',
//     notes: 'Standard size 5, suitable for youth teams',
//     quantity: 20,
//     unit: 'balls',
//     type: 'Team sports',
//   },
//   {
//     category: 'toysAndGames',
//     itemName: 'Building Blocks Set',
//     notes: 'Colorful blocks for ages 3–7',
//     quantity: 12,
//     unit: 'sets',
//     ageGroup: 'Kids',
//   },
//   {
//     category: 'uncategorized',
//     itemName: 'Miscellaneous Donations',
//     notes: 'Unsorted items pending classification',
//     quantity: 30,
//     unit: 'items',
//   },
// ];
