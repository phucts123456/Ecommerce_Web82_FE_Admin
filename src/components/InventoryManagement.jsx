import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Input, Space } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const InventoryManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mock data fetch simulation
    // Replace with actual API call to fetch inventory data
    setData([
      {
        key: "1",
        name: "Product 1",
        stock: 50,
      },
      {
        key: "2",
        name: "Product 2",
        stock: 0,
      },
      // Add more inventory data here
    ]);
  }, []);

  const handleEdit = (record) => {
    console.log("Edit record:", record);
    // Implement edit functionality
  };

  const handleDelete = (key) => {
    console.log("Delete record key:", key);
    // Implement delete functionality
    setData(data.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search product name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Stock Quantity",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => (
        <Tag color={stock > 0 ? "green" : "red"}>
          {stock > 0 ? `${stock} items` : "Out of Stock"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <Button
            danger
            onClick={() => handleDelete(record.key)}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Inventory Management</h2>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default InventoryManagement;
