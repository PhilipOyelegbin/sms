import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Index'

const ProtectedRoutes = () => {
  const token = sessionStorage.getItem('token');

  return token ? <Dashboard/> : <Navigate to='/'/>;
}

export default ProtectedRoutes;