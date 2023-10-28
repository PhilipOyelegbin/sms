import axios from 'axios';
import { useEffect, useState } from 'react'
import { FaPenFancy, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function StaffDetails() {
  const {id} = useParams()
  const token = sessionStorage.getItem('token');
  const [data, setData] = useState(null)

  const handleDelete = async() => {
    let url =`${import.meta.env.VITE_APP_ADMIN_API_URL}/${id}`

    await axios.delete(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => toast.success(resp.data.message))
    .catch(err => err && toast.error("Unable to delete, try again later"))
  }

  useEffect(() => {
    let url =`${import.meta.env.VITE_APP_ADMIN_API_URL}/${id}`

    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.staff))
    .catch(err => err && toast.error("Unable to load data, try again later"))
  }, [token, id])

  return (
    <article>
      <div className='profile-details-container'>
        <p><b>Full name:</b> {data?.first_name} {data?.last_name}</p>
        <p><b>Email:</b> {data?.email}</p>
        <p><b>Phone number:</b> {data?.phone_number}</p>
        <p><b>Gender:</b> {data?.gender}</p>
        <p><b>Date of Birth:</b> {data?.date_of_birth}</p>
        <p><b>Subject(s):</b> {data?.subject}</p>
        <p><b>Home address:</b> {data?.home_address}</p>
      </div>
      <div className='btn-container'>
        <Link to={`/dashboard/staff/edit/${data?.email}`} className='action-btn'>
          <FaPenFancy />
        </Link>
        <button type='button' className='danger-btn' onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </article>
  )
}

export default StaffDetails