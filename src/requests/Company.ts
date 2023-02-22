import { api } from "../services/api";

export interface Company {
  id: number;
  name: string;
}

export interface CompanyFormData {
  name: string;
}

const basePath = "/companies";

export const getCompanies = async () => {
  const response = await api.get<Company[]>(basePath);
  return response.data;
};

export const getCompany = async (id: number) => {
  const response = await api.get<Company>(`${basePath}/${id}`);
  return response.data;
};

export const createCompany = async (data: CompanyFormData) => {
  const response = await api.post<Company>(basePath, data);
  return response.data;
};

export const updateCompany = async (id: number, data: CompanyFormData) => {
  const response = await api.patch<Company>(`${basePath}/${id}`, data);
  return response.data;
};

export const deleteCompany = async (id: number) => {
  const response = await api.delete<Company>(`${basePath}/${id}`);
  return response.data;
};
