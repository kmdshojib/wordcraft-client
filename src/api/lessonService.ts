import { axiosInstance } from "./axios"

export const getLessons = async () => {
    const lessons = await axiosInstance.get("api/lessons/getCategories")
    const { data }: any = lessons.data
    return data
}
export const getVocab = async (id:string) => {
    const vocabulary = await axiosInstance.get(`api/lessons/getVocab/${id}`)
    const { data }: any = vocabulary.data
    return data
}