export type AgeGroup = {
  ageGroup: 'Baby' | 'Kids' | 'Teenager' | 'Adult' | 'All Ages';
};

export type Animal = {
  animal: 'Dogs' | 'Cats' | 'Small animals' | 'Birds' | 'Reptiles';
};

export type AnimalCareSuppliesType = {
  type:
    | 'Food'
    | 'Bedding'
    | 'Crates'
    | 'Toys'
    | 'Grooming'
    | 'Bowls & feeders'
    | 'Health & wellness'
    | 'Accessories'
    | 'Other';
};

export type DonationStatus = 'Scheduled' | 'Cancelled' | 'Received' | 'Expired';

export type ElectronicsSubtype = {
  type:
    | 'Computers, Tablets'
    | 'Phone & mobile devices'
    | 'TVs & monitors'
    | 'Appliances'
    | 'Accessories & cables'
    | 'Other';
};

export type FurnitureSubtype = {
  type: 'Seating' | 'Tables' | 'Bedroom' | 'Storage' | 'Outdoor furniture' | 'Other';
};

export type Gender = {
  gender: 'Girls' | 'Boys' | 'Neutral';
};

export type HouseholdGoodsSubtype = {
  type:
    | 'Kitchen items'
    | 'Bedding & linens'
    | 'Cleaning supplies'
    | 'Small appliances'
    | 'Storage & organization'
    | 'Decor & lighting'
    | 'Other';
};

export type MedicalSuppliesSubtype = {
  type: 'First aid' | 'Mobility aids' | 'OTC medications / Supplements' | 'Other';
};

export type SportsEquipmentSubtype = {
  type: 'Team sports' | 'Winter sports' | 'Fitness equipment' | 'Bikes & recreation' | 'Other';
};

export type StorageRequirement = {
  storageRequirement: 'Fridge' | 'Freezer' | 'Shelf Stable';
};
