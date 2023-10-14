import user_image from '../../assets/user.jpg'
import "./login.css"

function UserLogin() {
  return (
    <article className="login-page">
      <div class="login-container">
        <div class="left-column">
          <h2>Student Login</h2>
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
          <img src={user_image} alt="a bright mind full of life"/>
        </div>
      </div>
    </article>
  )
}

export default UserLogin