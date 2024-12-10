import axiosClient from "./axiosInstance";
const storeEndpoint = "/shops"
import constants from "../../constants";

function registShop(formData) {
    return axiosClient.post(`${storeEndpoint}`, 
    {
        name: formData.shopName,
        email: formData.email,
        role: constants.CONST_ROLE_SHOP,
        address: formData.shopAddress,
        phoneNumber: formData.phoneNumber,
        fullName: formData.fullName,
        wardId: formData.ward,
        districtId: formData.district,
        provinceId: formData.province,
        password: formData.password
    })
}

export {
    registShop
}