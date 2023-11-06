import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCircleNotch } from 'react-icons/fa'
import axios from 'axios'
import "../registration.css"

function ChangePassword() {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({password: ""})

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
      setFormData({password: ""})
      toast.success(result.data?.message)
      navigate("/dashboard")
    } catch (error) {
      error.message && toast.error("Unable to create new staff, try later...")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="registration-page">
      <div className="registration-container">
        <h2>Update staff password</h2>
        <form autoComplete='off'>
          <div className="form-group">
            <label htmlFor="password">New password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} minLength={6} placeholder="xxxxxx" required/>
          </div>
          <button type="submit" className='success-btn' onClick={handleSubmit}>{isLoading ? <FaCircleNotch/> : "Save"}</button>
        </form>
      </div>
    </article>
  )
}

export default ChangePassword