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
  itemId: string;
  pid?: string;
  cid: string;
  itemName: string;
  notes: string;
  quantity: number;
  unit: string;
  category: Category;
};

// each donation item type has a unique Category
export type Category =
  | 'Food'
  | 'Clothing'
  | 'Furniture'
  | 'Electronics'
  | 'Hygiene Products'
  | 'Medical Supplies'
  | 'Sports Equipment'
  | 'Toys & Games'
  | 'School & Office Supplies'
  | 'Animal Care Supplies'
  | 'Household Goods'
  | 'Uncategorized';

export type AnimalCareSuppliesItem = BaseDonationItem &
  Animal &
  AnimalCareSuppliesType & { category: 'Animal Care Supplies' };

export type ClothingItem = BaseDonationItem & AgeGroup & Gender & { category: 'Clothing' };

export type ElectronicsItem = BaseDonationItem & ElectronicsSubtype & { category: 'Electronics' };

export type FoodItem = BaseDonationItem & StorageRequirement & { category: 'Food' };

export type FurnitureItem = BaseDonationItem & FurnitureSubtype & { category: 'Furniture' };

export type HouseholdGoodsItem = BaseDonationItem &
  HouseholdGoodsSubtype & { category: 'Household Goods' };

export type HygieneItem = BaseDonationItem & { category: 'Hygiene Products' };

export type MedicalSuppliesItem = BaseDonationItem &
  MedicalSuppliesSubtype & { category: 'Medical Supplies' };

export type SchoolAndOfficeSupplies = BaseDonationItem & { category: 'School & Office Supplies' };

export type SportsEquipmentItem = BaseDonationItem &
  SportsEquipmentSubtype & { category: 'Sports Equipment' };

export type ToysAndGames = BaseDonationItem & AgeGroup & { category: 'Toys & Games' };

export type UncategorizedItem = BaseDonationItem & { category: 'Uncategorized' };
