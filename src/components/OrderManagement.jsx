import React, {useEffect, useState} from "react";
import { Table, Button, Space, Tag } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom"; // Thêm import useNavigate
import constants from '../../constants';
import { getOrderList, updateOrderStatus } from "../apis/order";
import { Alert, Flex, Spin, Popconfirm } from 'antd';

const OrderManagement = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilter , setIsFilter] = useState(false);
  const pageNumber = Number.parseInt(searchParams.get("pn") !== null ? searchParams.get("pn") : 1);
  useEffect(() => {
    if(!isFilter) {
      setIsLoading(true);
      getOrderList(pageNumber, constants.CONST_ORDER_PER_PAGE).then((response) => {
        if (response.status === 200) {
          console.log(response.data.data.totalItems);
          console.log(response.data.data.items);
          setOrders(response.data.data.items);
          setTotalItems(response.data.data.totalItems);
        }
      }).catch((error) => {
        console.log(error);
      }).finally(() =>{
        setIsLoading(false);
      });
    }
  }, [])

  // Function to handle order status update
  const handleUpdateStatus = (record) => {
    updateOrderStatus(record._id, record.status).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      window.location.href = `/admin/orders?pn=${pageNumber}`
    }) 
  };

  // Function to handle viewing order details
  const handleViewDetails = (record) => {
    navigate(`/Admin/orders/${record._id}`);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Street address",
      dataIndex: "streetAddress",
      key: "streetAddress",
    },
    {
      title: "Total Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `${text.toLocaleString()} $`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "gray"
        let statusText = "Ordered"
        switch (status) {
          case constants.CONST_ORDER_STATUS_ORDERED:
            color = "gray"
            break;
          case constants.CONST_ORDER_STATUS_WATTING_FOR_PAYMENT:
              color = "gray"
              statusText = "Wait for payment"
              break;
          case constants.CONST_ORDER_STATUS_ACCEPTED:
            color = "blue"
            statusText = "Accepted"
            break;
          case constants.CONST_ORDER_STATUS_SHIPPING:
            color = "blue"
            statusText = "Shipping"
            break;
          case constants.CONST_ORDER_STATUS_SHIPPED:
            color = "green"
            statusText = "Shipped"
            break;
          case constants.CONST_ORDER_STATUS_COMPLETE:
              color = "green"
              statusText = "Completed"
          default:
            break;
        }
        return <Tag color={color}>{statusText}</Tag>;
      }
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        let nextStatus = ""
        switch (record.status) {
          case constants.CONST_ORDER_STATUS_ORDERED:
            nextStatus = constants.CONST_ORDER_STATUS_WATTING_FOR_PAYMENT_TEXT
            break;
          case constants.CONST_ORDER_STATUS_WATTING_FOR_PAYMENT:
            nextStatus = constants.CONST_ORDER_STATUS_ACCEPTED_TEXT
              break;
          case constants.CONST_ORDER_STATUS_ACCEPTED:
            nextStatus = constants.CONST_ORDER_STATUS_SHIPPING_TEXT
            break;
          case constants.CONST_ORDER_STATUS_SHIPPING:
            nextStatus = constants.CONST_ORDER_STATUS_SHIPPED_TEXT
            break;
          case constants.CONST_ORDER_STATUS_SHIPPED:
            nextStatus = constants.CONST_ORDER_STATUS_COMPLETE_TEXT
            break;
          default:
            break;
        }
        return (
        <Space size="middle">
          <Button type="primary" onClick={() => handleViewDetails(record)}>
            View Details
          </Button>
          <Popconfirm
            title={`Change order status`}
            description={`Are you sure change order status to ${nextStatus}? `}
            onConfirm={() => handleUpdateStatus(record)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No">
            <Button type="default">
              Update Status
            </Button>
          </Popconfirm>

        </Space>
      )},
    },
  ];

  return (
    <div>
      <h2>Order Management</h2>
      <Table columns={columns} dataSource={orders} pagination={{
          current:pageNumber,
          total: totalItems,
          pageSize: constants.CONST_PRODUCT_PER_PAGE,
          onChange: (pageNumber, pageSize) => {window.location.href=`/admin/orders?pn=${pageNumber}`}
        }}
        loading={isLoading && <Spin tip="Loading"></Spin>} 
        />
    </div>
  );
};

export default OrderManagement;
