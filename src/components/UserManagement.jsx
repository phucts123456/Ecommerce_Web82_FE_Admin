import React, {useEffect, useState} from "react";
import { Table, Button, Space } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom"; // import useNavigate
import { activeUser, deleteUser, getUserDetail, getUserList } from "../apis/user";
import constants from '../../constants';
import { Spin } from 'antd';
import { Popconfirm } from 'antd';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const pageNumber = Number.parseInt(searchParams.get("pn") !== null ? searchParams.get("pn") : 1);
  useEffect(() => {
    setIsLoading(true);
    getUserList(pageNumber, constants.CONST_USER_PER_PAGE).then((response) => {
      if (response.status === 200) {
        console.log(response.data.data.totalItems);
        console.log(response.data.data.items);
        setUsers(response.data.data.items);
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
      title: "Customer Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
      render: (roleId) => roleId === null || roleId === undefined  ? "" : roleId.name
    },   
    {
      title: "Deleted",
      dataIndex: "isDelete",
      key: "isDelete",
      render: (isDelete) => isDelete ? "Yes" : "No"
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const action = record.isDelete ? "active" : "delete"
        return (     
        <Space size="middle">
          <Button type="primary" onClick={() => handleViewDetails(record)}>View Details</Button>
          <Popconfirm
            title={`${action} user`}
            description={`Are you sure to ${action} this user? `}
            onConfirm={() => {
              if(record.isDelete) return handleActiveUser(record);
              else return handleDeleteUser(record)
              }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No">
            {record.isDelete ? <Button style={{color:"green"}}>Active</Button> : <Button style={{color:"red"}}>Delete</Button>}
          </Popconfirm>
        </Space>
      )},
    },
  ];

  // Function to handle viewing user details
  const handleViewDetails = (record) => {
    navigate(`/admin/users/${record._id}`); // Sử dụng navigate để chuyển đến trang chi tiết người dùng
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
      <h2>User Management</h2>
      <Table columns={columns} dataSource={users} pagination={{
          current:pageNumber,
          total: totalItems,
          pageSize: constants.CONST_PRODUCT_PER_PAGE,
          onChange: (pageNumber, pageSize) => {window.location.href=`/admin/users?pn=${pageNumber}`}
        }}
        loading={isLoading && <Spin tip="Loading"></Spin>} 
        />
    </div>
  );
};

export default UserManagement;
