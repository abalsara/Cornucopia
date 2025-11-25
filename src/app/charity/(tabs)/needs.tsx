import { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, IconButton, Portal, useTheme } from 'react-native-paper';

import EditNeedForm from '@/src/app/charity/(modals)/editNeedForm';
import NewNeedForm, { type NeedPayload } from '@/src/app/charity/(modals)/newNeedForm';
import ThemedView from '@/src/components/ThemedView';
import { getAdminByUid } from '@/src/lib/admin';
import { insertNeed, getCharityNeeds } from '@/src/lib/needs';
import { getCurrentUserId } from '@/src/lib/userId';

type NeedCard = {
  id: string;
  title: string;
  subtitle: string;
  status: 'Urgent' | 'High Priority' | 'Ongoing' | 'Low';
};

// Theme-aware colors are computed inside the component using `useTheme()`.

export default function Needs() {
  const [showPostNeedForm, setShowPostNeedForm] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<NeedPayload | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  const [needsSections, setNeedsSections] = useState<{ title: string; needs: NeedCard[] }[]>([]);

  const theme = useTheme();
  const themeColors = theme.colors;

  const statusColors: Record<string, string> = {
    Urgent: themeColors.error,
    'High Priority': 'rgb(220, 163, 17)',
    Ongoing: themeColors.secondary,
    Low: themeColors.primary,
  };

  const loadNeeds = useCallback(async (charityId: string) => {
    try {
      const fetchedNeeds = await getCharityNeeds(charityId);

      // Group flat list by category
      const groups: Record<string, NeedCard[]> = {};

      fetchedNeeds.forEach((item) => {
        const category = item.category || 'Uncategorized';
        if (!groups[category]) {
          groups[category] = [];
        }

        groups[category].push({
          id: item.item_id,
          title: item.itemName,
          subtitle: item.notes || '',
          // Cast urgency to known status types, defaulting to Low if unknown
          status: (item.priority as NeedCard['status']) || 'Low',
        });
      });

      // Convert groups to array of sections
      const sections = Object.keys(groups).map((key) => ({
        title: key,
        needs: groups[key],
      }));

      setNeedsSections(sections);
    } catch (error) {
      console.error('Error loading needs:', error);
    }
  }, []);

  useEffect(() => {
    const fetchCid = async () => {
      try {
        const userId = await getCurrentUserId();
        if (!userId) throw new Error('User ID not found');
        const admin = await getAdminByUid(userId);
        if (!admin || !admin.cid) throw new Error('Admin not found for user ID');

        setCid(admin.cid);
        // Fetch needs once we have the CID
        await loadNeeds(admin.cid);
      } catch (error) {
        console.error('Error fetching CID:', error);
      }
    };
    fetchCid();
  }, [loadNeeds]);

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

          {needsSections.length === 0 ? (
            <Text style={{ marginTop: 20, textAlign: 'center', color: '#888' }}>
              No needs posted yet.
            </Text>
          ) : (
            needsSections.map((section) => (
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
                        category: section.title, // Note: section.title is the category name
                        priority: need.status,
                        // Note: Assuming we might want to pass ID or other fields for editing later
                      })
                    }>
                    <Card.Title
                      title={need.title}
                      subtitle={need.subtitle}
                      right={() => (
                        <View style={styles.statusContainer}>
                          <Text
                            style={[
                              styles.statusText,
                              { color: statusColors[need.status] || statusColors['Low'] },
                            ]}>
                            {need.status}
                          </Text>
                        </View>
                      )}
                    />
                  </Card>
                ))}
              </View>
            ))
          )}
        </ScrollView>
        <Portal>
          {showPostNeedForm && cid && (
            <NewNeedForm
              cid={cid}
              onClose={() => setShowPostNeedForm(false)}
              onPost={async (payload) => {
                const userId = await getCurrentUserId();
                if (userId) {
                  await insertNeed(payload);
                  // Refresh list after insert
                  await loadNeeds(cid);
                }
                setShowPostNeedForm(false);
              }}
            />
          )}

          {selectedNeed && (
            <EditNeedForm
              initial={selectedNeed}
              onClose={() => setSelectedNeed(null)}
              onUpdate={async (payload) => {
                // TODO: persist `payload`
                if (cid) await loadNeeds(cid);
                setSelectedNeed(null);
              }}
              onRemove={async () => {
                // TODO: delete selectedNeed
                if (cid) await loadNeeds(cid);
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
