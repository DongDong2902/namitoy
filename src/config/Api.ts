import axios from "axios";

export const axiosClient = axios.create()

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response.data.errors),
)

export default axiosClient
