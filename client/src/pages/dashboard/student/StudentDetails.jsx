import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPenFancy, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';


function StudentDetails() {
  const {id} = useParams()
  const token = sessionStorage.getItem('token');
  const [data, setData] = useState(null)

  const navigate = useNavigate()

  const handleDelete = async() => {
    let url =`${import.meta.env.VITE_APP_STUDENT_API_URL}/${id}`

    await axios.delete(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => {
      toast.success(resp.data.message)
      navigate("/dashboard")
    })
    .catch(err => err && toast.error("Unable to delete, try again later"))
  }

  useEffect(() => {
    let url =`${import.meta.env.VITE_APP_STUDENT_API_URL}/${id}`

    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.student))
    .catch(err => err && toast.error("Unable to load data, try again later"))
  }, [token, id])

  return (
    <article>
      <div className='pwd-btn'>
        <Link to={`/dashboard/student/update/${data?.email}`} className='action-btn'>
          Change Password
        </Link>
      </div>
      <div className='profile-details-container'>
        <p><b>Full name:</b> {data?.first_name} {data?.last_name}</p>
        <p><b>Email:</b> {data?.email}</p>
        <p><b>Class:</b> {data?.class}</p>
        <p><b>Blood group:</b> {data?.blood_group}</p>
        <p><b>Gender:</b> {data?.gender}</p>
        <p><b>Date of Birth:</b> {data?.date_of_birth}</p>
        <p><b>Disabilities:</b> {data?.disabilities}</p>
        <p><b>Medical information:</b> {data?.medical_information}</p>
        <p><b>Guardian name:</b> {data?.guardian_name}</p>
        <p><b>Relationship:</b> {data?.relationship}</p>
        <p><b>Guardian email:</b> {data?.guardian_email}</p>
        <p><b>Guardian phone number:</b> {data?.guardian_phone_number}</p>
        <p><b>Guardian address:</b> {data?.guardian_address}</p>
        <p><b>Emergency name:</b> {data?.emergency_name}</p>
        <p><b>Emergency phone number:</b> {data?.emergency_phone_number}</p>
        <p><b>Emergency address:</b> {data?.emergency_address}</p>
      </div>
      <div className='btn-container'>
        <Link to={`/dashboard/student/edit/${data?.email}`} className='action-btn'>
          <FaPenFancy />
        </Link>
        <button type='button' className='danger-btn' onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </article>
  )
}

export default StudentDetails