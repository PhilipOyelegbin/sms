import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import jwt_decode from 'jwt-decode'


function ViewSanctions() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    let authUser;

    if(token !== undefined) {
      const decoded = jwt_decode(token);
      authUser = decoded
    }

    if(authUser?.role !== "Student") {
      let staffUrl = `${import.meta.env.VITE_APP_SANCTION_API_URL}`
      axios.get(staffUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => setData(resp.data.allSanction))
      .catch(err => toast.error(err.message))
    } else {
      let studentUrl = `${import.meta.env.VITE_APP_SANCTION_API_URL}/query?student=${authUser?.email}`
      axios.get(studentUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => setData(resp.data.sanction))
      .catch(err => toast.error(err.message))
    }
  }, [])

  return (
    <article className='sanctions-container'>
      {!data && <h3>No sanctions available!</h3>}
      {(Array.isArray(data)) ? data?.map(sanction => (
        <Link to={`${sanction._id}`} key={sanction._id}>
          <p><b>Student email:</b> {sanction.student}</p>
          <p><b>Incident:</b> {sanction.incident}</p>
          <p><b>Date:</b> {sanction.date}</p>
        </Link>
      )) :
        <Link to={`${data?._id}`}>
          <p><b>Student email:</b> {data?.student}</p>
          <p><b>Incident:</b> {data?.incident}</p>
          <p><b>Date:</b> {data?.date}</p>
        </Link>
      }
    </article>
  )
}

export default ViewSanctions