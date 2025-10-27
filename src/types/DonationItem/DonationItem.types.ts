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

export type BaseDonationItem = {
  itemName: string;
  notes: string;
  quantity: number;
  unit: string;
};

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
