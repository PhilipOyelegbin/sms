import { useEffect, useReducer } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import {UserReducer, InitialState} from '../../store/UserReducer'
import "./index.css"


function Index() {
  const [state, dispatch] = useReducer(UserReducer, InitialState);
  sessionStorage.setItem("role", state?.role)

  const getUser = async() => {
    const token = sessionStorage.getItem('token');
    let authUser;

    if(token !== undefined) {
      const decoded = jwt_decode(token);
      authUser = decoded
    }

    let staffUrl =`${import.meta.env.VITE_APP_ADMIN_API_URL}/${authUser.email}`
    let studentUrl =`${import.meta.env.VITE_APP_STUDENT_API_URL}/${authUser.email}`

    if(authUser?.role !== "Student") {
      await axios.get(staffUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => dispatch({type: "GET_USER", payload: resp.data.staff}))
      .catch(err => toast.error(err.message))
    } else {
      await axios.get(studentUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => dispatch({type: "GET_USER", payload: resp.data.student}))
      .catch(err => toast.error(err.message))
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <Header {...state} />
      <Sidebar/>
      <div className="main-content">
        <Outlet />
      </div>
      <Footer/>
      <ScrollRestoration
        getKey={(location, ) => {
          return location.pathname;
        }}
      />
    </>
  )
}


export default Index;