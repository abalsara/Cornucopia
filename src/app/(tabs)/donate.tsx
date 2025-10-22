import ThemedView from "@/src/components/ThemedView";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function donate() {
  return (
    <ThemedView>
      <View style={styles.container}>
        <Text>Donate</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
