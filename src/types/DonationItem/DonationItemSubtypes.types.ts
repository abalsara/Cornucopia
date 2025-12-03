import { Enums } from '../database.types';

export type AgeGroup = {
  ageGroup?: Enums<'AgeGroupT'> | undefined;
};

export type Animal = {
  animal: Enums<'AnimalTypeT'>;
};

export type AnimalCareSuppliesType = {
  type: Enums<'AnimalNeedT'>;
};

export type DonationStatus = 'Scheduled' | 'Cancelled' | 'Received' | 'Expired';

export type ElectronicsSubtype = {
  type: Enums<'ElectronicsTypeT'>;
};

export type FurnitureSubtype = {
  type: Enums<'FurnitureTypeT'>;
};

export type Gender = {
  gender?: Enums<'GenderT'>;
};

export type HouseholdGoodsSubtype = {
  type: Enums<'HouseholdGoodsTypeT'>;
};

export type MedicalSuppliesSubtype = {
  type: Enums<'MedicalSuppliesTypeT'>;
};

export type SportsEquipmentSubtype = {
  type: Enums<'SportsEquipmentTypeT'>;
};

export type StorageRequirement = {
  storageRequirement: Enums<'StorageRequirementT'>;
};
