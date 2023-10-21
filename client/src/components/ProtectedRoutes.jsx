import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const token = sessionStorage.getItem('token');

  return token ? <Outlet/> : <Navigate to='/'/>;
}

export default ProtectedRoutes;