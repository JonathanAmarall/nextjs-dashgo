import { Flex } from '@chakra-ui/layout';
import { Button, Stack, FormControl } from '@chakra-ui/react';
import { Input } from '../components/Form/Input';

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        w="100%"
        maxW="360px"
        bg="gray.800"
        p="8"
        borderRadius="8px"
        flexDir="column"
      >
        <Stack spacing="4">
          <FormControl>
            <Input name="email" type="text" label="E-mail" />
          </FormControl>
          <FormControl>
            <Input name="password" type="text" label="Password" />
          </FormControl>
        </Stack>
        <Button type="submit" mt="6" colorScheme="purple" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
