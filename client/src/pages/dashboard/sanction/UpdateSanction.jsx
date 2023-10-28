import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCircleNotch } from 'react-icons/fa'
import axios from 'axios'
import "../registration.css"


function UpdateSanction() {
  const {id} = useParams()
  const token = sessionStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [formData, setFormData] = useState({
    student: data?.student, incident: data?.incident, date: data?.date, time: data?.time, official: data?.official, location: data?.location, witnesses: data?.witnesses, penalties: data?.penalties, details: data?.details
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const result = await axios.post(`${import.meta.env.VITE_APP_SANCTION_API_URL}/${id}`, formData, {
        headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
      })
      setFormData({
        student: "", incident: "", date: "", time: "", official: "", location: "", witnesses: "", penalties: "", details: ""
      })
      toast.success(result.data?.message)
      navigate("/dashboard")
    } catch (error) {
      error.message && toast.error("Unable to update the sanction, try later...")
    } finally {
      setIsLoading(false)
    }
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
    <article className="registration-page">
      <div className="registration-container">
        <h2>Update a sanction</h2>
        <form autoComplete='off'>
          <div className='form-container'>
            <div className="form-group">
              <label htmlFor="student">Student email:</label>
              <input type="email" id="student" name="student" value={formData.student} onChange={handleChange} minLength={10} placeholder="md@example.com" required/>
            </div>

            <div className="form-group">
              <label htmlFor="incident">Incident:</label>
              <input type="text" id="incident" name="incident" value={formData.incident} onChange={handleChange} maxLength={150} placeholder="Broke a chair" required/>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date of event:</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required/>
            </div>

            <div className="form-group">
              <label htmlFor="time">Time of event:</label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required/>
            </div>

            <div className="form-group">
              <label htmlFor="official">Staff in charge:</label>
              <input type="text" id="official" name="official" value={formData.official} onChange={handleChange} minLength={4} placeholder='Mr Martins Adetoye' required/>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location of event:</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} minLength={4} maxLength={150} placeholder='Volleyball court' required/>
            </div>

            <div className="form-group">
              <label htmlFor="witnesses">Witnesses (optional):</label>
              <input type="text" id="witnesses" name="witnesses" value={formData.witnesses} onChange={handleChange} placeholder="List the names of the witnesses"/>
            </div>

            <div className="form-group">
              <label htmlFor="penalties">Penalties:</label>
              <input type="text" id="penalties" name="penalties" value={formData.penalties} onChange={handleChange} maxLength={150} placeholder="State the consequence of the incident..." required/>
            </div>

            <div className="form-group">
              <label htmlFor="details">Details of event:</label>
              <textarea name="details" id="details" cols="30" rows="3" value={formData.details} onChange={handleChange} placeholder="Detailed explanation of incident..."></textarea>
            </div>
          </div>
          <button type="submit" className="success-btn" onClick={handleSubmit}>{isLoading ? <FaCircleNotch/> : "Save"}</button>
        </form>
      </div>
    </article>
  )
}

export default UpdateSanction