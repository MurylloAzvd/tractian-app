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

export const createCompany = async ({ name }: CompanyFormData) => {
  const response = await api.post<Company>(basePath, { name });
  return response.data;
};
