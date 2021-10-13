import { Avatar } from '@chakra-ui/react';
import { Flex, Text, Box } from '@chakra-ui/layout';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Jonathan Amaral</Text>
        <Text color="gray.300" fontSize="small">
          jonathanAmaral@mail.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Jonathan Amaral"
        src="https://github.com/jonathanAmarall.png"
      />
    </Flex>
  );
}
