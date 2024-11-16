import axiosClient from "./axiosInstance";
const userEndpoint = "/user"
const activeEndpoint = "/active"
function getUserList(pageNumber, limit)
{
    return axiosClient.get(`${userEndpoint}`, 
    {
        params:{
          limit:limit,
          pn:pageNumber,
        }
    })
}
function getUserDetail(userId)
{
    return axiosClient.get(`${userEndpoint}/${userId}`);
}

function deleteUser(userId) 
{
    return axiosClient.delete(`${userEndpoint}/${userId}`)
}

function activeUser(userId) 
{
    return axiosClient.put(`${userEndpoint}${activeEndpoint}/${userId}`)
}


export {
    getUserList,
    getUserDetail,
    deleteUser,
    activeUser
}