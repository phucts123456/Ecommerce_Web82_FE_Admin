import axiosClient from "./axiosInstance";
const userEndpoint = "/user"
const activeEndpoint = "/active";
const loginEndpoint = "/login-admin";
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

function login(formData) {
    return axiosClient.post(`${userEndpoint}${loginEndpoint}`, 
    {
        userName: formData.userName,
        password: formData.password,
     })
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
    activeUser,
    login
}