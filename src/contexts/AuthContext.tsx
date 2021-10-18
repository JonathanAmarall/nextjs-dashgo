import React from 'react';
import { setCookie } from 'nookies';
import { useToast } from '@chakra-ui/react';
import { createContext, ReactNode, useState } from 'react';
import { api } from '../services/api';

interface User {
  email: string;
  roles: string[];
  permissions: string[];
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<boolean>;
  isAthenticated: boolean;
  user?: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const toast = useToast();
  const toastIdRef = React.useRef<any>();

  const isAthenticated = !!user;
  async function signIn({
    email,
    password,
  }: SignInCredentials): Promise<boolean> {
    try {
      const response = await api.post<any>('sessions', { email, password });
      const { token, refreshToken, roles, permissions } = response.data;

      if (response.status == 200) {
        setCookie(undefined, 'nextauth.token', token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/', // caminhos da app que tem permissao ao cookie
        });
        setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/', // caminhos da app que tem permissao ao cookie
        });

        setUser({ email, permissions, roles });
      }
      toastIdRef.current = toast({
        description: `Seja bem vindo, ${email}`,
        status: 'success',
        position: 'bottom-right',
      });
      return true;
    } catch (error) {
      toastIdRef.current = toast({
        description: 'Usuário ou senha invalido',
        status: 'error',
        position: 'bottom-right',
      });
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ isAthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
