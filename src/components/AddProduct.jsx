import React, { useEffect, useState } from "react";
import { PlusOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
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
  Spin,
  Table
} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllCategory } from "../apis/category";
import { getProductDetail, getProductVariation, registProduct, updateProduct } from "../apis/product";
const { TextArea } = Input; // Ensure correct declaration
import { v4 as uuidv4 } from 'uuid';
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
  const [variationFileList, setVariationFileList] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng
  const [form] = Form.useForm();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [variations , setVariations] = useState([]);
  const pid = searchParams.get("pid");
  const isUpdate = pid !== null;
  const templateFileName = "file_vid_";
  const onFinish = (values) => {
    const {productName, price, category, image, quantity, description, isAvailable} = values;
    let formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("categoryId", category);
    formData.append("name", productName);
    formData.append("isAvailable", isAvailable === undefined ? false : isAvailable);
    formData.append("price", price);
    formData.append("variations", JSON.stringify(variations));
    console.log("JSON.stringify(variations)")
    console.log(JSON.stringify(variations))
    const originFileObjVariation = [];
    //variationFileList.map((file) =>{
    //   console.log("file.originFileObj");
    //   console.log(file.originFileObj);
    //   file.originFileObj.filename = file.name;
    //   originFileObjVariation.push(file.originFileObj);
    // })
    //formData.append("variationFiles", originFileObjVariation);
    setIsLoading(true);
    const isUpdateImg = (product?.image !== undefined &&  image[0]?.url === product.image) === false;
    if((isUpdate && isUpdateImg) || !isUpdate) {    
      formData.append("file", image[0].originFileObj);
    } else {
      formData.append("image", product.image);
    }
    console.log(product)
    if(isUpdate) {
      updateProduct(formData, isUpdateImg, product._id, variationFileList).then((response) => {
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
        setMessage(response.data.message);
        setIsSuccess(true);
      }).catch((error) => {
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
      (async () => {
        const productResponse = await getProductDetail(pid);
        const productDetail = productResponse.data.data;
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
        const variationResponse = await getProductVariation(pid);
        setProduct(productDetail);
        setVariations(variationResponse.data.data);
      })();
    }
  }, [])

  const handleGoBack = () => {
    navigate("/admin/products"); // Path to the ProductManagement page
  };

  const addVariation = () => {
    const emptyVariation = {
        key: variations.length + 1,
        _id:`file_vid_${variations.length + 1}`,
        name: '',
        price: 1000,
        color: '',
        image: null
    }
    setVariations([...variations, emptyVariation])
  }

  const deleteVariation = (id) => {
    console.log(id)
    let fileToRemove = variationFileList.filter(file => !file.name.includes(id));
    console.log(variationFileList)
    console.log(fileToRemove)
    setVariationFileList(fileToRemove);
    setVariations(variations.filter(variation => variation._id !== id));
  }

  const addFileToVaritionFileList = (file, key) => {
    const fileExtension = file.name.substring(file.name.lastIndexOf("."), file.name.length);
    const fileNameWithoutExtension =  `${key}`
    const fileName = `${fileNameWithoutExtension}${fileExtension}`
    file.name = fileName
    if (variationFileList.length === 0 ) {
      console.log("add new")
      console.log(file);
      let arrayTemp = [file];
      console.log(arrayTemp);
      setVariationFileList(arrayTemp)
    }
    else {
      console.log("before");
      console.log(variationFileList)
      let fileArray = variationFileList.filter(file => file.name !== fileName);
      console.log("after filter");
      console.log(fileArray)
      console.log("update")
      console.log(file);
      let arrayTemp = [...fileArray, file];
      console.log(arrayTemp);
      setVariationFileList(arrayTemp);
    }
    console.log(variationFileList);
  }
  const setVariationName = (value, id) => {
    let variationToUpdate = variations.find(varriation => varriation._id === id);
    //let variationList = variations.filter(varriation => varriation._id !== id);
    variationToUpdate.name = value;
    //setVariations([...variationList, variationToUpdate]);
    console.log(variations);
  }

  const dataSource = [
    {
      key: '1',
      name: 'Option 1',
      price: 32,
      color: 'Red',
      image: 'https://cdn.24h.com.vn/upload/1-2021/images/2021-02-26/image50-1614333620-651-width500height800.jpg'
    },
    {
      key: '1',
      name: 'Option 1',
      price: 32,
      color: 'Red',
      image: 'https://donghodoapsuat.net/wp-content/uploads/2022/09/de-thuong-hinh-nen-mau-vang.jpg'
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render:  (t, r) => <Input style={{width: '150px'}} onChange={(e) => setVariationName(e.target.value, r._id)} defaultValue={r.name} />
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render:  (t, r) =>         
      <Input style={{width: '100px'}} defaultValue={r.price} />
    },
    {
      title: 'Color',
      dataIndex: 'color',
      render:  (t, r) => <Input style={{width: '100px'}} defaultValue={r.color} />
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render:  (t, r, index) =>           
    <Form.Item
      name={`${'file_vid_'}${r._id}`}
      valuePropName="fileList"
      style={{width: '200px'}}
      getValueFromEvent={normFile}
    >
      <Upload
      maxCount={1} 
      multiple={false} 
      action='#'
      beforeUpload={() => false}
      defaultFileList={[{url:r.image}]} 
      listType="picture" onChange={(e) => {addFileToVaritionFileList(e.fileList[0], r._id)}}>
        <Button   type="primary" icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>
    </Form.Item>
    },
    {
      title: 'Action',
      render:  (t, r) => <Button onClick={() => deleteVariation(r._id)}>Delete</Button>
    },
  ];

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
          {
           
           variations.length > 0 && 
           <>          
             <Button onClick={addVariation}>Add variation</Button>
             <Table dataSource={variations} columns={columns} pagination={false} /> 
           </>    
         }
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
