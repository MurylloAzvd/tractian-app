import { Route, Routes } from "react-router-dom";
import { CompaniesList } from "../pages/Company/CompaniesList";
import { CompanyCreation } from "../pages/Company/CompanyCreation";
import { CompanyUpdate } from "../pages/Company/CompanyUpdate";

export const routePaths = {
  company: {
    list: "/empresas",
    creation: "/empresas/criar",
    update: "/empresas/editar/:id",
  },
};

export const Router = () => (
  <Routes>
    <Route path={routePaths.company.list} element={<CompaniesList />} />
    <Route path={routePaths.company.creation} element={<CompanyCreation />} />
    <Route path={routePaths.company.update} element={<CompanyUpdate />} />
    <Route path="*" element={<span>development...</span>} />
  </Routes>
);
