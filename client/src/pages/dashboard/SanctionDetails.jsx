import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SanctionDetails() {
  const {id} = useParams()
  const [data, setData] = useState(null)

  const getSanctions = async() => {
    const token = sessionStorage.getItem('token');

    let url =`${import.meta.env.VITE_APP_SANCTION_API_URL}/${id}`

    await axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.sanction))
    .catch(err => toast.error(err.message))
  }

  useEffect(() => {
    getSanctions()
  }, [id])

  return (
    <article className='sanctions_container'>
      <p><b>Student email:</b> {data?.student}</p>
      <p><b>Incident:</b> {data?.incident}</p>
      <p><b>Details:</b> {data?.details}</p>
      <p><b>Date:</b> {data?.date}</p>
      <p><b>Time:</b> {data?.time}</p>
      <p><b>Location:</b> {data?.location}</p>
      <p><b>Witnesses:</b> {data?.witnesses}</p>
      <p><b>Penalties:</b> {data?.penalties}</p>
      <p><b>Official:</b> {data?.official}</p>
    </article>
  )
}

export default SanctionDetails