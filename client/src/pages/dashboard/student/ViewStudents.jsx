import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


function ViewStudents() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    let url =`${import.meta.env.VITE_APP_STUDENT_API_URL}`

    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setData(resp.data.allStudent))
    .catch(err => toast.error(err.message))
  }, [])

  return (
    <article className='sanctions-container'>
      {data?.map(student => (
        <Link to={`${student.email}`} key={student._id}>
          <p><b>First name:</b> {student.first_name}</p>
          <p><b>Last name:</b> {student.last_name}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Class:</b> {student.class}</p>
        </Link>
      ))}
    </article>
  )
}

export default ViewStudents