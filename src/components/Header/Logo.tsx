import { Text } from '@chakra-ui/layout';
export function Logo() {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      DashGO
      <Text as="span" ml="1" color="purple.500">
        .
      </Text>
    </Text>
  );
}
