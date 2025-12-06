import { useMemo, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import { Text, IconButton, TextInput, Button, useTheme } from 'react-native-paper';

import { NeedPayload, Priority, NEED_CATEGORIES } from './newNeedForm';

import { Constants, type Database } from '@/src/types/database.types';

type GenderT = Database['public']['Enums']['GenderT'];
type AgeGroupT = Database['public']['Enums']['AgeGroupT'];
type StorageRequirementT = Database['public']['Enums']['StorageRequirementT'];
type AnimalTypeT = Database['public']['Enums']['AnimalTypeT'];

const CATEGORY_FIELDS: Record<string, string[]> = {
  Food: ['storage_reqs'],
  Clothing: ['age_group', 'gender'],
  'Hygiene Products': [],
  'Household Goods': ['type'],
  Furniture: ['type'],
  'Toys & Games': ['age_group'],
  'Medical Supplies': ['type'],
  'School & Office Supplies': [],
  'Animal Care Supplies': ['animal', 'type'],
  Electronics: ['type'],
  'Sports Equipment': ['type', 'age_group'],
  Uncategorized: [],
};

type Props = {
  onClose: () => void;
  initial: NeedPayload;
  onUpdate?: (payload: NeedPayload) => void;
  onRemove?: () => void;
};

export default function EditNeedForm({ onClose, initial, onUpdate, onRemove }: Props) {
  const [item_name, setItemName] = useState(initial.item_name ?? '');
  const [notes, setNotes] = useState(initial.notes ?? '');
  const [category, setCategory] = useState<string | null>(initial.category ?? 'Food');
  const [priority, setPriority] = useState<Priority | null>(initial.priority ?? 'Urgent');
  const [unit, setUnit] = useState(initial.unit ?? 'Ea.');
  const [quantity, setQuantity] = useState(initial.quantity ?? 1);
  const [type, setType] = useState<any>(initial.type);
  const [animal, setAnimal] = useState<AnimalTypeT | undefined>(initial.animal);
  const [gender, setGender] = useState<GenderT | undefined>(initial.gender);
  const [age_group, setAgeGroup] = useState<AgeGroupT | undefined>(initial.age_group);
  const [storage_reqs, setStorageReqs] = useState<StorageRequirementT | undefined>(
    initial.storage_reqs,
  );
  const [menuVisible, setMenuVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (category !== initial.category) {
      setType(undefined);
      setAnimal(undefined);
      setGender(undefined);
      setAgeGroup(undefined);
      setStorageReqs(undefined);
    }
  }, [category, initial.category]);

  const theme = useTheme();
  const themeColors = theme.colors;

  const statusColors: Record<Priority, string> = {
    Urgent: themeColors.error,
    'High Priority': 'rgb(220, 163, 17)',
    Ongoing: themeColors.secondary,
    Low: themeColors.tertiary,
  };

  const SELECTED_PILL = themeColors.primary;
  const UNSELECTED_PILL = themeColors.surfaceVariant;
  const UNSELECTED_TEXT = themeColors.onSurface;

  const priorityDescriptions: Record<Priority, string> = {
    Urgent: 'This item is needed within 24 hours',
    'High Priority': 'This item is needed within the week',
    Ongoing: 'This item is needed on an ongoing basis',
    Low: 'This item is needed but not urgently',
  };

  const getRequiredFields = () => {
    return category ? CATEGORY_FIELDS[category] || [] : [];
  };

  const getEnumOptions = (field: string) => {
    switch (field) {
      case 'storage_reqs':
        return Constants.public.Enums.StorageRequirementT;
      case 'age_group':
        return Constants.public.Enums.AgeGroupT;
      case 'gender':
        return Constants.public.Enums.GenderT;
      case 'animal':
        return Constants.public.Enums.AnimalTypeT;
      case 'type':
        if (category === 'Household Goods') return Constants.public.Enums.HouseholdGoodsTypeT;
        if (category === 'Furniture') return Constants.public.Enums.FurnitureTypeT;
        if (category === 'Animal Care Supplies') return Constants.public.Enums.AnimalNeedT;
        if (category === 'Medical Supplies') return Constants.public.Enums.MedicalSuppliesTypeT;
        if (category === 'Electronics') return Constants.public.Enums.ElectronicsTypeT;
        if (category === 'Sports Equipment') return Constants.public.Enums.SportsEquipmentTypeT;
        return [];
      default:
        return [];
    }
  };

  const changed = useMemo(() => {
    return (
      item_name !== (initial.item_name ?? '') ||
      notes !== (initial.notes ?? '') ||
      category !== (initial.category ?? null) ||
      priority !== (initial.priority ?? null) ||
      unit !== (initial.unit ?? 'Ea.') ||
      quantity !== (initial.quantity ?? 1) ||
      type !== initial.type ||
      animal !== initial.animal ||
      gender !== initial.gender ||
      age_group !== initial.age_group ||
      storage_reqs !== initial.storage_reqs
    );
  }, [
    item_name,
    notes,
    category,
    priority,
    unit,
    quantity,
    type,
    animal,
    gender,
    age_group,
    storage_reqs,
    initial,
  ]);

  const handleUpdate = () => {
    if (!changed) return;
    onUpdate?.({
      cid: initial.cid,
      item_name,
      notes,
      category,
      priority,
      unit,
      quantity,
      type,
      animal,
      gender,
      age_group,
      storage_reqs,
    });
    onClose();
  };

  const renderDropdown = (field: string, value: any, setValue: (val: any) => void) => {
    const options = getEnumOptions(field);
    const isVisible = menuVisible[field] || false;

    return (
      <>
        <Pressable
          onPress={() => setMenuVisible((prev) => ({ ...prev, [field]: true }))}
          style={[
            styles.dropdown,
            { backgroundColor: themeColors.surface, borderColor: themeColors.outline },
          ]}>
          <Text style={{ color: value ? themeColors.onSurface : themeColors.onSurfaceVariant }}>
            {value || `Select ${field.replace('_', ' ')}`}
          </Text>
        </Pressable>

        <Modal
          visible={isVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible((prev) => ({ ...prev, [field]: false }))}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setMenuVisible((prev) => ({ ...prev, [field]: false }))}>
            <View style={[styles.dropdownModal, { backgroundColor: themeColors.surface }]}>
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    style={[styles.dropdownItem, { borderBottomColor: themeColors.outline }]}
                    onPress={() => {
                      setValue(item);
                      setMenuVisible((prev) => ({ ...prev, [field]: false }));
                    }}>
                    <Text style={{ color: themeColors.onSurface }}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      </>
    );
  };

  const handleRemove = () => {
    onRemove?.();
    onClose();
  };

  return (
    <Modal visible transparent={false} animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.headerTitle}>
            Edit Need
          </Text>
          <IconButton icon="close" onPress={onClose} accessibilityLabel="Close" />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <TextInput
            mode="outlined"
            label="Title"
            placeholder="Boys Winter Coats"
            value={item_name}
            onChangeText={setItemName}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Description"
            placeholder="Winter coats for boys ages 5-12. Gently used or new."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            style={[styles.input, styles.multiline]}
          />

          <View style={styles.rowInputs}>
            <TextInput
              mode="outlined"
              label="Quantity"
              value={quantity.toString()}
              onChangeText={(text) => {
                const num = parseInt(text, 10) || 1;
                setQuantity(num);
              }}
              keyboardType="numeric"
              style={[styles.input, styles.halfWidth]}
            />
            <TextInput
              mode="outlined"
              label="Unit"
              value={unit}
              onChangeText={setUnit}
              style={[styles.input, styles.halfWidth]}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Category
            </Text>
            <View style={styles.pillsWrap}>
              {NEED_CATEGORIES.map((c) => {
                const selected = c === category;
                return (
                  <Pressable
                    key={c}
                    onPress={() => {
                      const newCategory = selected ? null : c;
                      setCategory(newCategory);
                    }}
                    style={[
                      styles.pill,
                      { backgroundColor: selected ? SELECTED_PILL : UNSELECTED_PILL },
                    ]}>
                    <Text style={[styles.pillText, { color: selected ? '#fff' : UNSELECTED_TEXT }]}>
                      {c}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Priority
            </Text>
            <View style={styles.pillsWrap}>
              {(['Urgent', 'High Priority', 'Ongoing', 'Low'] as Priority[]).map((p) => {
                const selected = p === priority;
                return (
                  <Pressable
                    key={p}
                    onPress={() => setPriority(selected ? null : p)}
                    style={[
                      styles.pill,
                      {
                        backgroundColor: selected ? statusColors[p] : UNSELECTED_PILL,
                      },
                    ]}>
                    <Text style={[styles.pillText, { color: selected ? '#fff' : UNSELECTED_TEXT }]}>
                      {p}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text
              variant="bodyMedium"
              style={[styles.priorityDescription, { color: statusColors[priority ?? 'Urgent'] }]}>
              {priority ? priorityDescriptions[priority] : priorityDescriptions['Urgent']}
            </Text>
          </View>

          {getRequiredFields().map((field) => (
            <View key={field} style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </Text>
              {renderDropdown(
                field,
                field === 'storage_reqs'
                  ? storage_reqs
                  : field === 'age_group'
                    ? age_group
                    : field === 'gender'
                      ? gender
                      : field === 'animal'
                        ? animal
                        : field === 'type'
                          ? type
                          : undefined,
                field === 'storage_reqs'
                  ? setStorageReqs
                  : field === 'age_group'
                    ? setAgeGroup
                    : field === 'gender'
                      ? setGender
                      : field === 'animal'
                        ? setAnimal
                        : field === 'type'
                          ? setType
                          : () => {},
              )}
            </View>
          ))}

          <View />
        </ScrollView>

        <View style={[styles.bottomBar, { backgroundColor: themeColors.background }]}>
          <Pressable style={styles.removeWrap} onPress={handleRemove} accessibilityRole="button">
            <Text style={styles.removeText}>Remove need</Text>
          </Pressable>

          <Button
            mode="contained"
            onPress={handleUpdate}
            disabled={!changed}
            style={styles.postButton}
            contentStyle={styles.postButtonContent}>
            Update Need
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    marginTop: 12,
  },
  multiline: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  pillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  pillText: {
    fontWeight: '600',
  },
  priorityDescription: {
    marginTop: 10,
  },
  postButton: {
    borderRadius: 24,
    minWidth: 100,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  removeWrap: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  removeText: {
    color: '#000',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    minHeight: 48,
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    width: '80%',
    maxHeight: '50%',
    borderRadius: 8,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
  },
  postButtonContent: {
    height: 40,
  },
});
