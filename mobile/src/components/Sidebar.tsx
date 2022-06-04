import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Box, Center, HStack, Heading, Pressable, Square, Text, VStack, useTheme } from 'native-base';

import { SidebarCommunityFragment } from '@graphql/generated';

import { AuthedStackParamList } from '@navigation/Authed';

interface Props extends DrawerContentComponentProps {
  adminCommunities: SidebarCommunityFragment[];
  memberCommunities: SidebarCommunityFragment[];
}

export default function Sidebar(props: Props) {
  return (
    <DrawerContentScrollView {...props}>
      <CommunitySidebarGroup heading="Communities (Admin)" communities={props.adminCommunities} {...props} />
      <CommunitySidebarGroup
        heading="Communities (Member)"
        communities={props.memberCommunities}
        {...props}
      />
    </DrawerContentScrollView>
  );
}

interface CommunitySidebarGroupProps extends DrawerContentComponentProps {
  heading: string;
  communities: SidebarCommunityFragment[];
}

function CommunitySidebarGroup(props: CommunitySidebarGroupProps) {
  const { communities, heading } = props;
  if (communities.length === 0) return null;

  return (
    <VStack>
      <Heading size="md" ml="2" mb="4">
        {heading}
      </Heading>
      {communities.map((c, i) => (
        <Box key={i}>
          <CommunitySidebarItem community={c} {...props} />
        </Box>
      ))}
    </VStack>
  );
}

interface CommunitySidebarItemProps extends DrawerContentComponentProps {
  community: SidebarCommunityFragment;
}

function CommunitySidebarItem(props: CommunitySidebarItemProps) {
  const { community, navigation, state } = props;

  const currentRouteParams = state.routes[0].params as AuthedStackParamList['Home'] | undefined;
  const isActive = currentRouteParams ? currentRouteParams.community.id === community.id : false;

  return (
    <Pressable
      onPress={() => {
        navigation.closeDrawer();
        navigation.navigate('Home', { community });
      }}
    >
      <HStack height="16" p="2" alignItems="center" backgroundColor={isActive ? 'coolGray.100' : 'white'}>
        <Square
          size="12"
          borderWidth="1"
          borderColor="gray.400"
          borderStyle="solid"
          borderRadius="4"
          mr="2"
          backgroundColor="secondary.200"
        >
          <Heading size="sm">{getInitials(community.name)}</Heading>
        </Square>
        <Heading size="sm">{community.name}</Heading>
      </HStack>
    </Pressable>
  );
}

function getInitials(name: string): string {
  const matches = name.match(/\b(\w)/g);
  if (!matches) return '';

  return matches.join('').substring(0, 2);
}
