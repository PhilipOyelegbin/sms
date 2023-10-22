function Header(data) {
  return (
    <header className="header">
      <h2>Dashboard</h2>
      <p>{data.data?.first_name}</p>
    </header>
  )
}


export default Header