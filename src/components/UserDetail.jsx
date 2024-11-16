import React, {useEffect, useState} from "react";
import { Card, Typography, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetail } from "../apis/user";

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getUserDetail(userId).then((response) => {
      console.log(response)
      if (response.status === 200) {
        setUserDetail(response.data.data);
      }
    }).catch((error) => {
      setMessage(error.response.data.message);
    })
  }, [])

  return (
    
    userDetail ?   
    <Card title="User Details" style={{ width: 300 }}>
    <Typography.Paragraph>
      <strong>User Name:</strong> {userDetail.userName || "N/A"}
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Full Name:</strong> {userDetail.fullName || "N/A"}
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Role:</strong> {userDetail.roleId?.name || "N/A"}
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Phone Number:</strong> {userDetail.phoneNumber || "N/A"}
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Address:</strong> {userDetail.address || "N/A"}
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Deleted:</strong> {userDetail.isDelete ? "Yes" : "No"}
    </Typography.Paragraph>
    
    {/* Nút Back */}
    <Button type="primary" onClick={() => navigate("/Admin/users")}>
      Back to User Management
    </Button>
    </Card> : ""
    
  );
};

export default UserDetail;
