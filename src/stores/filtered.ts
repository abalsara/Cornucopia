import { Charity } from '../lib/charities';

let filtered: Charity[] = [];

export function getFiltered(): Charity[] {
  return filtered;
}

export function setFiltered(charities: Charity[]): void {
  filtered = charities;
}
