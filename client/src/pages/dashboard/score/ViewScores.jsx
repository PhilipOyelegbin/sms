import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import jwt_decode from 'jwt-decode'


function ViewScores() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    let authUser;

    if(token !== undefined) {
      const decoded = jwt_decode(token);
      authUser = decoded
    }

    if(authUser?.role !== "Student") {
      let staffUrl = `${import.meta.env.VITE_APP_SCORE_API_URL}`
      axios.get(staffUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => setData(resp.data.allScore))
      .catch(err => toast.error(err.message))
      .finally(setLoading(false))
    } else {
      let studentUrl = `${import.meta.env.VITE_APP_SCORE_API_URL}/query?student=${authUser?.email}`
      axios.get(studentUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => setData(resp.data.score))
      .catch(err => toast.error(err.message))
      .finally(setLoading(false))
    }
  }, [])

  return (
    <article className='scores-container'>
      {loading && <h3>Please wait...</h3>}
      {(Array.isArray(data)) ? data?.map(score => (
        <Link to={`${score._id}`} key={score._id}>
          <p><b>Student ID:</b> {score.student}</p>
          <p><b>Grade:</b> {score.grade}</p>
          <p><b>Session:</b> {score.session}</p>
        </Link>
      )) : data?._id &&
        <Link to={`${data._id}`}>
          <p><b>Student ID:</b> {data.student}</p>
          <p><b>Grade:</b> {data.grade}</p>
          <p><b>Session:</b> {data.session}</p>
        </Link>
      }
    </article>
  )
}

export default ViewScores