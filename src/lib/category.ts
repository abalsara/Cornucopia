import { supabase } from './supabase';
import { Tables } from '../types/database.types';

export const fetchAnimalCareSupplies = async (
  itemId: string,
): Promise<Tables<'AnimalCareSupplies'>> => {
  const { data, error } = await supabase
    .from('AnimalCareSupplies')
    .select()
    .eq('item_id', itemId)
    .single();
  if (error) throw error;

  const animalCareSupplies: Tables<'AnimalCareSupplies'> = data;
  return animalCareSupplies;
};

export const fetchClothing = async (itemId: string): Promise<Tables<'Clothing'>> => {
  const { data, error } = await supabase.from('Clothing').select().eq('item_id', itemId).single();
  if (error) throw error;

  const clothing: Tables<'Clothing'> = data;
  return clothing;
};

export const fetchElectronics = async (itemId: string): Promise<Tables<'Electronics'>> => {
  const { data, error } = await supabase
    .from('Electronics')
    .select()
    .eq('item_id', itemId)
    .single();
  if (error) throw error;

  const electronics: Tables<'Electronics'> = data;
  return electronics;
};

export const fetchFood = async (itemId: string): Promise<Tables<'Food'>> => {
  const { data, error } = await supabase.from('Food').select().eq('item_id', itemId).single();
  if (error) throw error;

  const food: Tables<'Food'> = data;
  return food;
};

export const fetchFurniture = async (itemId: string): Promise<Tables<'Furniture'>> => {
  const { data, error } = await supabase.from('Furniture').select().eq('item_id', itemId).single();
  if (error) throw error;

  const furniture: Tables<'Furniture'> = data;
  return furniture;
};

export const fetchHouseholdGoods = async (itemId: string): Promise<Tables<'HouseholdGoods'>> => {
  const { data, error } = await supabase
    .from('HouseholdGoods')
    .select()
    .eq('item_id', itemId)
    .single();
  if (error) throw error;

  const householdGoods: Tables<'HouseholdGoods'> = data;
  return householdGoods;
};

export const fetchHygieneProducts = async (itemId: string): Promise<Tables<'HygieneProducts'>> => {
  const { data, error } = await supabase
    .from('HygieneProducts')
    .select()
    .eq('item_id', itemId)
    .single();
  if (error) throw error;

  const hygieneProducts: Tables<'HygieneProducts'> = data;
  return hygieneProducts;
};

export const fetchMedicalSupplies = async (itemId: string): Promise<Tables<'MedicalSupplies'>> => {
  const { data, error } = await supabase
    .from('MedicalSupplies')
    .select()
    .eq('item_id', itemId)
    .single();
  if (error) throw error;

  const medicalSupplies: Tables<'MedicalSupplies'> = data;
  return medicalSupplies;
};

export const fetchSchoolOfficeSupplies = async (
  itemId: string,
): Promise<Tables<'SchoolOfficeSupplies'>> => {
  const { data, error } = await supabase
    .from('SchoolOfficeSupplies')
    .select()
    .eq('item_id', itemId)
    .single();
  if (error) throw error;

  const schoolOfficeSupplies: Tables<'SchoolOfficeSupplies'> = data;
  return schoolOfficeSupplies;
};

export const fetchSportsEquipment = async (itemId: string): Promise<Tables<'SportsEquipment'>> => {
  const { data, error } = await supabase
    .from('SportsEquipment')
    .select()
    .eq('item_id', itemId)
    .single();
  if (error) throw error;

  const sportsEquipment: Tables<'SportsEquipment'> = data;
  return sportsEquipment;
};

export const fetchToysGames = async (itemId: string): Promise<Tables<'ToysGames'>> => {
  const { data, error } = await supabase.from('ToysGames').select().eq('item_id', itemId).single();
  if (error) throw error;

  const toysGames: Tables<'ToysGames'> = data;
  return toysGames;
};

export const fetchUncategorized = async (itemId: string): Promise<Tables<'Uncategorized'>> => {
  const { data, error } = await supabase
    .from('Uncategorized')
    .select()
    .eq('item_id', itemId)
    .single();
  if (error) throw error;

  const uncategorized: Tables<'Uncategorized'> = data;
  return uncategorized;
};
