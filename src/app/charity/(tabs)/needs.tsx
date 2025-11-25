import { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, IconButton, Portal, useTheme } from 'react-native-paper';

import EditNeedForm from '@/src/app/charity/(modals)/editNeedForm';
import NewNeedForm, { type NeedPayload } from '@/src/app/charity/(modals)/newNeedForm';
import ThemedView from '@/src/components/ThemedView';
import { getAdminByUid } from '@/src/lib/admin';
import { insertNeed } from '@/src/lib/needs';
import { getCurrentUserId } from '@/src/lib/userId';

type NeedCard = {
  id: string;
  title: string;
  subtitle: string;
  status: 'Urgent' | 'High Priority' | 'Ongoing' | 'Low';
};

const EXAMPLE_NEEDS: { title: string; needs: NeedCard[] }[] = [
  {
    title: 'Food',
    needs: [
      { id: '1', title: 'Canned Beans', subtitle: 'Black and pinto beans', status: 'Urgent' },
      { id: '3', title: 'Rice', subtitle: 'Dry, white rice', status: 'Ongoing' },
    ],
  },
  {
    title: 'Clothing',
    needs: [
      { id: '4', title: 'Winter Jackets', subtitle: 'All sizes, clean', status: 'High Priority' },
      { id: '5', title: 'Socks', subtitle: 'New socks only', status: 'Ongoing' },
    ],
  },
  {
    title: 'Hygiene Products',
    needs: [
      { id: '6', title: 'Toothpaste', subtitle: 'Travel-sized tubes', status: 'Ongoing' },
      { id: '7', title: 'Sanitary Pads', subtitle: 'All sizes', status: 'High Priority' },
    ],
  },
  {
    title: 'Toys',
    needs: [
      { id: '8', title: 'Stuffed Animals', subtitle: 'Small to medium', status: 'Ongoing' },
      { id: '9', title: 'Puzzles', subtitle: 'Ages 3-8', status: 'High Priority' },
    ],
  },
];

// Theme-aware colors are computed inside the component using `useTheme()`.

export default function Needs() {
  const [showPostNeedForm, setShowPostNeedForm] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<NeedPayload | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const theme = useTheme();
  const themeColors = theme.colors;

  const statusColors: Record<string, string> = {
    Urgent: themeColors.error,
    'High Priority': 'rgb(220, 163, 17)',
    Ongoing: themeColors.secondary,
  };

  useEffect(() => {
    const fetchCid = async () => {
      try {
        const userId = await getCurrentUserId();
        if (!userId) throw new Error('User ID not found');
        const admin = await getAdminByUid(userId);
        if (!admin || !admin.cid) throw new Error('Admin not found for user ID');
        setCid(admin.cid);
      } catch (error) {
        console.error('Error fetching CID:', error);
      }
    };
    fetchCid();
  }, []);

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
              accessibilityLabel="Post need"
              onPress={() => setShowPostNeedForm(true)}
            />
          </View>

          {EXAMPLE_NEEDS.map((section) => (
            <View key={section.title} style={styles.sectionBlock}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                {section.title}
              </Text>

              {section.needs.map((need) => (
                <Card
                  key={need.id}
                  style={styles.card}
                  mode="elevated"
                  // Opens the edit need modal
                  onPress={() =>
                    setSelectedNeed({
                      cid: cid || '',
                      item_name: need.title,
                      notes: need.subtitle,
                      category: section.title,
                      priority: need.status,
                    })
                  }>
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
          {showPostNeedForm && cid && (
            <NewNeedForm
              cid={cid}
              onClose={() => setShowPostNeedForm(false)}
              onPost={async (payload) => {
                // TODO: persist `payload` and update list
                const userId = await getCurrentUserId();
                if (userId) {
                  await insertNeed(payload);
                }
                setShowPostNeedForm(false);
              }}
            />
          )}

          {selectedNeed && (
            <EditNeedForm
              initial={selectedNeed}
              onClose={() => setSelectedNeed(null)}
              onUpdate={(payload) => {
                // TODO: persist `payload` and update list
                setSelectedNeed(null);
              }}
              onRemove={() => {
                // TODO: delete selectedNeed and update list
                setSelectedNeed(null);
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
    color: '#888',
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
