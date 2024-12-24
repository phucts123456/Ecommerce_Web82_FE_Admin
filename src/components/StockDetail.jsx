import React, {useEffect, useState,useContext} from "react";
import { 
    Card, 
    Typography, 
    Button,
    Form,
    Input,
    Spin,
    InputNumber } from "antd";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getUserDetail } from "../apis/user";
import { getStockDetail, updateStock } from "../apis/productStock";
import { LoadingOutlined } from '@ant-design/icons';
import UserContext from "../context/userContext";
const StockDetail = () => {
  const navigate = useNavigate();
  const [stockDetail, setStockDetail] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [shopId, setShopId] = useState(null);
  const pid = searchParams.get("pid");
  const vid = searchParams.get("vid");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (!userContext.user) navigate('/')
    setShopId(userContext.user.shopId._id);
    getStockDetail(pid,vid,userContext.user.shopId._id).then((response) => {
      console.log(response)
      if (response.status === 200) {
        console.log(response)
        const stockData = response.data.data;
        setStockDetail(stockData);
        form.setFieldValue("quantity", stockData.quantity);
      }
    }).catch((error) => {
        console.log(error)
        //setMessage(error.response.data.message);
    })
  }, [])
  const onFinish = (values) => {
    setIsLoading(true);
    const quantity = values.quantity;
    const updateResponse = updateStock(pid,vid,shopId,quantity).then((res) =>{
      if (res.status === 200) {
        setMessage(res.data.message);
        setIsSuccess(true);
      }
    }).catch((error)=>{
      console.log(error.response)
      setIsSuccess(false);
    }).finally(()=>{
      setIsLoading(false);
    })
  }
  return (
    stockDetail ?   
    <Form
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        maxWidth: 800,
      }}
      form={form}
      onFinish={onFinish}>
    <Card title="Stock Details" style={{ width: 500 }}>
      <Form.Item
        name="Variation Name">
        <Typography.Paragraph>
        Product Name:{stockDetail.productId.name || "N/A"}
        </Typography.Paragraph>
      </Form.Item>
        <Form.Item
            name="Variation Name"
            >
        <Typography.Paragraph>
        Variation Name: {stockDetail.variationId.name || "N/A"}
        </Typography.Paragraph>
        </Form.Item>
        <Form.Item
            label="Quantity"
            name="quantity"
            >
            <InputNumber active={true} size={'default'} />
        </Form.Item>
        <Button style={{marginRight:15}} type="primary" onClick={() => navigate("/Admin/stock")}>
           Back
        </Button>
        <Button type="primary" htmlType="submit">
            {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> :'Update' }
        </Button>
        <p style={{color:isSuccess?'green':'red'}}>{message}</p>
    </Card>
</Form>
 : ""
    
  );
};

export default StockDetail;
