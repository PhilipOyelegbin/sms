import BreadCrumb from "./BreadCrumb"

function Header(state) {
  return (
    <header className="header">
      <BreadCrumb/>
      <p>{state?.first_name}</p>
    </header>
  )
}


export default Header