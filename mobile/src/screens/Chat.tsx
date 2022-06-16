import React, { useContext } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Channel, MessageInput, MessageList, Chat as StreamChatExpo } from 'stream-chat-expo';

import useChatClient from '@hooks/useChatClient';

import { AuthedUserContext } from '@navigation/Authed';
import { CommunityContext, TabsParamList } from '@navigation/Authed/Community';

const chatClient = StreamChat.getInstance(Constants.manifest?.extra?.streamChatApiKey);

export default function Chat(_props: NativeStackScreenProps<TabsParamList, 'Events'>) {
  const user = useContext(AuthedUserContext);
  const community = useContext(CommunityContext);

  const { clientIsReady } = useChatClient(user.chatUserId, user.chatToken);

  if (!clientIsReady) {
    return <Text>Loading</Text>;
  }
  const channel = chatClient.getChannelById('messaging', community.chatChannelId, {});

  return (
    <StreamChatExpo client={chatClient}>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </StreamChatExpo>
  );
}
