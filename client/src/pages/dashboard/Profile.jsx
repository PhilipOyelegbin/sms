import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

    let staffUrl =`${import.meta.env.VITE_APP_ADMIN_API_URL}/${authUser.email}`
    let studentUrl =`${import.meta.env.VITE_APP_STUDENT_API_URL}/${authUser.email}`

    if(authUser?.role !== "Student") {
      await axios.get(staffUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => setData(resp.data.staff))
      .catch(err => toast.error(err.message))
    } else {
      await axios.get(studentUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => setData(resp.data.student))
      .catch(err => toast.error(err.message))
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    (data?.role !== "Student") ? (
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
          <h3>{data?.phone_number}</h3>
        </div>
        <div className='profile-content'>
          <p>Gender</p>
          <h3>{data?.gender}</h3>
        </div>
        <div className='profile-content'>
          <p>Date of birth</p>
          <h3>{data?.date_of_birth}</h3>
        </div>
        <div className='profile-content'>
          <p>Subject(s)</p>
          <h3>{data?.subject}</h3>
        </div>
        <div className='profile-content'>
          <p>Home address</p>
          <h3>{data?.home_address}</h3>
        </div>
      </section>
    ) : (
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
          <p>Class</p>
          <h3>{data?.class}</h3>
        </div>
        <div className='profile-content'>
          <p>Gender</p>
          <h3>{data?.gender}</h3>
        </div>
        <div className='profile-content'>
          <p>Date of birth</p>
          <h3>{data?.date_of_birth}</h3>
        </div>
        <div className='profile-content'>
          <p>Blood group</p>
          <h3>{data?.blood_group}</h3>
        </div>
        <div className='profile-content'>
          <p>Guardian name</p>
          <h3>{data?.guardian_name}</h3>
        </div>
        <div className='profile-content'>
          <p>Guardian number</p>
          <h3>{data?.guardian_phone_number}</h3>
        </div>
        <div className='profile-content'>
          <p>Guardian adsress</p>
          <h3>{data?.guardian_address}</h3>
        </div>
        <div className='profile-content'>
          <p>Emergency name</p>
          <h3>{data?.emergency_name}</h3>
        </div>
        <div className='profile-content'>
          <p>Emergency number</p>
          <h3>{data?.emergency_phone_number}</h3>
        </div>
      </section>
    )
  )
}


export default Profile