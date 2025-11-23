import { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, IconButton, Portal } from 'react-native-paper';

import NewNeedForm from '@/src/app/charity/(modals)/newNeedForm';
import ThemedView from '@/src/components/ThemedView';
import { lightColorScheme } from '@/src/styles/colors';

type NeedCard = {
  id: string;
  title: string;
  subtitle: string;
  status: 'Urgent' | 'High Priority' | 'Ongoing';
};

const EXAMPLE_NEEDS: { category: string; needs: NeedCard[] }[] = [
  {
    category: 'Food',
    needs: [
      { id: '1', title: 'Canned Beans', subtitle: 'Black and pinto beans', status: 'Urgent' },
      { id: '3', title: 'Rice', subtitle: 'Dry, white rice', status: 'Ongoing' },
    ],
  },
  {
    category: 'Clothing',
    needs: [
      { id: '4', title: 'Winter Jackets', subtitle: 'All sizes, clean', status: 'High Priority' },
      { id: '5', title: 'Socks', subtitle: 'New socks only', status: 'Ongoing' },
    ],
  },
  {
    category: 'Hygiene Products',
    needs: [
      { id: '6', title: 'Toothpaste', subtitle: 'Travel-sized tubes', status: 'Ongoing' },
      { id: '7', title: 'Sanitary Pads', subtitle: 'All sizes', status: 'High Priority' },
    ],
  },
  {
    category: 'Toys',
    needs: [
      { id: '8', title: 'Stuffed Animals', subtitle: 'Small to medium', status: 'Ongoing' },
      { id: '9', title: 'Puzzles', subtitle: 'Ages 3-8', status: 'High Priority' },
    ],
  },
];

const themeColors = lightColorScheme.colors;

const statusColors: Record<string, string> = {
  Urgent: themeColors.error,
  'High Priority': themeColors.warning,
  Ongoing: themeColors.secondary,
};

export default function Needs() {
  const [addNeedModalVisible, setAddNeedModalVisible] = useState(false);

  return (
    <ThemedView>
      <Portal.Host>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <View style={styles.titleBlock}>
              <Text variant="headlineLarge">Needs</Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Post your organization's current needs so donors know what to give
              </Text>
            </View>

            <IconButton
              icon="plus"
              size={28}
              accessibilityLabel="Add need"
              onPress={() => setAddNeedModalVisible(true)}
            />
          </View>

          {EXAMPLE_NEEDS.map((section) => (
            <View key={section.category} style={styles.sectionBlock}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                {section.category}
              </Text>

              {section.needs.map((need) => (
                <Card key={need.id} style={styles.card} mode="elevated">
                  <Card.Title
                    title={need.title}
                    subtitle={need.subtitle}
                    right={() => (
                      <View style={styles.statusContainer}>
                        <Text style={[styles.statusText, { color: statusColors[need.status] }]}>
                          {need.status}
                        </Text>
                      </View>
                    )}
                  />
                </Card>
              ))}
            </View>
          ))}
        </ScrollView>
        <Portal>
          {addNeedModalVisible && (
            <NewNeedForm
              onClose={() => setAddNeedModalVisible(false)}
              onPost={(payload) => {
                console.log('New need posted:', payload);
                setAddNeedModalVisible(false);
              }}
            />
          )}
        </Portal>
      </Portal.Host>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleBlock: {
    flex: 1,
    paddingRight: 8,
  },
  subtitle: {
    marginTop: 6,
    color: '#616161',
  },
  sectionBlock: {
    marginTop: 18,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  card: {
    width: '100%',
    marginVertical: 8,
    alignSelf: 'stretch',
    minHeight: 72,
    overflow: 'hidden',
  },
  cardSubtitle: {
    marginTop: 6,
    color: '#616161',
  },
  statusText: {
    marginTop: 0,
    fontWeight: '600',
  },
  statusContainer: {
    minWidth: 98,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});
