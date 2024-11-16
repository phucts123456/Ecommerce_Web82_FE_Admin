import { Card, Typography, Table, Button } from "antd";
import { useParams, useNavigate, json } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { getOrderDetail } from "../apis/order";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getOrderDetail(orderId).then((response) => {
      console.log(response)
      if (response.status === 200) {
        setOrderDetail(response.data.data.order);
        setOrderItems(response.data.data.orderItems);
      }
    }).catch((error) => {
      console.log(error)
      setMessage(error.response.data.message);
    })
  }, [])
  // Dữ liệu mẫu cho đơn hàng
  const orderData = {
    DH001: {
      street: "123 Main St",
      address: "Building A",
      company: "ABC Company",
      apartment: "Apartment 4B",
      city: "Hanoi",
      phoneNumber: "0123456789",
      email: "customer@example.com",
      orderDate: "2024-09-28",
      payment: "Credit Card",
      status: "Completed",
      products: [
        { name: "Product 1", price: 200000, quantity: 2 },
        { name: "Product 2", price: 150000, quantity: 1 },
      ],
    },
    DH002: {
      street: "456 Another St",
      address: "Building B",
      company: "XYZ Company",
      apartment: "Apartment 3A",
      city: "Ho Chi Minh City",
      phoneNumber: "0987654321",
      email: "customer2@example.com",
      orderDate: "2024-09-29",
      payment: "PayPal",
      status: "Processing",
      products: [
        { name: "Product 3", price: 300000, quantity: 1 },
      ],
    },
  };

  // Lấy thông tin đơn hàng dựa trên orderId
  const order = orderData[orderId] || {};

  // Cấu hình cột cho bảng sản phẩm
  const columns = [
    {
      title: "Product",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => record.productId.name
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString()} $`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (text) => `${text.toLocaleString()} $`,
    },
  ];

  return (
    <Card title="Order Details" style={{ width: 600 }}>
      <Typography.Paragraph>
        <strong>Order ID:</strong> {orderDetail?._id || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Street:</strong> {orderDetail?.streetAddress || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Company:</strong> {orderDetail?.company || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Apartment:</strong> {orderDetail?.apartment || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>City:</strong> {orderDetail?.city || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Phone Number:</strong> {orderDetail?.phoneNumber || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Email:</strong> {orderDetail?.email || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Order Date:</strong> {new Date(orderDetail?.orderDate).toLocaleDateString() || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Payment:</strong> {orderDetail?.payment || ""}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Status:</strong> {orderDetail?.status || ""}
      </Typography.Paragraph>

      {/* Bảng sản phẩm */}
      <Table
        columns={columns}
        dataSource={orderItems || []}
        pagination={false}
        rowKey="name"
        style={{ marginTop: 16 }}
      />
      
      {/* Nút Back */}
      <Button type="primary" style={{ marginTop: 16 }} onClick={() => navigate("/Admin/orders")}>
        Back to Order Management
      </Button>
    </Card>
  );
};

export default OrderDetail;
