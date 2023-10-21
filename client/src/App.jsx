import { lazy, Suspense, useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Index from './pages/dashboard/Index';


const Home = lazy(() => import('./pages/landing_page/Home'));
const AdminLogin = lazy(() => import('./pages/login_page/AdminLogin'));
const UserLogin = lazy(() => import('./pages/login_page/UserLogin'));
const AdminRegistration = lazy(() => import('./pages/registration_page/AdminRegistration'));
const UserRegistration = lazy(() => import('./pages/registration_page/UserRegistration'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));


function App() {
  let [user, setUser] = useState(null)
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
  }, [token]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home/>}/>
        <Route path='login/admin' element={<AdminLogin/>}/>
        <Route path='login/student' element={<UserLogin/>}/>
        <Route path='register/admin' element={<AdminRegistration/>}/>
        <Route path='register/student' element={<UserRegistration/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='dashboard' element={<Index user={user} token={token}/>}>
            <Route index element={<Dashboard user={user} token={token}/>}/>
            <Route path='profile' element={<Profile user={user} token={token}/>}/>
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <Suspense>
      <RouterProvider router={router}/>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Suspense>
  )
}

export default App