import React from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useToast } from '@chakra-ui/react';
import { createContext, ReactNode, useState, useEffect } from 'react';
import router from 'next/router';
import { api } from '../services/apiClient';

const TOKEN_COOKIE_NAME = 'nextauth.token';
const REFRESH_TOKEN_COOKIE_NAME = 'nextauth.refreshToken';

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
  signOut(): void;
  isAthenticated: boolean;
  user?: User;
}

interface AuthProviderProps {
  children: ReactNode;
}
export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  router.push('/');
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const toast = useToast();
  const toastIdRef = React.useRef<any>();

  const isAthenticated = !!user;

  /**Chamado toda vez que e */
  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();
    if (token) {
      api
        .get('/me')
        .then((res) => {
          const { email, roles, permissions } = res.data;
          setUser({ email, roles, permissions });
        })
        .catch((err) => {
          console.log('ERRO', err);
          signOut();
        });
    } else {
      signOut();
    }
  }, []);

  async function signIn({
    email,
    password,
  }: SignInCredentials): Promise<boolean> {
    try {
      const response = await api.post<any>('sessions', { email, password });
      const { token, refreshToken, roles, permissions } = response.data;

      if (response.status == 200) {
        setCookie(undefined, TOKEN_COOKIE_NAME, token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/', // caminhos da app que tem permissao ao cookie
        });
        setCookie(undefined, REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/', // caminhos da app que tem permissao ao cookie
        });
        setUser({ email, permissions, roles });

        toastIdRef.current = toast({
          description: `Seja bem vindo, ${email}`,
          status: 'success',
          position: 'bottom-right',
        });

        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        return true;
      }
      return false;
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
    <AuthContext.Provider value={{ isAthenticated, signIn, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
