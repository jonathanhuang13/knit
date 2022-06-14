import React, { createContext, useContext } from 'react';

import FeatherIcons from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CommunityBasicsFragment } from '@graphql/generated';

import { AuthedStackParamList } from '@navigation/Authed';
import Chat from '@screens/Chat';
import Events from '@screens/Events';

export type TabsParamList = {
  Events: undefined;
  Chat: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function Community(props: NativeStackScreenProps<AuthedStackParamList, 'Community'>) {
  const { community } = props.route.params;

  return (
    <CommunityContext.Provider value={community}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Events') {
              return focused ? (
                <FeatherIcons name="calendar" color="blue" size={24} />
              ) : (
                <FeatherIcons name="calendar" color="black" size={24} />
              );
            }

            if (route.name === 'Chat') {
              return focused ? (
                <Ionicons name="chatbubble" color="blue" size={24} />
              ) : (
                <Ionicons name="chatbubble-outline" size={24} />
              );
            }
          },
        })}
      >
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="Chat" component={Chat} />
      </Tab.Navigator>
    </CommunityContext.Provider>
  );
}

export const CommunityContext = createContext<CommunityBasicsFragment>({} as CommunityBasicsFragment);
