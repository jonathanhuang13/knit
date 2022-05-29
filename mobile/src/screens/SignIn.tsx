import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { UnAuthedStackParamList } from '@navigation/UnAuthed';

const auth = getAuth();

export default function SignIn({ navigation }: NativeStackScreenProps<UnAuthedStackParamList, 'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();

  const handleClickSignIn = async () => {
    if (!email && !password) {
      setError('Email and password are mandatory.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError('Error signing up');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Sign in screen!</Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="email" />
      <TextInput onChangeText={setPassword} value={password} secureTextEntry placeholder="password" />

      <Button title="Sign Up" onPress={handleClickSignIn} />
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
