import { useQuery } from 'react-query';
import { api } from '../../services/api';

export function useUsers() {
  return useQuery(
    'users',
    async () => {
      const { data } = await api.get<any>('users');
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

      return users;
    },
    {
      staleTime: 1000 * 5,
    }
  );
}
