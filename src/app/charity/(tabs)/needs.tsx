import { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, IconButton, Portal, useTheme } from 'react-native-paper';

import EditNeedForm from '@/src/app/charity/(modals)/editNeedForm';
import NewNeedForm, { type NeedPayload } from '@/src/app/charity/(modals)/newNeedForm';
import ThemedView from '@/src/components/ThemedView';
import { getAdminByUid } from '@/src/lib/admin';
import { insertNeed, getCharityNeeds, editNeed } from '@/src/lib/needs';
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

  const [needsData, setNeedsData] = useState<any[]>([]);

  const loadNeeds = useCallback(async (charityId: string) => {
    try {
      const fetchedNeeds = await getCharityNeeds(charityId);
      setNeedsData(fetchedNeeds);

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
              <Text variant="headlineLarge" style={styles.headerTitle}>
                Needs
              </Text>
              <Text
                variant="bodyMedium"
                style={[styles.subtitle, { color: theme.colors.onBackground }]}>
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
                    onPress={() => {
                      const fullNeedData = needsData.find((n) => n.item_id === need.id);
                      if (fullNeedData) {
                        setSelectedNeed({
                          cid: cid || '',
                          item_name: fullNeedData.itemName,
                          notes: fullNeedData.notes,
                          category: fullNeedData.category,
                          priority: fullNeedData.priority,
                          quantity: fullNeedData.quantity,
                          unit: fullNeedData.unit,
                          type: fullNeedData.type,
                          animal: fullNeedData.animal,
                          gender: fullNeedData.gender,
                          age_group: fullNeedData.ageGroup,
                          storage_reqs: fullNeedData.storageRequirement,
                        });
                      }
                    }}>
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
                try {
                  const needData = needsData.find(
                    (n) =>
                      n.itemName === selectedNeed.item_name && n.category === selectedNeed.category,
                  );
                  if (needData && cid) {
                    const table = needData.category;
                    const body = {
                      item_id: needData.item_id,
                      ...payload,
                    };
                    await editNeed(cid, table, body as any, false);
                    await loadNeeds(cid);
                  }
                } catch (error) {
                  console.error('Error updating need:', error);
                }
                setSelectedNeed(null);
              }}
              onRemove={async () => {
                try {
                  const needData = needsData.find(
                    (n) =>
                      n.itemName === selectedNeed.item_name && n.category === selectedNeed.category,
                  );
                  if (needData && cid) {
                    const table = needData.category;
                    const body = {
                      item_id: needData.item_id,
                    };
                    await editNeed(cid, table, body as any, true);
                    await loadNeeds(cid);
                  }
                } catch (error) {
                  console.error('Error removing need:', error);
                }
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
  headerTitle: {
    fontWeight: '500',
  },
  titleBlock: {
    flex: 1,
    paddingRight: 8,
  },
  subtitle: {
    marginTop: 6,
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
