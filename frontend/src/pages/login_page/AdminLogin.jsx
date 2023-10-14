import admin_image from '../../assets/admin.jpg'
import "./login.css"

function AdminLogin() {
  return (
    <article className="login-page">
      <div class="login-container">
        <div class="left-column">
          <h2>Admin Login</h2>
          <form>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required/>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        <div class="right-column">
          <img src={admin_image} alt="a focused woman behind the laptop"/>
        </div>
      </div>
    </article>
  )
}

export default AdminLogin