import axiosClient from "../apis/axiosInstance";
const categoryEndpoint = "/categories"
const getAllCategoryEndpoint = "/all"

function getAllCategory()
{
    return axiosClient.get(`${categoryEndpoint}${getAllCategoryEndpoint}`)
}

function getCategoryList(pageNumber, pageSize)
{
    return axiosClient.get(`${categoryEndpoint}`,{
        params:{
            pn:pageNumber,
            limit:pageSize
        }
    })
}

function createCategory(categoryName)
{
    return axiosClient.post(`${categoryEndpoint}`, {
        name: categoryName
    })
}

function updateCategory(categoryId, categoryName)
{
    return axiosClient.put(`${categoryEndpoint}`, {
        _id:categoryId,
        name: categoryName
    })
}

function deleteCategory(categoryId)
{
    return axiosClient.delete(`${categoryEndpoint}/${categoryId}`);
}


export {
    getAllCategory,
    getCategoryList,
    updateCategory,
    createCategory,
    deleteCategory
}