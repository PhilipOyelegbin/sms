import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaChevronCircleRight,
  FaChevronCircleLeft,
  FaHome,
  FaUser,
  FaArrowAltCircleLeft
} from "react-icons/fa"
import logo from '../assets/sms.png'

function Sidebar() {
  const [toggleBar, setToggleBar] = useState(false)

  const navigate = useNavigate()

  const handleExit = () => {
    navigate('/')
    sessionStorage.clear()
  }

  return (
    <aside className={`sidebar ${!toggleBar && "sidebar-hide"}`}>
      <div className='sidebar-header'>
        <img src={logo} className='logo' alt="sms logo" />
        <FaChevronCircleRight className={`toggle-btn ${toggleBar && "toggle-btn-invisible"}`} onClick={() => setToggleBar(prev => !prev)} />
        <FaChevronCircleLeft className={`toggle-btn ${!toggleBar && "toggle-btn-invisible"}`} onClick={() => setToggleBar(prev => !prev)} />
      </div>

      <div className="sidebar-content">
        <Link to="/dashboard" onClick={() => setToggleBar(prev => !prev)}><FaHome/> Dashboard</Link>
        <Link to="profile" onClick={() => setToggleBar(prev => !prev)}><FaUser/> My Profile</Link>
        <button className='danger-btn' onClick={handleExit}>Exit <FaArrowAltCircleLeft/></button>
      </div>
    </aside>
  )
}

export default Sidebar