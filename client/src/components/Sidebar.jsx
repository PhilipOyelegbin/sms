import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaChevronCircleRight,
  FaChevronCircleLeft,
  FaHome,
  FaUser,
  FaArrowAltCircleLeft
} from "react-icons/fa"


function Sidebar() {
  const [toggleBar, setToggleBar] = useState(false)

  const navigate = useNavigate()

  const handleExit = () => {
    navigate('/')
  }

  return (
    <aside className={`sidebar ${!toggleBar && "sidebar-hide"}`}>
      <div className='sidebar-header'>
        <h1>SMS</h1>
        <FaChevronCircleRight className={`toggle-btn ${toggleBar && "toggle-btn-invisible"}`} onClick={() => setToggleBar(prev => !prev)} />
        <FaChevronCircleLeft className={`toggle-btn ${!toggleBar && "toggle-btn-invisible"}`} onClick={() => setToggleBar(prev => !prev)} />
      </div>

      <div className="sidebar-content">
        <Link to="/dashboard"><FaHome/> Dashboard</Link>
        <Link to="profile"><FaUser/> My Profile</Link>
        <button className='logout-btn' onClick={handleExit}>Exit <FaArrowAltCircleLeft/></button>
      </div>
    </aside>
  )
}

export default Sidebar