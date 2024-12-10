import React from "react";
import { Layout, Button } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";

import Dashboard from "../components/Dashboard";
import UserManagement from "../components/UserManagement";
import ProductManagement from "../components/ProductManagement";
import OrderManagement from "../components/OrderManagement";
import InventoryManagement from "../components/InventoryManagement";
import CategoryManagement from "../components/CategoryManagement";
import AddProduct from "../components/AddProduct";
import OrderDetail from "../components/OrderDetail";
import UserDetail from "../components/UserDetail";
import PrivateRoute from "../components/Layout/PrivateRoute";

const { Content, Sider } = Layout;

const AdminHome = () => {
  const navigate = useNavigate();

  // Hàm xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} className="site-layout-background">
        <Sidebar />
        {/* Thêm nút "Admin" để logout */}
        <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
          <Button type="primary" onClick={handleLogout}>
            Admin
          </Button>
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            minHeight: 280,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Routes>
          <Route Component={PrivateRoute}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit" element={<AddProduct />} />
            <Route path="orders/:orderId" element={<OrderDetail />} />
            <Route path="users/:userId" element={<UserDetail />} />
           </Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;
