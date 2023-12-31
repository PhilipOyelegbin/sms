/* eslint-disable react/prop-types */
import { FaCircleNotch } from "react-icons/fa"

function LoginForm({formData, isLoading, handleChange, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} minLength="10"  placeholder="Enter your email" required/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} minLength="6"  placeholder="Enter your password" required/>
      </div>
      <button type="submit" className="success-btn">{isLoading ? <FaCircleNotch/> : "Login"}</button>
    </form>
  )
}

export default LoginForm