import { Route, Routes } from "react-router-dom";
import { CompaniesList } from "../pages/Company/CompaniesList";
import { CompanyCreation } from "../pages/Company/CompanyCreation";
import { CompanyUpdate } from "../pages/Company/CompanyUpdate";
import { UnitsList } from "../pages/Unit/UnitsList";
import { UnitCreation } from "../pages/Unit/UnitCreation";

export const routePaths = {
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
};

export const Router = () => (
  <Routes>
    <Route path={routePaths.company.list} element={<CompaniesList />} />
    <Route path={routePaths.company.creation} element={<CompanyCreation />} />
    <Route path={routePaths.company.update} element={<CompanyUpdate />} />
    <Route path={routePaths.unit.list} element={<UnitsList />} />
    <Route path={routePaths.unit.creation} element={<UnitCreation />} />
    <Route path="*" element={<span>development...</span>} />
  </Routes>
);
