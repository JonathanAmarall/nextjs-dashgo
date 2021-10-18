import { Avatar } from '@chakra-ui/react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useContext(AuthContext);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Jonathan Amaral</Text>
          <Text color="gray.300" fontSize="small">
            {user.email}
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
