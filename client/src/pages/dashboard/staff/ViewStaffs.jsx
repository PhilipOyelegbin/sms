import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


function ViewStaffs() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    let url =`${import.meta.env.VITE_APP_ADMIN_API_URL}`

    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.allStaff))
    .catch(err => toast.error(err.message))
  }, [])

  return (
    <article className='staffs-container'>
      {!data && <h4>You are not authorized to view this, contact the admin!</h4>}
      {data?.map(staff => (
        <Link to={`${staff.email}`} key={staff._id}>
          <p><b>First name:</b> {staff.first_name}</p>
          <p><b>Last name:</b> {staff.last_name}</p>
          <p><b>Email:</b> {staff.email}</p>
        </Link>
      ))}
    </article>
  )
}

export default ViewStaffs