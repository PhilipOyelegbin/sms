import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCircleNotch } from 'react-icons/fa'
import axios from 'axios'
import "../registration.css"


function CreateScore() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    student: "", math: "", english: "", biology: "", government: "", session: "", comment: ""
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
      const result = await axios.post(import.meta.env.VITE_APP_SCORE_API_URL, formData, {
        headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
      })
      setFormData({
        student: "", math: "", english: "", biology: "", government: "", session: "", comment: ""
      })
      toast.success(result.data?.message)
      navigate("/dashboard")
    } catch (error) {
      error.message && toast.error("Unable to create new score, try later...")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="registration-page">
      <div className="registration-container">
        <h2>Create New Score</h2>
        <form autoComplete='off'>
          <div className='form-container'>
            <div className="form-group">
              <label htmlFor="student">Student email:</label>
              <input type="email" id="student" name="student" value={formData.student} onChange={handleChange} minLength={10} placeholder="md@example.com" required/>
            </div>

            <div className="form-group">
              <label htmlFor="math">Math:</label>
              <input type="number" id="math" name="math" value={formData.math} onChange={handleChange} maxLength={100} placeholder="80" required/>
            </div>

            <div className="form-group">
              <label htmlFor="english">English:</label>
              <input type="number" id="english" name="english" value={formData.english} onChange={handleChange} maxLength={100} placeholder="80" required/>
            </div>

            <div className="form-group">
              <label htmlFor="biology">Biology:</label>
              <input type="number" id="biology" name="biology" value={formData.biology} onChange={handleChange} maxLength={100} placeholder="80" required/>
            </div>

            <div className="form-group">
              <label htmlFor="government">Government:</label>
              <input type="number" id="government" name="government" value={formData.government} onChange={handleChange} maxLength={100} placeholder="80" required/>
            </div>

            <div className="form-group">
              <label htmlFor="session">Session:</label>
              <input type="text" id="session" name="session" value={formData.session} onChange={handleChange} maxLength={50} placeholder="First term" required/>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea name="comment" id="comment" cols="30" rows="3" value={formData.comment} onChange={handleChange} placeholder="Class teacher comment..."></textarea>
            </div>
          </div>
          <button type="submit" className="success-btn" onClick={handleSubmit}>{isLoading ? <FaCircleNotch/> : "Send"}</button>
        </form>
      </div>
    </article>
  )
}

export default CreateScore