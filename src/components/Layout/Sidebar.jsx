import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: 256, height: "100vh", background: "#001529" }}>
      <Menu mode="inline" theme="dark" defaultSelectedKeys={["dashboard"]}>
        <Menu.Item key="dashboard">
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="users">
          <Link to="/admin/users">Customer Management</Link>
        </Menu.Item>
        <Menu.Item key="products">
          <Link to="/admin/products">Product Management</Link>
        </Menu.Item>
        <Menu.Item key="stock">
          <Link to="/admin/stock">Stock Management</Link>
        </Menu.Item>
        <Menu.Item key="orders">
          <Link to="/admin/orders">Order Management</Link>
        </Menu.Item>
        <Menu.Item key="categories">
          <Link to="/admin/categories">Category Management</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
