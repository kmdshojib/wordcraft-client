import { axiosInstance } from "./axios"

export const userLogin = async (credetials: any) => {
    const res = await axiosInstance.post("api/users/login", credetials)
    return res.data
}

export const userRegistration = async (user: any) => {
    const res = await axiosInstance.post("api/users/register", user)
    return res.data
}