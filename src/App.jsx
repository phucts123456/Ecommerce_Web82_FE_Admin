import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import ShopRegistration from "./pages/ShopRegistration";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/shop/regist" element={<ShopRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
