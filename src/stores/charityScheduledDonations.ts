import { getCharityScheduledDonationsByAdmin } from '../lib/donation';
import { ScheduledDonation } from '../types/DonationItem/ScheduledDonation';

const charityScheduledDonationsStore: Map<string, ScheduledDonation> = new Map();

export const getCharityScheduledDonation = (date: Date, pid: string): ScheduledDonation => {
  const key = hash(date, pid);
  console.log('key: ', key);
  const scheduledDonation = charityScheduledDonationsStore.get(hash(date, pid));
  if (!scheduledDonation) throw new Error(`scheduled donation is undefined`);

  return scheduledDonation;
};

export const getAllCharityScheduledDonations = (): ScheduledDonation[] => {
  return Array.from(charityScheduledDonationsStore.values());
};

export const initCharityScheduledDonationsStore = async (): Promise<void> => {
  charityScheduledDonationsStore.clear();
  const donations = await getCharityScheduledDonationsByAdmin();
  for (const donation of donations) {
    const key = hash(donation.scheduledDate, donation.pid);
    console.log('init key: ', key);
    charityScheduledDonationsStore.set(hash(donation.scheduledDate, donation.pid), donation);
  }
};

const hash = (date: Date, pid: string): string => {
  return `${date.getTime()}?${pid}`;
};
