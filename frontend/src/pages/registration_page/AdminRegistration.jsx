import admin_image from '../../assets/admin.jpg'
import "./registration.css"

function AdminRegistration() {
  return (
    <article className="registration-page">
      <div className="registration-container">
        <div className="left-column">
          <h2>Admin Registration</h2>
          <form>
            <div className="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required/>
            </div>
            <div className="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required/>
            </div>
            <div className="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>

        <div className="right-column">
          <img src={admin_image} alt="a focused woman behind the laptop"/>
        </div>
      </div>
    </article>
  )
}

export default AdminRegistration