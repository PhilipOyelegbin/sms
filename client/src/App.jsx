import { lazy, Suspense} from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Index from './pages/dashboard/Index';
import Loader from './components/Loader';


const Home = lazy(() => import('./pages/landing_page/Home'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const StaffLogin = lazy(() => import('./pages/login_page/StaffLogin'));
const StaffRegistration = lazy(() => import('./pages/dashboard/staff/StaffRegistration'));
const Staffs = lazy(() => import('./pages/dashboard/staff/ViewStaffs'));
const StaffDetails = lazy(() => import('./pages/dashboard/staff/StaffDetails'));
const UpdateStaff = lazy(() => import('./pages/dashboard/staff/UpdateStaff'));
const StudentLogin = lazy(() => import('./pages/login_page/StudentLogin'));
const StudentRegistration = lazy(() => import('./pages/dashboard/student/StudentRegistration'));
const Students = lazy(() => import('./pages/dashboard/student/ViewStudents'));
const StudentDetails = lazy(() => import('./pages/dashboard/student/StudentDetails'));
const UpdateStudent = lazy(() => import('./pages/dashboard/student/UpdateStudent'));
const Scores = lazy(() => import('./pages/dashboard/score/ViewScores'));
const CreateScore = lazy(() => import('./pages/dashboard/score/CreateScore'));
const ScoreDetails = lazy(() => import('./pages/dashboard/score/ScoreDetails'));
const UpdateScore = lazy(() => import('./pages/dashboard/score/UpdateScore'));
const Sanctions = lazy(() => import('./pages/dashboard/sanction/ViewSanctions'));
const CreateSanction = lazy(() => import('./pages/dashboard/sanction/CreateSanction'));
const SanctionDetails = lazy(() => import('./pages/dashboard/sanction/SanctionDetails'));
const UpdateSanction = lazy(() => import('./pages/dashboard/sanction/UpdateSanction'));


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home/>}/>
        <Route path='login/admin' element={<StaffLogin/>}/>
        <Route path='login/student' element={<StudentLogin/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='dashboard' element={<Index/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='profile' element={<Profile/>}/>
            {/* Staff routes */}
            <Route path='register/admin' element={<StaffRegistration/>}/>
            <Route path='staff/view' element={<Staffs/>}/>
            <Route path='staff/view/:id' element={<StaffDetails/>}/>
            <Route path='staff/edit/:id' element={<UpdateStaff/>}/>
            {/* Student routes */}
            <Route path='register/student' element={<StudentRegistration/>}/>
            <Route path='student/view' element={<Students/>}/>
            <Route path='student/view/:id' element={<StudentDetails/>}/>
            <Route path='student/edit/:id' element={<UpdateStudent/>}/>
            {/* Score routes */}
            <Route path='score/create' element={<CreateScore/>}/>
            <Route path='score/view' element={<Scores/>}/>
            <Route path='score/view/:id' element={<ScoreDetails/>}/>
            <Route path='score/edit/:id' element={<UpdateScore/>}/>
            {/* Sanction routes */}
            <Route path='sanction/create' element={<CreateSanction/>}/>
            <Route path='sanction/view' element={<Sanctions/>}/>
            <Route path='sanction/view/:id' element={<SanctionDetails/>}/>
            <Route path='sanction/edit/:id' element={<UpdateSanction/>}/>
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <Suspense fallback={<Loader/>}>
      <RouterProvider router={router}/>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Suspense>
  )
}

export default App
