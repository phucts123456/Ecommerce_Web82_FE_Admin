import React, {useEffect, useState, useContext} from "react";
import { Table, Button, Space } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom"; // import useNavigate
import { activeUser, deleteUser, getUserDetail, getUserList } from "../apis/user";
import constants from '../../constants';
import { Spin } from 'antd';
import { Popconfirm } from 'antd';
import { getProductStock } from "../apis/productStock";
import UserContext from "../context/userContext";
const StockManagement = () => {
  const navigate = useNavigate();
  const [productStocks, setProductStocks] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const pageNumber = Number.parseInt(searchParams.get("pn") !== null ? searchParams.get("pn") : 1);
  const userContext = useContext(UserContext);
  useEffect(() => {
    setIsLoading(true);
    if (!userContext) navigate('/')
    console.log(userContext)
    const shopId = userContext.user ? userContext.user.shopId._id : ""
    getProductStock(pageNumber, constants.CONST_PRODUCT_STOCK_PER_PAGE,shopId,"").then((response) => {
      if (response.status === 200) {
        console.log(response.data.data.totalItems);
        console.log(response.data.data.items);
        setProductStocks(response.data.data.items);
        setTotalItems(response.data.data.totalItems);
      }
    }).catch((error) => {
      console.log("System has error:" + error);
    }).finally(() =>{
      setIsLoading(false);
    });
  }, [])
  const columns = [
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
      render: (t, r) => r.productId._id ? `${r.productId._id}` : ""
    },
    {
      title: "Variation Id",
      dataIndex: "variationId",
      key: "variationId",
      render: (t, r) => r.variationId._id ? `${r.variationId._id}` : ""
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (t, r) => r.productId.name ? `${r.productId.name}` : ""
    },
    {
      title: "Variation Name",
      dataIndex: "varationName",
      key: "varationName",
      render: (t, r) => r.variationId.name ? `${r.variationId.name}` : ""
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: 'Eidt',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    },  
  ];

    // Function to handle product edit
    const handleEdit = (record) => {
        navigate(`/admin/stock/edit?pid=${record.productId._id}&vid=${record.variationId._id}`);
    };

        // Function to handle delete user
    const handleDeleteUser = async (record) => {
      console.log("delete")
      await deleteUser(record._id).then((response) => {
        setMessage(response.data.message);
      }).catch((error) => {
        setMessage(error.response?.data?.message);
        console.log(error);
      }).finally(() => {
        window.location.href = `/admin/users?pn=${pageNumber}`
      }) 
    };

    // Function to handle active user
    const handleActiveUser = async (record) => {
      console.log("active")
      await activeUser(record._id).then((response) => {
        console.log(response)
        setMessage(response.data.message);
      }).catch((error) => {
        console.log(error)
        setMessage(error.response?.data?.message);
        console.log(error);
      }).finally(() => {
        window.location.href = `/admin/users?pn=${pageNumber}`
      }) 
    };

  return (
    <div>
      <h2>Stock Management</h2>
      <Table columns={columns} dataSource={productStocks} pagination={{
          current:pageNumber,
          total: totalItems,
          pageSize: constants.CONST_PRODUCT_PER_PAGE,
          onChange: (pageNumber, pageSize) => {window.location.href=`/admin/product-stock?pn=${pageNumber}`}
        }}
        loading={isLoading && <Spin tip="Loading"></Spin>} 
        />
    </div>
  );
};

export default StockManagement;
