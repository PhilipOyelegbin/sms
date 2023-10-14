import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProtectedRoutes from './utilities/ProtectedRoutes';
// import SharedLayout from './utilities/SharedLayout';
// import Loader from './components/Loader';

const Home = lazy(() => import('./pages/landing_page/home'));
const AdminLogin = lazy(() => import('./pages/login_page/adminLogin'));
const UserLogin = lazy(() => import('./pages/login_page/userLogin'));
const AdminRegistration = lazy(() => import('./pages/registration_page/AdminRegistration'));
const UserRegistration = lazy(() => import('./pages/registration_page/UserRegistration'));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' errorElement={<Error/>}>
        <Route index element={<Home/>}/>
        <Route path='login/admin' element={<AdminLogin/>}/>
        <Route path='login/student' element={<UserLogin/>}/>
        <Route path='register/admin' element={<AdminRegistration/>}/>
        <Route path='register/student' element={<UserRegistration/>}/>
        {/* <Route element={<ProtectedRoutes/>}>
          <Route path='write' element={<Write/>}/>
        </Route> */}
      </Route>
    )
  );

  return (
    <Suspense>
      <RouterProvider router={router}/>
      {/* <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
    </Suspense>
  )
}

export default App
