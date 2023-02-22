import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CompaniesList } from "../pages/Company/CompaniesList";
import { CompanyCreation } from "../pages/Company/CompanyCreation";

export const routerPaths = {
  company: {
    list: "/empresas",
    creation: "/empresas/criar",
  },
};

const router = createBrowserRouter([
  {
    path: routerPaths.company.list,
    element: <CompaniesList />,
  },
  {
    path: routerPaths.company.creation,
    element: <CompanyCreation />,
  },
  {
    path: "*",
    element: <span>development...</span>,
  },
]);

export const Routes = () => <RouterProvider router={router} />;
