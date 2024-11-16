import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProductList } from '../apis/product';
import constants from '../../constants';
import { Spin } from 'antd';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number.parseInt(searchParams.get("pn") !== null ? searchParams.get("pn") : 1);
  const pageSize = constants.CONST_PRODUCT_PER_PAGE;
  useEffect(() => {
    setIsLoading(true);
    console.log(pageNumber)
    getProductList(pageNumber,"", null, constants.CONST_PRODUCT_PER_PAGE).then((response) => {
      if (response.status === 200) {
        console.log(response.data.data.totalItems);
        console.log(response.data.data.items);
        setProducts(response.data.data.items);
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} VND`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Availble',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: (isAvailable) => isAvailable ? "Yes" : "No" 
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (categoryId) => categoryId === null ? "" : categoryId.name
    },
    {
      title: 'Thao tác',
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

  // Function to navigate to the Add Product page
  const goToAddProductPage = () => {
    navigate("/admin/products/add");
  };

  // Function to handle product edit
  const handleEdit = (record) => {
    navigate(`/admin/products/edit?pid=${record._id}`);
  };

  // Function to handle product deletion
  const handleDelete = (key) => {
    console.log("Delete product with key:", key);
    // Implement product deletion logic here
  };

  return (
    <div>
      <h2>Product Management</h2>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={goToAddProductPage}
      >
        Add New Product
      </Button>
      <Table columns={columns} dataSource={products} pagination={{
          current:pageNumber,
          total: totalItems,
          pageSize: constants.CONST_PRODUCT_PER_PAGE,
          onChange: (pageNumber, pageSize) => {window.location.href=`/admin/products?pn=${pageNumber}`}
        }}
        loading={isLoading && <Spin tip="Loading"></Spin>} 
        />
        
    </div>
  );
};

export default ProductManagement;
