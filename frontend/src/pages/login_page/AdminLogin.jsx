import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import admin_image from '../../assets/admin.jpg'
import "./login.css"


function AdminLogin() {
  const [formData, setFormData] = useState({email: "", password: ""})

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const result = await axios.post(import.meta.env.VITE_APP_ADMIN_AUTH_URL, formData)
      setFormData({email: "", password: ""})
      toast.success("Login successfully...")
      sessionStorage.setItem("token", result.data.user)
      navigate("/dashboard")
    } catch (error) {
      error.message && toast.error("Invalid email or password!")
    }
  }

  return (
    <article className="login-page">
      <div className="login-container">
        <div className="left-column">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} minLength="10"  placeholder="Enter your email" required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} minLength="6"  placeholder="Enter your password" required/>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="right-column">
          <img src={admin_image} alt="a focused woman behind the laptop"/>
        </div>
      </div>
    </article>
  )
}

export default AdminLogin