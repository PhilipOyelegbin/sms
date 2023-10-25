import { lazy, Suspense} from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Index from './pages/dashboard/Index';


const Home = lazy(() => import('./pages/landing_page/Home'));
const AdminLogin = lazy(() => import('./pages/login_page/AdminLogin'));
const StudentLogin = lazy(() => import('./pages/login_page/StudentLogin'));
const AdminRegistration = lazy(() => import('./pages/dashboard/AdminRegistration'));
const StudentRegistration = lazy(() => import('./pages/dashboard/StudentRegistration'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const Sanctions = lazy(() => import('./pages/dashboard/ViewSanctions'));
const SanctionDetails = lazy(() => import('./pages/dashboard/SanctionDetails'));


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home/>}/>
        <Route path='login/admin' element={<AdminLogin/>}/>
        <Route path='login/student' element={<StudentLogin/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='dashboard' element={<Index/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='register/admin' element={<AdminRegistration/>}/>
            <Route path='register/student' element={<StudentRegistration/>}/>
            <Route path='sanction/view' element={<Sanctions/>}/>
            <Route path='sanction/view/:id' element={<SanctionDetails/>}/>
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
