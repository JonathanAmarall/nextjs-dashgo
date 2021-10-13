import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';
import { HStack } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';

export function NavigationsNav() {
  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
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
