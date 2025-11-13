import { Rating } from '../lib/ratings';

/**
 * Computes the average star rating from a list of ratings.
 * Ignores any ratings without a defined `star` value.
 * Returns `0` if the list is empty or contains no valid star ratings.
 *
 * @param {Rating[]} ratings - An array of rating objects to compute the average from.
 * @returns {number} The average star rating, or `0` if no valid ratings are found.
 */
export const computeAvgRating = (ratings: Rating[]): number => {
  if (ratings.length === 0) return 0;

  let sum = 0;
  let count = 0;

  for (const rating of ratings) {
    if (rating.star != null) {
      sum += rating.star;
      count++;
    }
  }

  return count > 0 ? sum / count : 0;
};
