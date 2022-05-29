import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function SignUp({ navigation }: NativeStackScreenProps<any>) {
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
      navigation.navigate('Sign In');
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
