import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode'


const ProtectedRoutes = () => {
  const token = sessionStorage.getItem("token")
  const time = new Date().getTime()/1000
  let cutOffTime = time.toFixed()
  let expTime = null

  if(token) {
    const decode = jwt_decode(token)
    expTime = decode.exp
  }

  if(parseInt(cutOffTime) > expTime) {
    sessionStorage.clear()
    return <Navigate to={"/"}/>
  }

  return token !== null ? <Outlet/> : <Navigate to='/'/>;
}

export default ProtectedRoutes;