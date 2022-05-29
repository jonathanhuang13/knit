import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { UnAuthedStackParamList } from '@navigation/UnAuthed';

// TODO: Google Authentication (https://dev.to/haydenbleasel/implementing-google-and-apple-login-hooks-with-expo-43-and-firebase-v9-pjm)

const auth = getAuth();

export default function SignUp({ navigation }: NativeStackScreenProps<UnAuthedStackParamList, 'SignUp'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();

  const handleClickSignUp = async () => {
    if (!email && !password) {
      setError('Email and password are mandatory.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('SignIn');
    } catch (e) {
      console.error(e);
      setError('Error signing up');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign up screen!!</Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="email" />
      <TextInput onChangeText={setPassword} value={password} secureTextEntry placeholder="password" />

      <Button title="Sign Up" onPress={handleClickSignUp} />
      {error && <Text>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
