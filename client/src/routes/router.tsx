import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/pages/auth/login';
import ProtectedRoute from './protected-route';
import Home from '@/pages/inicio/home';
import Ocorrencias from '@/pages/ocorrencias/ocorrencias';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'ocorrencias',
        element: <Ocorrencias />,
      },
    ],
  },
  { 
    path: '/login', 
    element: <Login /> 
  },
  { 
    path: '*', 
    element: <Navigate to="/home" replace /> 
  }
]);

export default router;