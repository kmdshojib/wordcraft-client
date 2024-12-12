import axios from "axios";
// let baseUrl = "http://localhost:5000/"
let baseUrl = "https://wordcraft-server-ashy.vercel.app/"
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});