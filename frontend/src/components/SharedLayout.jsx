import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'

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