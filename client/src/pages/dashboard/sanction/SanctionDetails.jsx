import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPenFancy, FaTrash } from 'react-icons/fa';
import axios from 'axios';


function SanctionDetails() {
  const role = sessionStorage.getItem("role")
  const {id} = useParams()
  const token = sessionStorage.getItem('token');
  const [data, setData] = useState(null)

  const navigate = useNavigate()

  const handleDelete = async() => {
    let url =`${import.meta.env.VITE_APP_SANCTION_API_URL}/${id}`

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
    let url =`${import.meta.env.VITE_APP_SANCTION_API_URL}/${id}`

    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.sanction))
    .catch(err => err && toast.error("Unable to load data, try again later"))
  }, [token, id])

  return (
    <article>
      <div className='sanctions-container'>
        <p><b>Student email:</b> {data?.student}</p>
        <p><b>Incident:</b> {data?.incident}</p>
        <p><b>Date:</b> {data?.date}</p>
        <p><b>Time:</b> {data?.time}</p>
        <p><b>Official:</b> {data?.official}</p>
        <p><b>Location:</b> {data?.location}</p>
        <p><b>Witnesses:</b> {data?.witnesses}</p>
        <p><b>Penalties:</b> {data?.penalties}</p>
        <p><b>Details:</b> {data?.details}</p>
      </div>
      {role !== "Student" &&
        <div className='btn-container'>
          <Link to={`/dashboard/sanction/edit/${id}`} className='action-btn'>
            <FaPenFancy />
          </Link>
          <button type='button' className='danger-btn' onClick={handleDelete}>
            <FaTrash />
          </button>
        </div>
      }
    </article>
  )
}

export default SanctionDetails