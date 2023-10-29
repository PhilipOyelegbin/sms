import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPenFancy, FaTrash } from 'react-icons/fa';
import axios from 'axios';


function ScoreDetails() {
  const {id} = useParams()
  const token = sessionStorage.getItem('token');
  const [data, setData] = useState(null)

  const navigate = useNavigate()

  const handleDelete = async() => {
    let url =`${import.meta.env.VITE_APP_SCORE_API_URL}/${id}`

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
    let url =`${import.meta.env.VITE_APP_SCORE_API_URL}/${id}`

    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.score))
    .catch(err => err && toast.error("Unable to load data, try again later"))
  }, [token, id])

  return (
    <article>
      <div className='scores-container'>
        <p><b>Student ID:</b> {data?.student}</p>
        <p><b>Math:</b> {data?.math}</p>
        <p><b>English:</b> {data?.english}</p>
        <p><b>Biology:</b> {data?.biology}</p>
        <p><b>Government:</b> {data?.government}</p>
        <p><b>Average:</b> {data?.average}</p>
        <p><b>Grade:</b> {data?.grade}</p>
        <p><b>Session:</b> {data?.session}</p>
        <p><b>Comment:</b> {data?.comment}</p>
      </div>
      <div className='btn-container'>
        <Link to={`/dashboard/score/edit/${id}`} className='action-btn'>
          <FaPenFancy />
        </Link>
        <button type='button' className='danger-btn' onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </article>
  )
}

export default ScoreDetails