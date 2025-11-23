import { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Modal } from 'react-native';
import { Text, IconButton, TextInput, Button } from 'react-native-paper';

import { lightColorScheme } from '@/src/styles/colors';

type Priority = 'Urgent' | 'High Priority' | 'Ongoing';

type Props = {
  onClose: () => void;
  onPost?: (payload: {
    title: string;
    description: string;
    category: string | null;
    priority: Priority | null;
  }) => void;
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

const themeColors = lightColorScheme.colors;

const statusColors: Record<Priority, string> = {
  Urgent: themeColors.error,
  'High Priority': themeColors.warning,
  Ongoing: themeColors.secondary,
};

const PRIMARY_PILL = themeColors.primary;
const UNSELECTED_PILL = themeColors.surfaceVariant;
const UNSELECTED_TEXT = themeColors.onSurface;

export default function NewNeedForm({ onClose, onPost }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string | null>('Food');
  const [priority, setPriority] = useState<Priority | null>('Urgent');

  const priorityDescriptions: Record<Priority, string> = {
    Urgent: 'This item is needed within 24 hours',
    'High Priority': 'This item is needed within the week',
    Ongoing: 'This item is needed on an ongoing basis',
  };

  const handlePost = () => {
    onPost?.({ title, description, category, priority });
    onClose();
  };

  return (
    <Modal visible transparent={false} animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.headerTitle}>
            New Need
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
              {NEED_CATEGORIES.map((categoryName) => {
                const selected = categoryName === category;
                return (
                  <Pressable
                    key={categoryName}
                    onPress={() => setCategory(selected ? null : categoryName)}
                    style={[
                      styles.pill,
                      { backgroundColor: selected ? PRIMARY_PILL : UNSELECTED_PILL },
                    ]}>
                    <Text style={[styles.pillText, { color: selected ? '#fff' : UNSELECTED_TEXT }]}>
                      {categoryName}
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
              {(['Urgent', 'High Priority', 'Ongoing'] as Priority[]).map((priorityLevel) => {
                const selected = priorityLevel === priority;
                return (
                  <Pressable
                    key={priorityLevel}
                    onPress={() => setPriority(selected ? null : priorityLevel)}
                    style={[
                      styles.pill,
                      {
                        backgroundColor: selected ? statusColors[priorityLevel] : UNSELECTED_PILL,
                      },
                    ]}>
                    <Text style={[styles.pillText, { color: selected ? '#fff' : UNSELECTED_TEXT }]}>
                      {priorityLevel}
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

        <Button mode="contained" onPress={handlePost} style={styles.postButton}>
          Post
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
});
