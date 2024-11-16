import axiosClient from "./axiosInstance";
const productEndpoint = "/products"

function registProduct(formData) {
    return axiosClient.postForm(`${productEndpoint}`, 
    {
        name: formData.get("name"),
        isAvailable: formData.get("isAvailable"),
        quantity: formData.get("quantity"),
        description: formData.get("description"),
        file: formData.get("file"),
        categoryId: formData.get("categoryId"),
        price: formData.get("price")
     }
     ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}

function getProductList(pageNumber, searchKey, category, limit)
{
    return axiosClient.get('/products', 
    {
        params:{
          limit:limit,
          pn:pageNumber,
          sk:searchKey,
          category:category,
        }
    })
}

function getProductDetail(productId)
{
    return axiosClient.get(`/products/${productId}`);
}

function updateProduct(formData, isUpdateImg, productId) {
    const request = {  
        name: formData.get("name"),
        isAvailable: formData.get("isAvailable"),
        quantity: formData.get("quantity"),
        description: formData.get("description"),
        categoryId: formData.get("categoryId"),
        price: formData.get("price")
    }
    if(isUpdateImg) {
        request.file = formData.get("file");
    } else {
        request.image = formData.get("image");
    }
    return axiosClient.putForm(`${productEndpoint}/${productId}`, 
        request
     ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}

export {
    registProduct,
    getProductList,
    getProductDetail,
    updateProduct
 }