import {
  Animal,
  AnimalCareSuppliesType,
  AgeGroup,
  Gender,
  ElectronicsSubtype,
  StorageRequirement,
  FurnitureSubtype,
  HouseholdGoodsSubtype,
  MedicalSuppliesSubtype,
  SportsEquipmentSubtype,
} from './DonationItemSubtypes.types';

// The set of possible kinds of donations
export type DonationItem =
  | AnimalCareSuppliesItem
  | ClothingItem
  | ElectronicsItem
  | FoodItem
  | FurnitureItem
  | HouseholdGoodsItem
  | HygieneItem
  | MedicalSuppliesItem
  | SchoolAndOfficeSupplies
  | SportsEquipmentItem
  | ToysAndGames
  | UncategorizedItem;

// all DonationItems have at least these attributes
export type BaseDonationItem = {
  itemName: string;
  notes: string;
  quantity: number;
  unit: string;
  category: Category;
};

// each donation item type has a unique Category
export type Category =
  | 'food'
  | 'clothing'
  | 'furniture'
  | 'electronics'
  | 'hygiene'
  | 'medical'
  | 'sports'
  | 'toysAndGames'
  | 'schoolAndOffice'
  | 'animalCareSupplies'
  | 'householdGoods'
  | 'uncategorized';

export type AnimalCareSuppliesItem = BaseDonationItem &
  Animal &
  AnimalCareSuppliesType & { category: 'animalCareSupplies' };

export type ClothingItem = BaseDonationItem & AgeGroup & Gender & { category: 'clothing' };

export type ElectronicsItem = BaseDonationItem & ElectronicsSubtype & { category: 'electronics' };

export type FoodItem = BaseDonationItem & StorageRequirement & { category: 'food' };

export type FurnitureItem = BaseDonationItem & FurnitureSubtype & { category: 'furniture' };

export type HouseholdGoodsItem = BaseDonationItem &
  HouseholdGoodsSubtype & { category: 'householdGoods' };

export type HygieneItem = BaseDonationItem & { category: 'hygiene' };

export type MedicalSuppliesItem = BaseDonationItem &
  MedicalSuppliesSubtype & { category: 'medical' };

export type SchoolAndOfficeSupplies = BaseDonationItem & { category: 'schoolAndOffice' };

export type SportsEquipmentItem = BaseDonationItem &
  SportsEquipmentSubtype & { category: 'sports' };

export type ToysAndGames = BaseDonationItem & AgeGroup & { category: 'toysAndGames' };

export type UncategorizedItem = BaseDonationItem & { category: 'uncategorized' };
