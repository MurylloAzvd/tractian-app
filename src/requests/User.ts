import { api } from "../services/api";

export interface User {
  id: number;
  companyId: number;
  unitId: number;
  name: string;
  email: string;
}

export interface UserFormData {
  companyId: number;
  unitId: number;
  name: string;
  email: string;
}

const basePath = "/users";

export const getUsers = async () => {
  const response = await api.get<User[]>(basePath);
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await api.get<User>(`${basePath}/${id}`);
  return response.data;
};

export const createUser = async (data: UserFormData) => {
  const response = await api.post<User>(basePath, data);
  return response.data;
};

export const updateUser = async (id: number, data: UserFormData) => {
  const response = await api.patch<User>(`${basePath}/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete<User>(`${basePath}/${id}`);
  return response.data;
};
