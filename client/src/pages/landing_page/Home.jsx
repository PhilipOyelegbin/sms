import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  return (
    <article className='home'>
      <div className="container">
        <div className="column">
          <h2>Student Login</h2>
          <Link to="/login/student" className='btn-login'>Login</Link>
        </div>
        <div className="column">
          <h2>Admin Login</h2>
          <Link to="/login/admin" className='btn-login'>Login</Link>
        </div>
      </div>
    </article>
  )
}

export default Home