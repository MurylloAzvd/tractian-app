import { Navigate, Route, Routes } from "react-router-dom";
import { CompaniesList } from "../pages/Company/CompaniesList";
import { CompanyCreation } from "../pages/Company/CompanyCreation";
import { CompanyUpdate } from "../pages/Company/CompanyUpdate";
import { UnitsList } from "../pages/Unit/UnitsList";
import { UnitCreation } from "../pages/Unit/UnitCreation";
import { UnitUpdate } from "../pages/Unit/UnitUpdate";
import { UsersList } from "../pages/User/UsersList";
import { UserCreation } from "../pages/User/UserCreation";
import { UserUpdate } from "../pages/User/UserUpdate";
import { AssetsList } from "../pages/Asset/AssetsList";
import { AssetCreation } from "../pages/Asset/AsssetCreation";
import { AssetUpdate } from "../pages/Asset/AssetUpdate";
import { AssetDetail } from "../pages/Asset/AssetDetail";
import { Home } from "../pages/Home";

export const routePaths = {
  home: "/",
  company: {
    list: "/empresas",
    creation: "/empresas/criar",
    update: "/empresas/editar/:id",
  },
  unit: {
    list: "/unidades",
    creation: "/unidades/criar",
    update: "/unidades/editar/:id",
  },
  user: {
    list: "/usuarios",
    creation: "/usuarios/criar",
    update: "/usuarios/editar/:id",
  },
  asset: {
    list: "/ativos",
    creation: "/ativos/criar",
    update: "/ativos/editar/:id",
    detail: "/ativos/detalhes/:id",
  },
};

export const Router = () => (
  <Routes>
    <Route path={routePaths.home} element={<Home />} />
    <Route path={routePaths.company.list} element={<CompaniesList />} />
    <Route path={routePaths.company.creation} element={<CompanyCreation />} />
    <Route path={routePaths.company.update} element={<CompanyUpdate />} />
    <Route path={routePaths.unit.list} element={<UnitsList />} />
    <Route path={routePaths.unit.creation} element={<UnitCreation />} />
    <Route path={routePaths.unit.update} element={<UnitUpdate />} />
    <Route path={routePaths.user.list} element={<UsersList />} />
    <Route path={routePaths.user.creation} element={<UserCreation />} />
    <Route path={routePaths.user.update} element={<UserUpdate />} />
    <Route path={routePaths.asset.list} element={<AssetsList />} />
    <Route path={routePaths.asset.creation} element={<AssetCreation />} />
    <Route path={routePaths.asset.update} element={<AssetUpdate />} />
    <Route path={routePaths.asset.detail} element={<AssetDetail />} />
    <Route path="*" element={<Navigate to={routePaths.home} replace />} />
  </Routes>
);
