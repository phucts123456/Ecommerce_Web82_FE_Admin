// src/components/CategoryManagement.js
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { createCategory, deleteCategory, getCategoryList, updateCategory } from "../apis/category";
import { Spin, Alert } from 'antd';
import { redirect, useNavigate, useSearchParams } from "react-router-dom"; 
import { Popconfirm } from 'antd';
import constants from '../../constants';
const CategoryManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilter , setIsFilter] = useState(false);
  const [isSuccess , setIsSuccess] = useState(searchParams.get("success") !== null 
    ? searchParams.get("success") === 'true' 
    ? true
    : false 
  : false);
  const [action , setAction] = useState(searchParams.get("action"));
  const [message , setMessage] = useState("");
  const [messageModal , setMessageModal] = useState("");
  const [totalPage , setTotalPage] = useState(0);
  const navigate = useNavigate();
  const pageNumber = Number.parseInt(searchParams.get("pn") !== null ? searchParams.get("pn") : 1);
  useEffect(() => {
    if(!isFilter) {
      setIsLoading(true);
      setMessage("");
      getCategoryList(pageNumber, constants.CONST_CATEGORY_PER_PAGE).then((response) => {
        if (response.status === 200) {
          console.log(response);
          console.log(response.data.data.items);
          setCategories(response.data.data.items);
          setTotalItems(response.data.data.totalItems);
          setTotalPage(response.data.data.totalPage)
        }
      }).catch((error) => {
        console.log(error);
      }).finally(() =>{
        setIsLoading(false);
      });
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      let isSuccess = false;
      deleteCategory(id).then((response) => {
        console.log(response)
        setIsSuccess(true);
        isSuccess = true;
      }).catch((error) => {
        console.log(error.response.data.message)
        setMessage(error.response.data.message);
        setIsSuccess(false);
        isSuccess = false;
      }).finally(() => {
        if(isSuccess) {
            window.location.href =`/admin/categories?pn=${categories.length > 1 ? pageNumber : pageNumber > 1 ? pageNumber - 1 :pageNumber}&success=true&action=delete`;
          }
      });
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const categoryName = values.name;
      const categoryId = values._id;
      console.log(values)
      setIsLoading(true);
      let isSuccess = false;
      if (editingCategory) {
        updateCategory(categoryId, categoryName).then((response) => {
          setMessageModal(response.data.message);
          setIsSuccess(true);
          isSuccess = true;
        }).catch((error) => {
          setMessageModal(error.response.data.message);
          setIsSuccess(false);
          isSuccess = false;
        }).finally(() => {
          setIsLoading(false);
          if(isSuccess) {
            window.location.href =`/admin/categories?pn=${categories.length > 1 ? pageNumber : pageNumber > 1 ? pageNumber - 1 :pageNumber}&success=true&action=delete`;
          }
          if (isSuccess) {console.log("redirect");  window.location.href = `/admin/categories?pn=${pageNumber}`;}
        })
      } else {
        createCategory(categoryName).then((response) => {
          setMessageModal(response.data.message);
          setIsSuccess(true);
          isSuccess = true;
        }).catch((error) => {
          setMessageModal(error.response.data.message);
          setIsSuccess(false);
          isSuccess = false;
        }).finally(() => {
          setIsLoading(false);
          if (isSuccess)  { console.log("redirects"); window.location.href = `/admin/categories?pn=${pageNumber}`;}
        })
      }
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMessageModal("");
    if(editingCategory && isSuccess) {
      window.href.location = `/admin/categories?pn=${pageNumber}`
    } else if(!editingCategory && isSuccess) {
      window.href.location = `/admin/categories?pn=${totalPage}`
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            onClick={() => handleEditCategory(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title={`Delete user`}
            description={`Are you sure to delete this user? `}
            onConfirm={() => handleDeleteCategory(record._id)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No">
            <Button danger>Delete</Button>
          </Popconfirm>

        </span>
      ),
    },
  ];

  return (
    <div>
      { 
          message !== "" &&
          <Alert
            message={message}
            type= {isSuccess ? "success" : "error"}
            onClose={() => {setMessage("")}}
            closable />
      }
      <Button
        type="primary"
        onClick={handleAddCategory}
        style={{ marginBottom: 16 }}
      >
        Add Category
      </Button>
      <Table columns={columns} 
      dataSource={categories} 
      rowKey="_id"  
      loading={isLoading && <Spin tip="Loading"></Spin>} 
      pagination={{
        current: pageNumber,
        total: totalItems,
        pageSize: constants.CONST_CATEGORY_PER_PAGE,
        onChange: (pageNumber, pageSize) => {window.location.href=`/admin/categories?pn=${pageNumber}`}
      }}
      />
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        { 
          messageModal !== "" &&
          <Alert
            message={messageModal}
            type= {isSuccess ? "success" : "error"}
            onClose={() => {setMessageModal("")}}
            closable />
        }
        <Form form={form} layout="vertical">
        <Form.Item
            name="_id"
            label="Category Id"
            hidden={true}
          >
            <Input hidden={true}/>
          </Form.Item>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter a category name!" },
            ]}
          >
            <Input />
          </Form.Item>
      </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
