import ThemedView from "@/src/components/ThemedView";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function Auth() {
  const router = useRouter();

  return (
    <ThemedView>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/app-icon.jpg")}
          style={styles.image}
        />
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button onPress={() => router.push("/auth/login")} mode="outlined">
            login
          </Button>
        </View>
        <View style={styles.verticallySpaced}>
          <Button onPress={() => router.push("/auth/signUp")} mode="outlined">
            Sign up
          </Button>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});
