import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  return (
    <article className='home'>
      <div className="container">
        <div className="column">
          <h2>Student Login</h2>
          <Link to="/login/student" className='success-btn'>Login</Link>
        </div>
        <div className="column">
          <h2>Staff Login</h2>
          <Link to="/login/admin" className='success-btn'>Login</Link>
        </div>
      </div>
    </article>
  )
}

export default Home