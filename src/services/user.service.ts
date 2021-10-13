import { AxiosResponse } from 'axios';
import { api } from './api';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export const userService = {
  getAll,
  create,
  update,
  remove,
};

async function getAll(): Promise<IUser[]> {
  const { data, status } = await api.get<IUser[]>('users');
  return data;
}

async function create(data: IUser): Promise<AxiosResponse<IUser>> {
  return api.post('/users', data);
}

async function update(id: string, data: IUser): Promise<AxiosResponse<IUser>> {
  return api.put(`/users/${id}`, data);
}

async function remove(id: string): Promise<AxiosResponse<IUser>> {
  return api.delete(`/users/${id}`);
}
