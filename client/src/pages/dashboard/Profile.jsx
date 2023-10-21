import { useEffect, useState } from 'react';
import axios from 'axios'


function Profile({user, token}) {
  const [profile, setProfile] = useState({})

  const getUser = async(user) => {
    let url =(`${import.meta.env.VITE_APP_ADMIN_API_URL}/${user?.email}` || `${import.meta.env.VITE_APP_STUDENT_API_URL}/${user?.email}`)

    await axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setProfile(resp.data.user))
    .catch(err => err)
  }

  useEffect(() => {
    getUser(user)
  }, [user])

  return (
    (profile !== undefined) && (
      <section className='profile'>
        <div className='profile-content'>
          <p>First name</p>
          <h3>{profile?.first_name}</h3>
        </div>
        <div className='profile-content'>
          <p>Last name</p>
          <h3>{profile?.last_name}</h3>
        </div>
        <div className='profile-content'>
          <p>Email</p>
          <h3>{profile?.email}</h3>
        </div>
        <div className='profile-content'>
          <p>Phone number</p>
          <h3>{profile?.email}</h3>
        </div>
        <div className='profile-content'>
          <p>Gender</p>
          <h3>{profile?.email}</h3>
        </div>
        <div className='profile-content'>
          <p>Date of birth</p>
          <h3>{profile?.email}</h3>
        </div>
        <div className='profile-content'>
          <p>Subjects</p>
          <h3>{profile?.subject || "N/A"}</h3>
        </div>
        <div className='profile-content'>
          <p>Home address</p>
          <h3>{profile?.email}</h3>
        </div>
      </section>
    )
  )
}

Profile.propTypes = {user: Object, token: String}

export default Profile