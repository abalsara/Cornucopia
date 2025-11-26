import { DonationItem } from './DonationItem.types';

/**
 * Represents a scheduled donation for a specific charity.
 */
export type ScheduledDonation = {
  cid: string;
  pid: string;
  scheduledDate: Date;
  items: DonationItem[];
};
