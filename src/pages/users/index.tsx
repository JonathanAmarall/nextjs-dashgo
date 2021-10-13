import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from '@chakra-ui/react';

import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header/Index';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';

export default function UserList() {
  const isLoading = true;
  const isFetching = false;
  return (
    <Box>
      <Header />
      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Button
              as="a"
              size="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} />}
              fontSize="20"
            >
              Criar novo
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color="gray.300" width="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuário</Th>
                <Th>Data de cadastro</Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={['4', '4', '6']}>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Box>
                    <Link color="purple.400" onMouseEnter={() => {}}>
                      {' '}
                      Jonathan Amaral
                    </Link>
                    <Text fontSize="sm" color="gray.300">
                      itsjon@gmail.com
                    </Text>
                  </Box>
                </Td>
                <Td>14/10/2021</Td>
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} />}
                    fontSize="16"
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination
            totalCountOfRegisters={10}
            currentPage={1}
            onPageChange={() => {}}
          />
        </Box>
      </Flex>
    </Box>
  );
}
