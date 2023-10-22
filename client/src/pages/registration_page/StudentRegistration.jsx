import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import user_image from '../../assets/user.jpg'
import "./registration.css"


function StudentRegistration() {
  const [formData, setFormData] = useState({
    first_name: "", last_name: "", email: "", class: "", gender: "", date_of_birth: "", blood_group: "", medical_information: "", disabilities: "", guardian_name: "", relationship: "", guardian_email: "", guardian_phone_number: "", guardian_address: "", emergency_name: "", emergency_phone_number: "", emergency_address: "", password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const result = await axios.post(import.meta.env.VITE_APP_STUDENT_API_URL, formData)
      setFormData({
        first_name: "", last_name: "", email: "", class: "", gender: "", date_of_birth: "", blood_group: "", medical_information: "", disabilities: "", guardian_name: "", relationship: "", guardian_email: "", guardian_phone_number: "", guardian_address: "", emergency_name: "", emergency_phone_number: "", emergency_address: "", password: ""
      })
      toast.success("Account created successfully...")
      sessionStorage.setItem("token", result.data.user)
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      error.message && toast.error("Invalid email or password!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="registration-page">
      <div className="registration-container">
        <div className="left-column">
          <h2>Student Registration</h2>
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
                <label htmlFor="class">Class:</label>
                <input type="text" id="class" name="class" value={formData.class} onChange={handleChange} placeholder="JSS1" required/>
              </div>

              <div className="form-group">
                <label htmlFor="blood_group">Blood group:</label>
                <input type="text" id="blood_group" name="blood_group" value={formData.blood_group} onChange={handleChange} maxLength={3}  placeholder="AA" required/>
              </div>

              <div className="form-group">
                <label htmlFor="medical_information">Other medical information (optional):</label>
                <input type="text" id="medical_information" name="medical_information" value={formData.medical_information} onChange={handleChange} maxLength={150} placeholder="An asthmatic patient"/>
              </div>

              <div className="form-group">
                <label htmlFor="disabilities">Disabilities (optional):</label>
                <input type="text" id="disabilities" name="disabilities" value={formData.disabilities} onChange={handleChange} maxLength={150} placeholder="Physically challenged"/>
              </div>

              <div className="form-group">
                <label htmlFor="guardian_name">Guardian name:</label>
                <input type="text" id="guardian_name" name="guardian_name" value={formData.guardian_name} onChange={handleChange} maxLength={50} placeholder="Mr John Denver" required/>
              </div>

              <div className="form-group">
                <label htmlFor="relationship">Guardian relationship:</label>
                <input type="text" id="relationship" name="relationship" value={formData.relationship} onChange={handleChange} maxLength={50} placeholder="Father" required/>
              </div>

              <div className="form-group">
                <label htmlFor="guardian_email">Guardian email:</label>
                <input type="email" id="guardian_email" name="guardian_email" value={formData.guardian_email} onChange={handleChange} minLength={10} placeholder="jd@example.com" required/>
              </div>

              <div className="form-group">
                <label htmlFor="guardian_phone_number">Guardian phone number:</label>
                <input type="tel" id="guardian_phone_number" name="guardian_phone_number" value={formData.guardian_phone_number} onChange={handleChange} maxLength={50} placeholder="+2348xxxxxxxxx" required/>
              </div>

              <div className="form-group">
                <label htmlFor="guardian_address">Guardian address:</label>
                <input type="text" id="guardian_address" name="guardian_address" value={formData.guardian_address} onChange={handleChange} maxLength={150} placeholder="7 Olalekan Bashiru Street, Agege Lagos." required/>
              </div>

              <div className="form-group">
                <label htmlFor="emergency_name">Emergency name:</label>
                <input type="text" id="emergency_name" name="emergency_name" value={formData.emergency_name} onChange={handleChange} maxLength={50} placeholder="Mrs Mary Denver" required/>
              </div>

              <div className="form-group">
                <label htmlFor="emergency_phone_number">Emergency phone_number:</label>
                <input type="tel" id="emergency_phone_number" name="emergency_phone_number" value={formData.emergency_phone_number} onChange={handleChange} maxLength={50} placeholder="+2348xxxxxxxxx" required/>
              </div>

              <div className="form-group">
                <label htmlFor="emergency_address">Emergency address:</label>
                <input type="text" id="emergency_address" name="emergency_address" value={formData.emergency_address} onChange={handleChange} maxLength={150} placeholder="7 Olalekan Bashiru Street, Agege Lagos." required/>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} minLength={6} placeholder="xxxxxx" required/>
              </div>
            </div>
            <button type="submit" onClick={handleSubmit}>{isLoading ? "Loading" : "Register"}</button>
          </form>
        </div>

        <div className="right-column">
          <img src={user_image} alt="a bright mind full of life"/>
        </div>
      </div>
    </article>
  )
}

export default StudentRegistration