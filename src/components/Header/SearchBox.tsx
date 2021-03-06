import { Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';
import { useState, useRef } from 'react';

export function SearchBox() {
  // const [search, setSearch] = useState('');
  // const searchInputRef = useRef<HTMLInputElement>(null);
  // searchInputRef.current.value;

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth="400"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        // ref={searchInputRef}
        color="gray.50"
        variant="unstyled"
        paddingX="4"
        marginRight="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
        // value={search}
        // onChange={(event) => setSearch(event.target.value)}
      />
    </Flex>
  );
}
