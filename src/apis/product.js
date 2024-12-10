import axiosClient from "./axiosInstance";
const productEndpoint = "/products"
const variationEndpoint = "/get-variation"

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
    },{
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

function getProductVariation(productId)
{
    return axiosClient.get(`/products${variationEndpoint}/${productId}`);
}

function updateProduct(formData, isUpdateImg, productId, variationFiles) {

    const request = {  
        name: formData.get("name"),
        isAvailable: formData.get("isAvailable"),
        quantity: formData.get("quantity"),
        description: formData.get("description"),
        categoryId: formData.get("categoryId"),
        price: formData.get("price"),
        variations: formData.get("variations"),
    }
    let files = []
    variationFiles.forEach((file, index) => { 
        files.push({
            fileName : file.name,
            image: file.originFileObj
        });
    });
    console.log(formData.get("file"))
    console.log(variationFiles)
    // Manually handle the variationFiles 
    if(isUpdateImg) {
        request.file = formData.get("file");
        request.variationFiles = files;
        console.log("file")
    } else {
        request.image = formData.get("image");
    }
    console.log("form variationFiles")

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
    updateProduct,
    getProductVariation
 }