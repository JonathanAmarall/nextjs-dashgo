import { useQuery } from 'react-query';
import { api } from '../../services/api';

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersReponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersReponse> {
  const { data, headers } = await api.get<any>('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);
  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutos em cash
  });
}
