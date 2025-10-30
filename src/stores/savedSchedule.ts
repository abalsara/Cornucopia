let savedSchedule: Date | undefined = undefined;

export const getSavedSchedule = (): Date | undefined => {
  if (savedSchedule) {
    const copy = new Date(savedSchedule);
    return copy;
  }
  return undefined;
};

export const setSavedSchedule = (date?: Date): void => {
  if (date) {
    const copy = new Date(date);
    savedSchedule = copy;
    return;
  }
  savedSchedule = undefined;
};
