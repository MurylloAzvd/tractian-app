import { Route, Routes } from "react-router-dom";
import { CompaniesList } from "../pages/Company/CompaniesList";
import { CompanyCreation } from "../pages/Company/CompanyCreation";

export const routePaths = {
  company: {
    list: "/empresas",
    creation: "/empresas/criar",
  },
};

export const Router = () => (
  <Routes>
    <Route path={routePaths.company.list} element={<CompaniesList />} />
    <Route path={routePaths.company.creation} element={<CompanyCreation />} />
    <Route path="*" element={<span>development...</span>} />
  </Routes>
);
