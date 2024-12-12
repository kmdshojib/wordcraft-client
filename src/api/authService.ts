import { axiosInstance } from "./axios"

export const userLogin = async (credetials: any) => {
    const res = await axiosInstance.post("api/users/login", credetials)
    return res.data
}

export const userRegistration = async (user: any) => {
    const res = await axiosInstance.post("api/users/register", user)
    return res.data
}

export const getAllUsers = async (id: string) => {
    const users = await axiosInstance.get(`api/users/getUsers/${id}`)
    return users.data.data
}
// Function to update user role
export const updateUserRole = async (user:any) => {
    const res = await axiosInstance.put(`/api/users/updateRole`,user)
    return res.data
};