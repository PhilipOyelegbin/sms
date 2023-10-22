import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import LoginForm from '../../components/LoginForm'
import admin_image from '../../assets/admin.jpg'
import "./login.css"


function AdminLogin() {
  const [formData, setFormData] = useState({email: "", password: ""})
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
      const result = await axios.post(import.meta.env.VITE_APP_ADMIN_AUTH_URL, formData)
      setFormData({email: "", password: ""})
      toast.success("Login successfully...")
      sessionStorage.setItem("token", result.data.staff)
      navigate("/dashboard")
    } catch (error) {
      error.message && toast.error("Invalid email or password!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="login-page">
      <div className="login-container">
        <div className="left-column">
          <h2>Admin Login</h2>
          <LoginForm formData={formData} isLoading={isLoading} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>

        <div className="right-column">
          <img src={admin_image} alt="a focused woman behind the laptop"/>
        </div>
      </div>
    </article>
  )
}

export default AdminLogin