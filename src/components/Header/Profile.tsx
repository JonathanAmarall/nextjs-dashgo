import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Jonathan Amaral</Text>
          <Text color="gray.300" fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}
      <Menu>
        <MenuButton>
          <Avatar
            size="md"
            name="Jonathan Amaral"
            src="https://github.com/jonathanAmarall.png"
          />
        </MenuButton>
        <MenuList bgColor="gray.800">
          <MenuItem>Minha conta</MenuItem>
          <MenuItem>Configurações</MenuItem>
          <MenuDivider />
          <MenuItem onClick={signOut}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
