import axiosClient from "../apis/axiosInstance";
const productStockEndpoint = "/product-stock";
const detailEndPoint = "/detail";

function getProductStock(pageNumber,limit,shopId,searchKey)
{
    return axiosClient.get(`${productStockEndpoint}`,{
        params:{
            sid:shopId,
            pn:pageNumber,
            limit:limit,
            sk:searchKey
        }
    })
}

function getStockDetail(productId, variationId, shopId)
{
    return axiosClient.get(`${productStockEndpoint}${detailEndPoint}`,{
        params:{
            vid:variationId,
            pid:productId,
            sid:shopId
          }
    });
}

function updateStock(productId, variationId, shopId, quantity)
{
    return axiosClient.put(`${productStockEndpoint}`,{
        shopId:shopId,
        productId:productId,
        variationId: variationId,
        quantity: quantity,
    });
}

export {
    getProductStock,
    getStockDetail,
    updateStock
}