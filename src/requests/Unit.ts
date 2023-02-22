import { api } from "../services/api";

export interface Unit {
  id: number;
  companyId: number;
  name: string;
}

export interface UnitFormData {
  companyId: number;
  name: string;
}

const basePath = "/units";

export const getUnits = async () => {
  const response = await api.get<Unit[]>(basePath);
  return response.data;
};

export const getUnit = async (id: number) => {
  const response = await api.get<Unit>(`${basePath}/${id}`);
  return response.data;
};

export const createUnit = async (data: UnitFormData) => {
  const response = await api.post<Unit>(basePath, data);
  return response.data;
};

export const updateUnit = async (id: number, data: UnitFormData) => {
  const response = await api.patch<Unit>(`${basePath}/${id}`, data);
  return response.data;
};

export const deleteUnit = async (id: number) => {
  const response = await api.delete<Unit>(`${basePath}/${id}`);
  return response.data;
};
