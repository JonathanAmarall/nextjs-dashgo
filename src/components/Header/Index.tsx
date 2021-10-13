import { Flex } from '@chakra-ui/layout';
import { Profile } from './Profile';
import { NavigationsNav } from './NotificationsNav';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useSideBarDrawer } from '../../contexts/SidebarDrawerContext';
import { IconButton } from '@chakra-ui/button';
import { RiMenuLine } from 'react-icons/ri';
import Icon from '@chakra-ui/icon';

export function Header() {
  const { onOpen } = useSideBarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth="1480"
      h="20"
      mx="auto"
      mt="4"
      px="4"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="3"
          aria-label="Open navigation"
        ></IconButton>
      )}
      <Logo />
      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NavigationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
