import { Box, Stack } from '@chakra-ui/layout';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink href="/users" icon={RiContactsLine}>
          Usuários
        </NavLink>
        <NavLink href="/dashboard2" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
      </NavSection>
      <Box>
        <NavSection title="AUTOMAÇÃO">
          <NavLink href="/formularios" icon={RiInputMethodLine}>
            Formulários
          </NavLink>
          <NavLink href="/automacao" icon={RiGitMergeLine}>
            Automação
          </NavLink>
        </NavSection>
      </Box>
    </Stack>
  );
}
