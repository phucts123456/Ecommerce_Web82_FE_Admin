import React, {useState} from "react";
import { Form, Input, Button, Typography, Card, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Layout/Logo";
import user from "../user";
import store from "../store";
import { login } from "../apis/user";
const { Title, Text } = Typography;
import { sessionService } from 'redux-react-session';
const AdminLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const onFinish = (values) => {
    login(values).then((response) => {
      if (response.status === 200) {
        console.log(response)
        // sessionService.saveSession({token:response.data.accessToken}).then(()=>{
        //   navigate("/admin/dashboard");
        // });
        localStorage.setItem("accessToken",response.data.accessToken)
        navigate("/admin/dashboard");
      }
    }).catch((error) => {
      setMessage(error.response.data.message);
    })
  };

  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "0 24px",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{ width: "100%", height: "100%" }}
      >
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card
            bordered={false}
            style={{ borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
          >
            
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Logo width={120} height={40} />
              <Title level={2} style={{ margin: 0 }}>
                Admin Login
              </Title>
              <Text type="secondary">
                Enter your username and password to continue
              </Text>
            </div>
            <Form name="login" onFinish={onFinish} layout="vertical">
              <Form.Item
                name="userName"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input placeholder="Username" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>

              {
               message !== "" && <p style={{color:"red"}}>{message}</p>
              }
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", height: 40 }}
                  size="large"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Link to={'/store/regist'} >Regist store</Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminLogin;
