import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import axios from "axios";

function Profile() {
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
    (data !== null) && (
      <section className='profile'>
        <div className='profile-content'>
          <p>First name</p>
          <h3>{data?.first_name}</h3>
        </div>
        <div className='profile-content'>
          <p>Last name</p>
          <h3>{data?.last_name}</h3>
        </div>
        <div className='profile-content'>
          <p>Email</p>
          <h3>{data?.email}</h3>
        </div>
        <div className='profile-content'>
          <p>Phone number</p>
          <h3>{data?.email}</h3>
        </div>
        <div className='profile-content'>
          <p>Gender</p>
          <h3>{data?.email}</h3>
        </div>
        <div className='profile-content'>
          <p>Date of birth</p>
          <h3>{data?.email}</h3>
        </div>
        <div className='profile-content'>
          <p>Subjects</p>
          <h3>{data?.subject}</h3>
        </div>
        <div className='profile-content'>
          <p>Home address</p>
          <h3>{data?.email}</h3>
        </div>
      </section>
    )
  )
}


export default Profile