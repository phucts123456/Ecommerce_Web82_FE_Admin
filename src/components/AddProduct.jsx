import React, { useEffect, useState } from "react";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  Switch,
  Skeleton,
  Alert,
  Spin
} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllCategory } from "../apis/category";
import { getProductDetail, registProduct, updateProduct } from "../apis/product";
const { TextArea } = Input; // Ensure correct declaration

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddProductForm = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng
  const [form] = Form.useForm();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("pid");
  const isUpdate = pid !== null;
  const onFinish = (values) => {
    const {productName, price, category, image, quantity, description, isAvailable} = values;
    let formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("categoryId", category);
    formData.append("name", productName);
    formData.append("isAvailable", isAvailable === undefined ? false : isAvailable);
    formData.append("price", price);
    setIsLoading(true);
    console.log(product?.image)
    console.log(image[0]?.url)
    const isUpdateImg = (product?.image !== undefined &&  image[0]?.url === product.image) === false;
    if((isUpdate && isUpdateImg) || !isUpdate) {    
      formData.append("file", image[0].originFileObj);
    } else {
      formData.append("image", product.image);
    }
    console.log(isUpdate)
    if(isUpdate) {
      updateProduct(formData, isUpdateImg, product._id).then((response) => {
        setIsSuccess(true);
        setMessage(response.data.message);
      }).catch((error) => {
        setMessage(error.data.message);
        setIsSuccess(false);
      }).finally(() => {   
        setIsLoading(false);
      });
    } else {
      registProduct(formData).then((response) => {
        console.log(response.data.message);
        setMessage(response.data.message);
        setIsSuccess(true);
      }).catch((error) => {
        console.log(error)
        console.log(error.response.data.message)
        setMessage(error.response.data.message);
        setIsSuccess(false);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };
  useEffect(() => {
    getAllCategory().then((response) => {
      if (response.status === 200) {
        setCategoryList(response.data.data);
      }
    }).catch((error) =>{
      console.log(error.response.data.message);
    })
    if (isUpdate) {     
      setIsLoading(true);
      getProductDetail(pid).then((response) => {
        const productDetail = response.data.data;
        form.setFieldValue("productName", productDetail.name);
        form.setFieldValue("category", productDetail.categoryId?._id);
        form.setFieldValue("quantity", productDetail.quantity);
        form.setFieldValue("description", productDetail.description);
        form.setFieldValue("isAvailable", productDetail.isAvailable);
        form.setFieldValue("price", productDetail.price);
        const productImage = [{
            url: productDetail.image,
        }]
        form.setFieldValue("image", productImage);
        setProduct(response.data.data);
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setTimeout(()=>{setIsLoading(false)}, 1200)
      });
    }
  }, [])
  const handleGoBack = () => {
    navigate("/admin/products"); // Path to the ProductManagement page
  };

  return (
    <>{ 
     
      message !== "" &&
      <Alert
      message={message}
      type= {isSuccess ? "success" : "error"}
      onClose={() => {setMessage("")}}
      closable />
    }
    {
      isLoading ? 
      <>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          disabled={componentDisabled}
          style={{
            maxWidth: 800,
          }}
          form={form}
          onFinish={onFinish}      
        >
        <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter the product name" }]}
          >
            <Skeleton.Input active={true} size={'default'} />
          </Form.Item>

          <Form.Item
            label="Product Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the product price" },
            ]}
          >
           <Skeleton.Input active={true} size={'default'} />
          </Form.Item>

          <Form.Item
            label="Product Category"
            name="category"
            rules={[{ required: true, message: "Please choose at one category" }]}>
            <Skeleton.Input active={true} size={'default'} />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input product quantity" }]}
          >
            <Skeleton.Input active={true} size={'default'} />
          </Form.Item>

          <Form.Item label="Product Description" name="description">
            <Skeleton.Input active={true} size={'default'} />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload an image" }]}
          >
             <Skeleton.Image active={true} />
          </Form.Item>

          <Form.Item
            label="Available"
            name="status"
            valuePropName="checked"
          >
            <Skeleton.Input active={true} size={'default'} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Skeleton.Button active={true} size={'default'} style={{ marginBottom: 16, width: "100px" }}> Add Product</Skeleton.Button>
          </Form.Item>
        </Form>
      </>
      : 
      <>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          disabled={componentDisabled}
          style={{
            maxWidth: 800,
          }}
          form={form}
          onFinish={onFinish}      
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please enter the product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Product Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the product price" },
            ]}
          >
            <InputNumber
              placeholder="Enter price"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Product Category"
            name="category"
            rules={[{ required: true, message: "Please choose at one category" }]}>
            <Select placeholder="">
              {
                categoryList.map((category) =>{
                  return <Select.Option value={category._id}>{category.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input product quantity" }]}
          >
            <InputNumber
              placeholder="Product quantity"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Product Description" name="description">
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload an image"}]}
          >
            <Upload maxCount={1} multiple={false} fileList={fileList} listType="picture-card" onChange={(e) => { setFileList(e.fileList[0])}}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Available"
            name="isAvailable"
          >
            <Switch />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" htmlType="submit">
              {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : pid !== null ? 'Update Product' : 'Add Product' }
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          style={{ marginBottom: 16, width: "100px" }}
        >
          Go Back
        </Button>
      </>
    }

    </>
  );
};

export default AddProductForm;
