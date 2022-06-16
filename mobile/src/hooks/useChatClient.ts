import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(Constants.manifest?.extra?.streamChatApiKey);

export default function useChatClient(streamUserId: string, token?: string) {
  const [clientIsReady, setClientIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(
          { id: streamUserId },
          token ?? chatClient.devToken(streamUserId.toString()),
        );
        setClientIsReady(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error occurred while connecting the user: ${error.message}`);
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
  };
}
