import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';
import { HStack } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';

export function NavigationsNav() {
  return (
    <HStack
      spacing="8"
      mx="8"
      pr="8"
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={RiNotificationLine} />
      <Icon as={RiUserAddLine} />
    </HStack>
  );
}
