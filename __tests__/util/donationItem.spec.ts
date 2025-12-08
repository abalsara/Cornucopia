import { getDonationCardSubtitle, scheduledDonationIsFulfilled } from '@/src/util/donationItem';

describe('getDonationCardSubtitle', () => {
  const baseItem = {
    notes: 'Some notes',
  } as any;

  test('Animal Care Supplies', () => {
    const item = {
      ...baseItem,
      category: 'Animal Care Supplies',
      animal: 'Dog',
      type: 'Leash',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nDog — Leash');
  });

  test('Clothing', () => {
    const item = {
      ...baseItem,
      category: 'Clothing',
      ageGroup: 'Adult',
      gender: 'Unisex',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nAdult — Unisex');
  });

  test('Electronics', () => {
    const item = {
      ...baseItem,
      category: 'Electronics',
      type: 'Laptop',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nLaptop');
  });

  test('Food', () => {
    const item = {
      ...baseItem,
      category: 'Food',
      storageRequirement: 'Refrigerated',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nStorage: Refrigerated');
  });

  test('Furniture', () => {
    const item = {
      ...baseItem,
      category: 'Furniture',
      type: 'Chair',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nChair');
  });

  test('Household Goods', () => {
    const item = {
      ...baseItem,
      category: 'Household Goods',
      type: 'Detergent',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nDetergent');
  });

  test('Hygiene Products', () => {
    const item = {
      ...baseItem,
      category: 'Hygiene Products',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes');
  });

  test('Medical Supplies', () => {
    const item = {
      ...baseItem,
      category: 'Medical Supplies',
      type: 'Bandages',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nBandages');
  });

  test('School & Office Supplies', () => {
    const item = {
      ...baseItem,
      category: 'School & Office Supplies',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes');
  });

  test('Sports Equipment', () => {
    const item = {
      ...baseItem,
      category: 'Sports Equipment',
      type: 'Basketball',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nBasketball');
  });

  test('Toys & Games', () => {
    const item = {
      ...baseItem,
      category: 'Toys & Games',
      ageGroup: '3+',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes\nAge group: 3+');
  });

  test('Uncategorized', () => {
    const item = {
      ...baseItem,
      category: 'Uncategorized',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes');
  });

  test('Default (unknown category)', () => {
    const item = {
      ...baseItem,
      category: 'SomethingElse',
    };
    expect(getDonationCardSubtitle(item)).toBe('Some notes');
  });
});

describe('scheduledDonationIsFulfilled', () => {
  test('returns false when no items are fulfilled', () => {
    const scheduledDonation = {
      items: [{ fulfilled: false }, { fulfilled: false }],
    } as any;

    expect(scheduledDonationIsFulfilled(scheduledDonation)).toBe(false);
  });

  test('returns true when the first item is fulfilled', () => {
    const scheduledDonation = {
      items: [{ fulfilled: true }, { fulfilled: false }],
    } as any;

    expect(scheduledDonationIsFulfilled(scheduledDonation)).toBe(true);
  });

  test('returns true when a later item is fulfilled', () => {
    const scheduledDonation = {
      items: [{ fulfilled: false }, { fulfilled: false }, { fulfilled: true }],
    } as any;

    expect(scheduledDonationIsFulfilled(scheduledDonation)).toBe(true);
  });

  test('returns false when items array is empty', () => {
    const scheduledDonation = {
      items: [],
    } as any;

    expect(scheduledDonationIsFulfilled(scheduledDonation)).toBe(false);
  });
});
