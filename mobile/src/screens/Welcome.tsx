import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UnAuthedStackParamList } from '@navigation/UnAuthed';

export default function Welcome({ navigation }: NativeStackScreenProps<UnAuthedStackParamList, 'Welcome'>) {
  return (
    <View style={styles.container}>
      <Text>Welcome screen!</Text>
      <View style={styles.buttons}>
        <Button title="Sign in" onPress={() => navigation.navigate('SignIn')} />
        <Button title="Sign up" onPress={() => navigation.navigate('SignUp')} />
      </View>
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
  buttons: {
    flex: 1,
  },
});
