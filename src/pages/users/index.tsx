import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IUser, userService } from '../../services';
import styles from './users.module.scss';

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <h1>Lista de usuários: </h1>
      <div className={styles.button_container}>
        <Link href="/users/create">
          <a className={styles.button}>Adicionar</a>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link href={`/users/edit/${user.id}`}>
                    <a>Editar</a>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
