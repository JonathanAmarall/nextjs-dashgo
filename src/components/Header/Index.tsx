import { Flex } from '@chakra-ui/layout';
import { Profile } from './Profile';
import { NavigationsNav } from './NotificationsNav';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';

export function Header() {
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
      <Logo />

      <SearchBox />

      <Flex align="center" ml="auto">
        <NavigationsNav />

        <Profile />
      </Flex>
    </Flex>
  );
}
