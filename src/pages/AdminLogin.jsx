import React, {useState} from "react";
import { Form, Input, Button, Typography, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Layout/Logo";
import user from "../user";
const { Title, Text } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const onFinish = (values) => {
    const { userName, password } = values;
    const isExist = user.find(u => u.password == password && u.userName == userName);
    if(isExist) {
      navigate("/admin/dashboard");
    } else {
      setMessage("Login fail. Wrong username or password");
    }
    //
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminLogin;
