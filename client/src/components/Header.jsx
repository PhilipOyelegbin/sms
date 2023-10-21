import { useEffect, useState } from "react"
import axios from 'axios'


function Header({user, token}) {
  const [profile, setProfile] = useState({})
  console.log(user)

  const getUser = async(user) => {
    let url =(`${import.meta.env.VITE_APP_ADMIN_API_URL}/${user?.email}` || `${import.meta.env.VITE_APP_STUDENT_API_URL}/${user?.email}`)
    console.log(url)
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
    <header className="header">
      <h2>Dashboard</h2>
      <p>{profile.first_name}</p>
    </header>
  )
}

Header.propTypes = {user: Object, token: String}

export default Header