import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AdminHeader = () => {
  return (
    <Header className="header" style={{ backgroundColor: "#001529" }}>
      <div
        className="logo"
        style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
      >
        Admin Panel
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/admin/users">Customer Management</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
          <Link to="/admin/products">Product Management</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileTextOutlined />}>
          <Link to="/admin/orders">Order Management</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreOutlined />}>
          <Link to="/admin/categories">Category Management</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LineChartOutlined />}>
          <Link to="/admin/reports">Sales Reports</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AdminHeader;
