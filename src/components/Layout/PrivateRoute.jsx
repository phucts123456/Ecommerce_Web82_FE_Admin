import { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import store from "../../store";
import { sessionService } from 'redux-react-session';
import { jwtDecode } from "jwt-decode";
import { getUserDetail } from "../../apis/user";
import UserContext from "../../context/userContext";
const PrivateRoute = (props) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    if(isLogin) {
      const decoded = jwtDecode(localStorage.getItem('accessToken'));
      getUserDetail(decoded.id).then((response) => {
        console.log(response.data.data)
        setUser(response.data.data);
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [])

  return (   
    isLogin 
    ? <UserContext.Provider value={{user, setUser}}>
        <Outlet />
      </UserContext.Provider>
    : <Navigate to='/' />
  )
}

export default PrivateRoute