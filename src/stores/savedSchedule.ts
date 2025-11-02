/**
 * Store the user's saved schedule for a donation drop off
 * during the schedule a donation user flow
 */
let savedSchedule: Date | undefined = undefined;

/**
 * @returns the date of the user's saved schedule if exists
 */
export const getSavedSchedule = (): Date | undefined => {
  if (savedSchedule) {
    const copy = new Date(savedSchedule);
    return copy;
  }
  return undefined;
};

/**
 * Store the user's schedule for a donation drop off
 * @param date Date that the user wants to drop off their donation
 */
export const setSavedSchedule = (date?: Date): void => {
  if (date) {
    const copy = new Date(date);
    savedSchedule = copy;
    return;
  }
  savedSchedule = undefined;
};
