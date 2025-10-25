import { emailIsValid, validatePassword } from '@/src/util/auth';
import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import ThemedView from '../../components/ThemedView';
import { supabase } from '../../lib/supabase';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    Keyboard.dismiss();
    // validate names and addresses are defined
    if (firstName === '') {
      Alert.alert('First name cannot be empty');
      return;
    }
    if (lastName === '') {
      Alert.alert('Last name cannot be empty');
      return;
    }
    if (!emailIsValid(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }
    // validate password
    const passwordError = validatePassword(password);
    if (passwordError !== '') {
      Alert.alert(passwordError);
      return;
    }
    // validate confirm password matches
    if (password !== confirmPassword) {
      Alert.alert('Your password do not match');
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <ThemedView>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.inline]}>
          <TextInput
            label="First name"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            style={{ flex: 1, marginRight: 2 }}
          />
          <TextInput
            label="Last name"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            style={{ flex: 1, marginLeft: 2 }}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput
            label="Email address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput
            label="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput
            label="Confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button disabled={loading} onPress={() => signUpWithEmail()} mode="contained">
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
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  inline: {
    flexDirection: 'row',
  },
  firstNameInput: {
    flex: 1,
  },
});
