import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import jwt_decode from 'jwt-decode'


function ViewScores() {
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
    } else {
      let studentUrl = `${import.meta.env.VITE_APP_SCORE_API_URL}/query?students=${authUser?.email}`
      axios.get(studentUrl, {headers: {
        Authorization: `Bearer ${token}`}
      })
      .then(resp => (console.log(resp),setData(resp.data.score)))
      .catch(err => (console.log(err),toast.error(err.message)))
    }
  }, [])

  return (
    <article className='scores-container'>
      {data?.map(score => (
        <Link to={`${score._id}`} key={score._id}>
          <p><b>Student ID:</b> {score.student}</p>
          <p><b>Grade:</b> {score.grade}</p>
          <p><b>Session:</b> {score.session}</p>
        </Link>
      ))}
    </article>
  )
}

export default ViewScores