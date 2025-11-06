import { supabase } from './supabase';
import { DonationItem } from '../types/DonationItem/DonationItem.types';

/**
 * Get the charity needs for a given charity ID.
 * @param cid The charity ID
 * @returns Array of charity needs
 */
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
 * Fetch all charity needs in JSON format from Supabase function.
 * @param cid Charity ID
 * @returns Array of JSON charity needs with detailed needs information
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

/**
 * Creates a new need entry in the specified table for the given charity ID (cid).
 * @param authToken - The authorization token for the request.
 * @param cid - The charity ID for which the need is being created.
 * @param table - The table in which to create the need.
 * @param body - The body of the request containing need details.
 * @returns The response data from the Supabase function, what was inserted.
 * @throws An error if the request fails.
 */
export async function createNeed(cid: string, table: string, body: JSON) {
  const { data, error } = await supabase.functions.invoke('insert-need', {
    body: { cid, table, body },
    method: 'POST',
  });

  if (error) {
    console.error('Error inserting charity need:', error);
  }

  return data;
}

/**
 * Parse charity needs into DonationItem objects.
 * @param needs Array of charity needs returned from fetchAllCharityNeeds
 * @returns Array of DonationItem objects
 */
function parseNeedsToDonationItems(needs: any[]): DonationItem[] {
  const parsedDonations: DonationItem[] = [];

  for (const need of needs) {
    const category = need.category?.toLowerCase();
    const request = need.Request ?? {};

    console.log(`category: ${category}`);

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
