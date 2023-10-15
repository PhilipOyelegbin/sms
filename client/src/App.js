import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';

const Home = lazy(() => import('./pages/landing_page/Home'));
const AdminLogin = lazy(() => import('./pages/login_page/AdminLogin'));
const UserLogin = lazy(() => import('./pages/login_page/UserLogin'));
const AdminRegistration = lazy(() => import('./pages/registration_page/AdminRegistration'));
const UserRegistration = lazy(() => import('./pages/registration_page/UserRegistration'));
const Dashboard = lazy(() => import('./pages/dashboard/Index'));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home/>}/>
        <Route path='login/admin' element={<AdminLogin/>}/>
        <Route path='login/student' element={<UserLogin/>}/>
        <Route path='register/admin' element={<AdminRegistration/>}/>
        <Route path='register/student' element={<UserRegistration/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
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
