import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import jwt_decode from 'jwt-decode'
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaChartPie,
  FaRegEye,
  FaRegIdBadge,
  FaRegIdCard,
  FaUsers
} from "react-icons/fa"


function Dashboard() {
  const [whoIs, setWhoIs] = useState(null)
  // eslint-disable-next-line react/prop-types
  const DashboardCard = ({icon, url, name}) => (
    <div className="card">
      {icon}
      <Link to={url} className="action-btn">{name}</Link>
    </div>
  )

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    const decode = jwt_decode(token)
    setWhoIs(decode.role)
  }, [])

  return (
    <section className="card-container">
      {/* Staff views */}
      {(whoIs !== "Student") && (
        <>
          <DashboardCard
            icon={<FaRegIdCard className="card-icon"/>}
            url="register/admin"
            name="New Staff"
          />
          <DashboardCard
            icon={<FaUsers className="card-icon"/>}
            url="staff/view"
            name="Staffs"
          />
          <DashboardCard
            icon={<FaRegIdBadge className="card-icon"/>}
            url="register/student"
            name="New Student"
          />
          <DashboardCard
            icon={<FaUsers className="card-icon"/>}
            url="student/view"
            name="Students"
          />
          <DashboardCard
            icon={<FaChalkboardTeacher className="card-icon"/>}
            url="score/create"
            name="New Score"
          />
          <DashboardCard
            icon={<FaBookOpen className="card-icon"/>}
            url="sanction/create"
            name="New Sanction"
          />
        </>
      )}

      {/* general view */}
      <DashboardCard
        icon={<FaChartPie className="card-icon"/>}
        url="score/view"
        name="Scores"
      />
      <DashboardCard
        icon={<FaRegEye className="card-icon"/>}
        url="sanction/view"
        name="Sanctions"
      />
    </section>
  )
}

export default Dashboard