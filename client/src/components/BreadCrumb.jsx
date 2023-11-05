import { useLocation } from "react-router-dom"

function BreadCrumb() {
  const location = useLocation()
  let currentPage = ""
  const crumbs = location.pathname.split("/")
    .filter(crumb => crumb !== "")
    .splice(0,2)

  if (crumbs.length > 1) {
    currentPage = crumbs[1].toUpperCase()
  } else {
    currentPage = crumbs[0].toUpperCase()
  }

  return (
    <h2>{currentPage}</h2>
  )
}

export default BreadCrumb