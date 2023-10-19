import { ScrollRestoration } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import "./index.css"


function Index({children}) {
  return (
    <>
      <Sidebar/>
      <div className="main-content">
        {children}
      </div>
      <Footer/>
      <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname;
        }}
      />
    </>
  )
}

export default Index;