import { AuthProvider } from './AuthContext';
import { SideBarDrawerProvider } from './SidebarDrawerContext';

export function GlobalContextProvider({ children }) {
  return (
    <AuthProvider>
      <SideBarDrawerProvider>{children}</SideBarDrawerProvider>
    </AuthProvider>
  );
}
