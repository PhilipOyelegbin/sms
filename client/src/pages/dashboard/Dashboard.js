import { Link } from "react-router-dom"
import Index from "./Index"

function Dashboard() {
  const cardDetails = [
    {url: "register/student", name: "New Student"},
    {url: "register/admin", name: "New Admin"},
    {url: "score/create", name: "New Score"},
    {url: "score/view", name: "My Scores"},
    {url: "sanction/create", name: "New Sanction"},
    {url: "sanction/view", name: "My Sanction"},
    {url: "sanction/create", name: "New Sanction"},
  ]

  return (
    <Index>
      <section>
        {cardDetails?.map((item, index) => (
          <div className="card" key={index}>
            <Link to={item.url} >{item.name}</Link>
          </div>
        ))}
      </section>
    </Index>
  )
}

export default Dashboard