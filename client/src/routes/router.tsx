import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import UnauthorizedError from '@/pages/errors/unauthorizad-error'
import ProtectedRoute from './protected-route'

import Login from '@/pages/auth/login'
import Dashboard from '@/pages/dashboard/dashboard'
import NotFoundError from '@/pages/errors/not-found'
import Ocorrrencias from '@/pages/ocorrencias/ocorrencias'

const RoutesConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute />}>
          <Route index element={<Navigate to='/dashboard' replace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/ocorrencias' element={<Ocorrrencias />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/401' element={<UnauthorizedError />} />
        <Route path='*' element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesConfig
