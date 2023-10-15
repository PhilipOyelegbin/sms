import { useState } from 'react'
import axios from 'axios'
import user_image from '../../assets/user.jpg'
import "./login.css"


function UserLogin() {
  const [formData, setFormData] = useState({email: "", password: ""})

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    await axios.post(import.meta.env.VITE_APP_STUDENT_AUTH_URL, formData).then(result => {
      console.log(result)
      setFormData({email: "", password: ""})
    }).catch(err => alert(err))
  }

  return (
    <article className="login-page">
      <div className="login-container">
        <div className="left-column">
          <h2>Student Login</h2>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} minLength="10"  placeholder="Enter your email" required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} minLength="6" placeholder="Enter your password" required/>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="right-column">
          <img src={user_image} alt="a bright mind full of life"/>
        </div>
      </div>
    </article>
  )
}

export default UserLogin