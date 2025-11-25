import { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Modal } from 'react-native';
import { Text, IconButton, TextInput, Button, useTheme } from 'react-native-paper';

import { NeedPayload, Priority } from './newNeedForm';

type Props = {
  onClose: () => void;
  initial: NeedPayload;
  onUpdate?: (payload: NeedPayload) => void;
  onRemove?: () => void;
};

const NEED_CATEGORIES = [
  'Food',
  'Clothing',
  'Hygiene Products',
  'Household goods',
  'Furniture',
  'Toys',
  'Medical supplies',
  'School supplies',
  'Animal Care supplies',
  'Electronics',
  'Sports Equipment',
  'Uncategorized',
];

export default function EditNeedForm({ onClose, initial, onUpdate, onRemove }: Props) {
  const [title, setTitle] = useState(initial.title ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [category, setCategory] = useState<string | null>(initial.category ?? 'Food');
  const [priority, setPriority] = useState<Priority | null>(initial.priority ?? 'Urgent');

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

  // "changed" determines whether the Update button should be enabled. This
  // prevents sending updates when the user hasn't changed any fields.
  const changed = useMemo(() => {
    return (
      title !== (initial.title ?? '') ||
      description !== (initial.description ?? '') ||
      category !== (initial.category ?? null) ||
      priority !== (initial.priority ?? null)
    );
  }, [title, description, category, priority, initial]);

  const handleUpdate = () => {
    if (!changed) return;
    onUpdate?.({ title, description, category, priority });
    onClose();
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
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Description"
            placeholder="Winter coats for boys ages 5-12. Gently used or new."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={[styles.input, styles.multiline]}
          />

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
                    onPress={() => setCategory(selected ? null : c)}
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
              {(['Urgent', 'High Priority', 'Ongoing'] as Priority[]).map((p) => {
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

          <View style={{ height: 24 }} />
        </ScrollView>

        <Pressable style={styles.removeWrap} onPress={handleRemove} accessibilityRole="button">
          <Text style={styles.removeText}>Remove need</Text>
        </Pressable>

        <Button
          mode="contained"
          onPress={handleUpdate}
          disabled={!changed}
          style={styles.postButton}>
          Update Need
        </Button>
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
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 24,
    minWidth: 100,
  },
  removeWrap: {
    position: 'absolute',
    left: 20,
    bottom: 28,
  },
  removeText: {
    color: '#000',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
