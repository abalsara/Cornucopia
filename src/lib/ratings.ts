import { supabase } from './supabase';
import { Tables } from '../types/database.types';

export type Rating = Tables<'Ratings'>;

/**
 * Fetches all ratings from the `Ratings` table in the database.
 *
 * @async
 * @returns {Promise<Rating[]>} A promise that resolves to an array of all rating records.
 * @throws {Error} If the query fails.
 */
export const fetchAllRatings = async (): Promise<Rating[]> => {
  const { data, error } = await supabase.from('Ratings').select();
  if (error) throw error;

  const ratings: Rating[] = data;
  return ratings;
};

/**
 * Fetches all ratings associated with a specific charity ID (`cid`).
 *
 * @async
 * @param {string} cid - The unique charity ID to filter ratings by.
 * @returns {Promise<Rating[]>} A promise that resolves to an array of ratings for the given charity.
 * @throws {Error} If the query fails.
 */
export const fetchRatingsByCid = async (cid: string): Promise<Rating[]> => {
  const { data, error } = await supabase.from('Ratings').select().eq('cid', cid);
  if (error) throw error;

  const ratings: Rating[] = data;
  return ratings;
};
