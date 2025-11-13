import { Button, Text } from 'react-native-paper';

import ThemedView from '@/src/components/ThemedView';
import { supabase } from '@/src/lib/supabase';

export default function Profile() {
  const handleLogOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      throw new Error(`An unexpected error occured while logging out: ${error}`);
    }
  };
  return (
    <ThemedView>
      <Text>Edit app/charity/(tabs)/profile.tsx to modify this page</Text>
      <Button onPress={handleLogOut}>Log out</Button>
    </ThemedView>
  );
}
