import {View, Text, StyleSheet} from 'react-native';

export default function charities() {
  return (
    <View style={styles.container}>
      <Text>Charities</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});