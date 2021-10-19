import { parseCookies, setCookie } from 'nookies';
import axios, { AxiosError } from 'axios';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];

/**Usar diretamente para chamadas no lado do servidor passando o context */
export function setupApiClient(context = undefined) {
  let cookies = parseCookies(context);
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`,
    },
  });

  // interceptors
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
      if (error.response.status == 401) {
        if (error.response.data?.code === 'token.expired') {
          // renovar token
          cookies = parseCookies(context);

          const { 'nextauth.refreshToken': refreshToken } = cookies;
          console.log('refreshToken', refreshToken);

          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post('/refresh', {
                refreshToken,
              })
              .then((res: any) => {
                const { token } = res.data;

                setCookie(context, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/', // caminhos da app que tem permissao ao cookie
                });

                setCookie(
                  context,
                  'nextauth.refreshToken',
                  res.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/', // caminhos da app que tem permissao ao cookie
                  }
                );

                api.defaults.headers['Authorization'] = `Bearer ${token}`;

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                );

                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(err)
                );
                failedRequestsQueue = [];

                if (process.browser) {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          /**Armazena todas requisições e guarda em uma fila para se seja executada apos obter novo token */
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`;
                resolve(api(originalConfig)); // nova chamada a api
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        } else {
          // deslogar usuario
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      if (error.response.status == 500) {
      }

      return Promise.reject(error);
    }
  );

  return api;
}
