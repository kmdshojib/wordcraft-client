import { axiosInstance } from "./axios"

export const getLessons = async () => {
    const lessons = await axiosInstance.get("api/lessons/getCategories")
    const { data }: any = lessons.data
    return data
}
export const getVocab = async (id: string) => {
    const vocabulary = await axiosInstance.get(`api/lessons/getVocab/${id}`)
    const { data }: any = vocabulary.data
    return data
}
export const createLessonCategory = async (data: any) => {
    const category = await axiosInstance.post(`api/lessons/createCategory`, data)
    return category.data
}

export const deleteLessonCategory = async (id: any) => {
    const category = await axiosInstance.delete(`api/lessons/deleteCategory/${id}`)
    return category.data
}
export const updateLessonCategory = async (id: any, data: any) => {
    const category = await axiosInstance.put(`api/lessons/updateCategory/${id}`, data)
    return category.data
}

export const createVocabulary = async (data:any) =>{
    const vocabulary = await axiosInstance.post(`api/lessons/createVocab`, data)
    return vocabulary.data
}
export const updateVocabulary = async (id:any,data:any) =>{
    const vocabulary = await axiosInstance.put(`api/lessons/updateVocab/${id}`,data);
    return vocabulary.data
}
export const deleteVocabulary = async (id:string) => {
    const vocabulary = await axiosInstance.delete(`api/lessons/deleteVocab/${id}`)
    return vocabulary.data
}