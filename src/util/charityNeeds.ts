import {
  AnimalCareSuppliesItem,
  ClothingItem,
  DonationItem,
  ElectronicsItem,
  FoodItem,
  FurnitureItem,
  HouseholdGoodsItem,
  HygieneItem,
  MedicalSuppliesItem,
  SchoolAndOfficeSupplies,
  SportsEquipmentItem,
  ToysAndGames,
  UncategorizedItem,
} from '../types/DonationItem/DonationItem.types';

/**
 * Filters all animal care supplies.
 */
export const getAnimalCareSuppliesNeeds = (needs: DonationItem[]): AnimalCareSuppliesItem[] => {
  const items: AnimalCareSuppliesItem[] = [];
  for (const item of needs) {
    if (item.category === 'animalCareSupplies' && item.animal && item.type) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all clothing items.
 */
export const getClothingNeeds = (needs: DonationItem[]): ClothingItem[] => {
  const items: ClothingItem[] = [];
  for (const item of needs) {
    if (item.category === 'clothing' && item.ageGroup && item.gender) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all electronics items.
 */
export const getElectronicsNeeds = (needs: DonationItem[]): ElectronicsItem[] => {
  const items: ElectronicsItem[] = [];
  for (const item of needs) {
    if (item.category === 'electronics' && item.type) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all food items.
 */
export const getFoodNeeds = (needs: DonationItem[]): FoodItem[] => {
  const items: FoodItem[] = [];
  for (const item of needs) {
    if (item.category === 'food' && item.storageRequirement) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all furniture items.
 */
export const getFurnitureNeeds = (needs: DonationItem[]): FurnitureItem[] => {
  const items: FurnitureItem[] = [];
  for (const item of needs) {
    if (item.category === 'furniture' && item.type) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all household goods items.
 */
export const getHouseholdGoodsNeeds = (needs: DonationItem[]): HouseholdGoodsItem[] => {
  const items: HouseholdGoodsItem[] = [];
  for (const item of needs) {
    if (item.category === 'householdGoods' && item.type) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all hygiene items.
 */
export const getHygieneNeeds = (needs: DonationItem[]): HygieneItem[] => {
  const items: HygieneItem[] = [];
  for (const item of needs) {
    if (item.category === 'hygiene') {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all medical supplies.
 */
export const getMedicalSuppliesNeeds = (needs: DonationItem[]): MedicalSuppliesItem[] => {
  const items: MedicalSuppliesItem[] = [];
  for (const item of needs) {
    if (item.category === 'medical' && item.type) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all school and office supplies.
 */
export const getSchoolAndOfficeNeeds = (needs: DonationItem[]): SchoolAndOfficeSupplies[] => {
  const items: SchoolAndOfficeSupplies[] = [];
  for (const item of needs) {
    if (item.category === 'schoolAndOffice') {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all sports equipment.
 */
export const getSportsNeeds = (needs: DonationItem[]): SportsEquipmentItem[] => {
  const items: SportsEquipmentItem[] = [];
  for (const item of needs) {
    if (item.category === 'sports' && item.type) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all toys and games.
 */
export const getToysAndGamesNeeds = (needs: DonationItem[]): ToysAndGames[] => {
  const items: ToysAndGames[] = [];
  for (const item of needs) {
    if (item.category === 'toysAndGames' && item.ageGroup) {
      items.push({ ...item });
    }
  }
  return items;
};

/**
 * Filters all uncategorized items.
 */
export const getUncategorizedNeeds = (needs: DonationItem[]): UncategorizedItem[] => {
  const items: UncategorizedItem[] = [];
  for (const item of needs) {
    if (item.category === 'uncategorized') {
      items.push({ ...item });
    }
  }
  return items;
};
