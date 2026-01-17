import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/dashboard/dashboard-layout";
import RootLayout from "@/layouts/root/root-layout";
import {
  Login,
  Dashboard,
  Ocorrrencias,
  OcorrrenciaDetalhes,
  Error404,
} from "@/pages/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            index: true,
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "ocorrencias",
            element: <Ocorrrencias />,
          },
          {
            path: "ocorrencias/incluir",
            element: <OcorrrenciaDetalhes />,
          },
          {
            path: "ocorrencias/:id",
            element: <OcorrrenciaDetalhes />,
          },
        ],
      },
    ]
  },
  {
    path: "/login",
     element: <Login />,
  },
  {
    path: "/*",
    element: <Error404 />,
  },
]);
