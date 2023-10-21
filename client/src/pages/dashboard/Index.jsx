import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "./index.css"


function Index({user, token}) {
  return (
    <>
      <Header user={user} token={token}/>
      <Sidebar/>
      <div className="main-content">
        <Outlet/>
      </div>
      <Footer/>
      <ScrollRestoration
        getKey={(location, ) => {
          return location.pathname;
        }}
      />
    </>
  )
}

Index.propTypes = {user: Object, token: String}

export default Index;