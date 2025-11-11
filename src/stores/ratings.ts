import { Rating } from '../lib/ratings';

let ratingsStore: Rating[] = [];

/**
 * Initializes the ratings store with the provided list of ratings.
 * This replaces any existing ratings in memory.
 *
 * @param {Rating[]} ratings - The initial array of ratings to store.
 * @returns {void}
 */
export const initRatingsStore = (ratings: Rating[]): void => {
  ratingsStore = ratings;
};

/**
 * Retrieves all ratings currently stored in memory.
 *
 * @returns {Rating[]} A copy of the stored ratings.
 */
export const getRatings = (): Rating[] => {
  return [...ratingsStore];
};

/**
 * Retrieves ratings for a specific charity.
 *
 * @param {string} cid - the charity ID of the ratings
 * @returns {Rating[]} A new array of ratings for the charity with the given cid.
 */
export const getRatingsByCid = (cid: string): Rating[] => {
  const res = [];
  for (const rating of ratingsStore) {
    if (rating.cid === cid) {
      res.push(rating);
    }
  }
  return res;
};

/**
 * Adds a new rating to the in-memory store.
 *
 * @param {Rating} rating - The rating object to add.
 * @returns {void}
 */
export const addRating = (rating: Rating): void => {
  ratingsStore.push(rating);
};
