import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Heading, VStack, Button, Box, Input, useToast } from 'native-base';

import { UnAuthedStackParamList } from '@navigation/UnAuthed';

// TODO: Google Authentication (https://dev.to/haydenbleasel/implementing-google-and-apple-login-hooks-with-expo-43-and-firebase-v9-pjm)

const auth = getAuth();
const VALIDATION_TOAST_ID = 'signup-not-valid-email-pw';

export default function SignUp({ navigation }: NativeStackScreenProps<UnAuthedStackParamList, 'SignUp'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  const handleClickSignUp = async () => {
    if (!email && !password) {
      if (!toast.isActive(VALIDATION_TOAST_ID)) {
        toast.show({
          id: VALIDATION_TOAST_ID,
          description: 'Please set your email and password',
          placement: 'top',
          backgroundColor: 'error.500',
        });
      }

      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Login');
    } catch (e) {
      console.error(e);

      toast.show({
        description: 'Please try again',
        placement: 'top',
        backgroundColor: 'error.500',
      });
    }
  };

  return (
    <Box width="100%" height="100%">
      <VStack my="1/3" space={4} alignItems="center">
        <Heading size="2xl">Knit</Heading>
        <VStack space={2} alignItems="center">
          <Input
            maxWidth="64"
            variant="underlined"
            size="lg"
            placeholder="email"
            onChangeText={setEmail}
            value={email}
          />
          <Input
            maxWidth="64"
            variant="underlined"
            size="lg"
            placeholder="password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </VStack>
        <Button onPress={handleClickSignUp}>Sign Up</Button>
      </VStack>
    </Box>
  );
}
