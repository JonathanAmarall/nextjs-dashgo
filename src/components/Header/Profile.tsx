import { Avatar } from '@chakra-ui/react';
import { Flex, Text, Box } from '@chakra-ui/layout';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Jonathan Amaral</Text>
          <Text color="gray.300" fontSize="small">
            jonathanAmaral@mail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Jonathan Amaral"
        src="https://github.com/jonathanAmarall.png"
      />
    </Flex>
  );
}
