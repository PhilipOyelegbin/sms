import { Link } from "react-router-dom"
import {
  FaBinoculars,
  FaBookOpen,
  FaChalkboardTeacher,
  FaChartPie,
  FaRegEye,
  FaRegIdBadge,
  FaRegIdCard
} from "react-icons/fa"


function Dashboard() {
  const cardDetails = [
    {icon: <FaRegIdCard className="card-icon"/>, url: "register/admin", name: "New Admin"},
    {icon: <FaRegIdBadge className="card-icon"/>, url: "register/student", name: "New Student"},
    {icon: <FaChalkboardTeacher className="card-icon"/>, url: "score/create", name: "New Score"},
    {icon: <FaChartPie className="card-icon"/>, url: "score/view", name: "My Scores"},
    {icon: <FaBookOpen className="card-icon"/>, url: "sanction/create", name: "New Sanction"},
    {icon: <FaRegEye className="card-icon"/>, url: "sanction/view/:id", name: "My Sanction"},
    {icon: <FaBinoculars className="card-icon"/>, url: "sanction/view", name: "All Sanction"},
  ]

  return (
    <section className="card-container">
      {cardDetails?.map((item, index) => (
        <div className="card" key={index}>
          {item.icon}
          <Link to={item.url} className="card-btn">{item.name}</Link>
        </div>
      ))}
    </section>
  )
}

export default Dashboard