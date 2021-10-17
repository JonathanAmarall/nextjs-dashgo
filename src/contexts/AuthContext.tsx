import { createContext, ReactNode } from 'react';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAthenticated = false;
  async function signIn({ email, password }: SignInCredentials) {
    console.log({ email, password });
  }
  return (
    <AuthContext.Provider
      value={{ isAthenticated, signIn }}
    ></AuthContext.Provider>
  );
}
