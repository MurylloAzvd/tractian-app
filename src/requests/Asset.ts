import { api } from "../services/api";

export interface Asset {
  id: number;
  companyId: number;
  unitId: number;
  name: string;
  model: string;
  healthscore: number;
  status: AssetStatus;
  assignedUserIds: number[];
  healthHistory: HealthHistoryRecord[];
  image: string;
  metrics: AssetMetrics;
  sensors: string[];
  specifications: AssetSpecifications;
}

export interface AssetFormData {
  companyId: number;
  unitId: number;
  name: string;
  model: string;
  specifications: AssetSpecifications;
}

export enum AssetStatus {
  inAlert = "inAlert",
  inOperation = "inOperation",
  inDowntime = "inDowntime",
  unplannedStop = "unplannedStop",
  plannedStop = "plannedStop",
}

interface AssetSpecifications {
  maxTemp?: number;
  power?: number;
  rpm?: number;
}

interface AssetMetrics {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
}

export interface HealthHistoryRecord {
  status: AssetStatus;
  timestamp: string;
}

export interface AssetsParams {
  companyId?: number;
  unitId?: number;
}

const basePath = "/assets";

export const getAssets = async (params?: AssetsParams) => {
  const response = await api.get<Asset[]>(basePath, {
    params,
  });
  return response.data;
};

export const getAsset = async (id: number) => {
  const response = await api.get<Asset>(`${basePath}/${id}`);
  return response.data;
};

export const createAsset = async (data: AssetFormData) => {
  const response = await api.post<Asset>(basePath, data);
  return response.data;
};

export const updateAsset = async (id: number, data: AssetFormData) => {
  const response = await api.patch<Asset>(`${basePath}/${id}`, data);
  return response.data;
};

export const deleteAsset = async (id: number) => {
  const response = await api.delete<Asset>(`${basePath}/${id}`);
  return response.data;
};
