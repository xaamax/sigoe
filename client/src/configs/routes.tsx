import { DashboardLayout } from "@/layouts/dashboard/dashboard-layout";
import RootLayout from "@/layouts/root/root-layout";
import Error404 from "@/pages/errors/404";
import {
  Login,
  Dashboard,
  Ocorrrencias
} from "@/pages/index";
import { createBrowserRouter, Navigate } from "react-router-dom";

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
