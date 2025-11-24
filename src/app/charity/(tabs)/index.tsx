import { useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native-paper';

import CenteredActivityIndicator from '@/src/components/CenteredActivityIndicator';
import ThemedView from '@/src/components/ThemedView';
import ScheduledDonationCardList from '@/src/components/lists/ScheduledDonationCardList';
import { getCharityByAdmin } from '@/src/lib/charities';
import { Donation, fetchDonations, getScheduledDonations } from '@/src/lib/donation';
import { fetchNeedsByAdmin, getCharityNeeds } from '@/src/lib/needs';
import { supabase } from '@/src/lib/supabase';
import { DonationItem } from '@/src/types/DonationItem/DonationItem.types';
import { ScheduledDonation } from '@/src/types/DonationItem/ScheduledDonation';

export default function Donations() {
  const [loading, setLoading] = useState(true);
  const [cid, setCid] = useState<string | null>(null);
  const [needs, setNeeds] = useState<DonationItem[]>([]);
  const [donations, setDonations] = useState<ScheduledDonation[]>([]);

  // set donation state
  useFocusEffect(() => {
    getScheduledDonations().then((scheduledDonations) => {
      console.log('focused');
      setDonations(scheduledDonations);
      setLoading(false);
    });

    // const getNeeds = fetchNeedsByAdmin().then((adminNeeds) => {
    //   setCid(adminNeeds.cid);
    //   setNeeds(adminNeeds.needs);
    // });

    // supabase.auth.getUser().then((user) => getCharityByAdmin(user.data.user?.id));
    // fetchDonations().then((donationsResponse) => {
    //   setDonations(donationsResponse);
    //   setLoading(false);
    // });
  });

  if (loading) {
    return (
      <ThemedView>
        <CenteredActivityIndicator />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <ScheduledDonationCardList scheduledDonations={donations} />
    </ThemedView>
  );
}
