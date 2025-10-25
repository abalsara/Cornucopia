import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Button, PaperProvider, Text } from 'react-native-paper';

import { authColorScheme, lightColorScheme } from '@/src/styles/colors';
import { authTheme } from '@/src/styles/themes';

const primaryColor = lightColorScheme.colors.primary;

export default function Auth() {
  const router = useRouter();

  return (
    <PaperProvider theme={authTheme}>
      <View style={styles.layout}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/images/app-icon.jpg')}
            style={[styles.image, styles.mt20]}
          />
          <Text variant="displayLarge" style={[styles.text, styles.mt20, styles.brandName]}>
            Cornucopia
          </Text>
          <Text variant="titleLarge" style={[styles.text, styles.mt10]}>
            Streamlining donations from
          </Text>
          <Text variant="titleLarge" style={styles.text}>
            start to finish
          </Text>

          <View style={[styles.buttonWrapper, styles.mt20]}>
            <Button
              onPress={() => router.push('/auth/signUp')}
              labelStyle={styles.buttonText}
              contentStyle={styles.buttonContent}>
              Create an Account
            </Button>
          </View>
          <View style={[styles.mt20, styles.inline]}>
            <Text variant="titleLarge">Already have an account? </Text>
            <Pressable onPress={() => router.push('/auth/login')}>
              <Text variant="titleLarge" style={styles.login}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 12,
  },
  layout: {
    backgroundColor: authColorScheme.colors.background,
    flex: 1,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'light',
  },
  buttonContent: {
    height: 60,
  },
  buttonWrapper: {
    borderWidth: 3,
    borderColor: primaryColor,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 40,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  brandName: {
    color: primaryColor,
  },
  text: {
    alignSelf: 'center',
  },
  login: {
    color: authColorScheme.colors.primary,
    textDecorationLine: 'underline',
  },
});
