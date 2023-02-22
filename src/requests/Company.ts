import { api } from "../services/api";

export interface Company {
  id: number;
  name: string;
}

export const getCompanies = async () => {
  const response = await api.get<Company[]>("/companies");
  return response.data;
};
