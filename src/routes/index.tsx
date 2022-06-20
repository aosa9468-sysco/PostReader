import useAuth, { AuthProvider } from '../services/userService';
import Login from '../screens/Login/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import React from 'react'
import { Route, Routes as ReactRoutes, useNavigate } from 'react-router-dom'

export const Routes = () => {
  const useAuthProps = useAuth()
  const { user } = useAuthProps
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

  return (
    <AuthProvider {...useAuthProps}>
      <ReactRoutes>
        <Route path='' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>Error Loading Page</h1>} />
      </ReactRoutes>
    </AuthProvider>
  )
}

export default Routes
