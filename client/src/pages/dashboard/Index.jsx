import { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Header from '../../components/Header';
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "./index.css"


function Index() {
  const [data, setData] = useState(null)

  const getUser = async() => {
    const token = sessionStorage.getItem('token');
    let authUser;

    if(token !== undefined) {
      const decoded = jwt_decode(token);
      authUser = decoded
    }

    let url =(`${import.meta.env.VITE_APP_ADMIN_API_URL}/${authUser.email}` || `${import.meta.env.VITE_APP_STUDENT_API_URL}/${authUser.email}`)

    await axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.staff))
    .catch(err => err)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <Header data={data} />
      <Sidebar/>
      <div className="main-content">
        <Outlet/>
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