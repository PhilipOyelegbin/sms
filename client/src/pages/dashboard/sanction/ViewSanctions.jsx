import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


function ViewSanctions() {
  const {email} = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    let url =(`${import.meta.env.VITE_APP_SANCTION_API_URL}`  || `${import.meta.env.VITE_APP_SANCTION_API_URL}/query?students=${email}`)

    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.allSanction))
    .catch(err => toast.error(err.message))
  }, [email])

  return (
    <article className='sanctions-container'>
      {data?.map(sanction => (
        <Link to={`${sanction._id}`} key={sanction._id}>
          <p><b>Student email:</b> {sanction.student}</p>
          <p><b>Incident:</b> {sanction.incident}</p>
          <p><b>Date:</b> {sanction.date}</p>
        </Link>
      ))}
    </article>
  )
}

export default ViewSanctions