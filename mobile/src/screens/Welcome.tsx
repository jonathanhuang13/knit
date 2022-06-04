import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heading, VStack, Button, Center } from 'native-base';

import { UnAuthedStackParamList } from '@navigation/UnAuthed';

export default function Welcome({ navigation }: NativeStackScreenProps<UnAuthedStackParamList, 'Welcome'>) {
  return (
    <Center width="100%" height="100%">
      <VStack space={4} alignItems="center">
        <Heading size="2xl">Knit</Heading>
        <VStack space={2} alignItems="center">
          <Button onPress={() => navigation.navigate('SignUp')}>Create an account</Button>
          <Button variant="link" onPress={() => navigation.navigate('Login')}>
            Log in
          </Button>
        </VStack>
      </VStack>
    </Center>
  );
}
