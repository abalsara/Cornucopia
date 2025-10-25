import { useRouter } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function HowDonationWorksScreen() {
  const router = useRouter();

  const handleBackPress = (): void => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <IconButton
        icon="arrow-left"
        size={28}
        onPress={handleBackPress}
        style={styles.backButton}
      />

      {/* Title */}
      <Text style={styles.title}>How Donation Works</Text>

      {/* Step 1 */}
      <View style={styles.step}>
        <Text style={styles.stepNumber}>1</Text>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Find a charity</Text>
          <Text style={styles.stepDescription}>
            Browse local charities & filter by cause, location or reviews.
          </Text>
        </View>
        <IconButton icon="home-heart" size={28} />
      </View>

      {/* Step 2 */}
      <View style={styles.step}>
        <Text style={styles.stepNumber}>2</Text>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Select items to donate</Text>
          <Text style={styles.stepDescription}>
            Choose from their current needs list.
          </Text>
        </View>
        <IconButton icon="hand-pointing-up" size={28} />
      </View>

      {/* Step 3 */}
      <View style={styles.step}>
        <Text style={styles.stepNumber}>3</Text>
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>Schedule drop off</Text>
          <Text style={styles.stepDescription}>
            Pick a convenient time slot to deliver your donation.
          </Text>
        </View>
        <IconButton icon="calendar" size={28} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  stepDescription: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
});
