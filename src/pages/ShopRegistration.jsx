import React, {useEffect, useState} from "react";
import { Form, Input, Button, Typography, Card, Row, Col, Select } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Layout/Logo";
import constants from "../../constants";
import { getDistricts, getProvinces, getWards } from "../apis/shipping";
import { registShop } from "../apis/shop";
const { Title, Text } = Typography;

const ShopRegistration = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const onFinish = (values) => {
    const formData = {
      name: values.shopName,
      email: values.email,
      role: constants.CONST_ROLE_SHOP,
      address: values.shopAddress,
      phoneNumber: values.phoneNumber,
      wardId: values.ward,
      fullName: values.fullName,
      districtId: values.district,
      provinceId: values.province,
      password: values.password
    }
    registShop(formData).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    });
  };

  useEffect(() => {
    getProvinces().then((response) => {
      console.log(response.data);
      setProvinceList(response.data.data);
    }).catch((error) => {
      console.log(error.data)
    })
  }, [])

  const handleSelectProvince = (value) => {
    setSelectedProvince(value);
    getDistricts(value).then((response) => {
      setDistrictList(response.data.data);
    }).catch((error) => {
      console.log(error.data)
    })
  };

  const handleSelectDistrict = (value) => {
    setSelectedDistrict(value);
    getWards(value).then((response) => {
      console.log(response.data.data)
      setWardList(response.data.data);
    }).catch((error) => {
      console.log(error.data)
    })
  };

  const handleSelectWard = (value) => {
    setSelectedDistrict(value);
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
                Store Registration Form
              </Title>
              <Text type="secondary">
                Enter your username and password to continue
              </Text>
            </div>
            <Form name="storeRegist" onFinish={onFinish} layout="vertical">
            <Form.Item
                label="Shop name:"
                name="shopName"
                rules={[
                  { required: true, message: "Please enter your shop name!" },
                ]}
              >
                <Input placeholder="Shop name" size="large" />
            </Form.Item>
            <Form.Item
                label="Shop owner name:"
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your shop name!" },
                ]}
              >
                <Input placeholder="Shop name" size="large" />
            </Form.Item>
            <Form.Item
              label="Province"
              name="province"
              rules={[{ required: true, message: "Please select province" }]}>
              <Select placeholder=""
                  value={selectedProvince}
                  onChange={handleSelectProvince} 
                  options={provinceList.map((item) => ({
                    label: item.ProvinceName,
                    value: item.ProvinceID,
                }))}>
              </Select>
            </Form.Item>
            <Form.Item
              label="District"
              name="district"
              rules={[{ required: true, message: "Please select province first" }]}>
              <Select placeholder=""
                  value={selectedDistrict}
                  onChange={handleSelectDistrict} 
                  options={districtList.map((item) => ({
                    label: item.DistrictName,
                    value: item.DistrictID,
                }))}>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ward"
              name="ward"
              rules={[{ required: true, message: "Please select district first" }]}>
              <Select placeholder=""
                  value={selectedWard}
                  onChange={setSelectedWard} 
                  options={wardList.map((item) => ({
                    label: item.WardName,
                    value: item.WardCode,
                }))}></Select>
            </Form.Item>
            <Form.Item
              label="Shop address"
              name="address"
              rules={[
                { required: true, message: "Please enter your shop address!" },
              ]}>
              <Input placeholder="Shop address" size="large" />
            </Form.Item>
            <Form.Item         
              label="Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your shop phone number!" },
              ]}>
              <Input placeholder="Phone number" size="large" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your shop email!" },
              ]}>
              <Input placeholder="Email" size="large" />
            </Form.Item>       
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}>
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>       
            <Form.Item
              label="Re-enter Password"
              name="rePassword"
              rules={[
                { required: true, message: "Password and re-password must match.!" },
              ]}
            >
              <Input.Password placeholder="Re-enter your password" size="large" />
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
                Regiters
              </Button>
            </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ShopRegistration;
