import Icon from '@chakra-ui/icon';
import { Link, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/layout';
import { ElementType } from 'react';

interface NavLinkProps extends ChakraLinkProps {
  children: string;
  icon: ElementType;
}

export function NavLink({ children, icon, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" alignContent="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
