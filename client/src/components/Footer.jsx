function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <p>&copy; {year} :: Philip Oyelegbin</p>
    </footer>
  )
}

export default Footer