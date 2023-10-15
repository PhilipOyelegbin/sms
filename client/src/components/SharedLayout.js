import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'

const SharedLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
      <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname;
        }}
      />
    </>
  )
}

export default SharedLayout