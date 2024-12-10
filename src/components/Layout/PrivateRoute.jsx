import { useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import store from "../../store";
const PrivateRoute = (props) => {
  const [isLogin, setIsLogin] = useState(store.getState().user.loginUser.token);
  return (
      isLogin ? <Outlet /> : <Navigate to='/' />
  )
}

export default PrivateRoute