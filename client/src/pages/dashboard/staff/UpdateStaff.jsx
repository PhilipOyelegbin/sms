import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCircleNotch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import "../registration.css"


function UpdateStaff() {
  const {id} = useParams()
  const token = sessionStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "", last_name: "", email: "", phone_number: "", gender: "", date_of_birth: "", role: "", subject: "", home_address: ""
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
      const result = await axios.patch(`${import.meta.env.VITE_APP_ADMIN_API_URL}/${id}`, formData, {
        headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
      })
      setFormData({
        first_name: "", last_name: "", email: "", phone_number: "", gender: "", date_of_birth: "", role: "", subject: "", home_address: ""
      })
      toast.success(result.data?.message)
      navigate("/dashboard")
    } catch (error) {
      error.message && toast.error("Unable to update the staff, try later...")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let url =`${import.meta.env.VITE_APP_ADMIN_API_URL}/${id}`

    axios.get(url, {headers: {
      Authorization: `Bearer ${token}`}
    })
    .then(resp => setFormData({
      first_name: resp.data.staff?.first_name, last_name: resp.data.staff?.last_name, email: resp.data.staff?.email, phone_number: resp.data.staff?.phone_number, gender: resp.data.staff?.gender, date_of_birth: resp.data.staff?.date_of_birth, role: resp.data.staff?.role, subject: resp.data.staff?.subject.toString(), home_address: resp.data.staff?.home_address
    }))
    .catch(err => err && toast.error("Unable to load data, try again later"))
  }, [token, id])

  return (
    <article className="registration-page">
      <div className="registration-container">
        <h2>Update staff details</h2>
        <form autoComplete='off'>
          <div className='form-container'>
            <div className="form-group">
              <label htmlFor="first_name">First name:</label>
              <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} maxLength={50} placeholder="Mark" required/>
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last name:</label>
              <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} maxLength={50} placeholder="Denver" required/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} minLength={10} placeholder="md@example.com" required/>
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone number:</label>
              <input type="tel" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} maxLength={50} placeholder="+2348XXXXXXXXX" required/>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select name="gender" id="gender" onChange={handleChange} required>
                <option value="">[Select your gender]</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date_of_birth">Date of birth:</label>
              <input type="date" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required/>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select name="role" id="role" onChange={handleChange} required>
                <option value="">[Administer a role]</option>
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject (optional):</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} maxLength={150} placeholder="English, Math, Biology..."/>
            </div>

            <div className="form-group">
              <label htmlFor="home_address">Home address:</label>
              <input type="text" id="home_address" name="home_address" value={formData.home_address} onChange={handleChange} maxLength={150} placeholder="7 Olalekan Bashiru Street, Agege Lagos." required/>
            </div>
          </div>

          <button type="submit" className="success-btn" onClick={handleSubmit}>{isLoading ? <FaCircleNotch/> : "Save"}</button>
        </form>
      </div>
    </article>
  )
}

export default UpdateStaff