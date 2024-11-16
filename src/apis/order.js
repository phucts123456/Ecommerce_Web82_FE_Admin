import axiosClient from "./axiosInstance";
const orderEndpoint = "/orders"
const updateStatusEndpoint = "/updateStatus"
function getOrderDetail(orderId)
{
    return axiosClient.get(`${orderEndpoint}/${orderId}`);
}


function getOrderList(pageNumber, limit)
{
    return axiosClient.get(`${orderEndpoint}`, 
    {
        params:{
          limit:limit,
          pn:pageNumber,
        }
    })
}

function updateOrderStatus(orderId, status)
{
    return axiosClient.put(`${orderEndpoint}${updateStatusEndpoint}`, 
    { 
        orderId: orderId,
        status:status,
    })
}

export {
    getOrderDetail,
    getOrderList,
    updateOrderStatus
}