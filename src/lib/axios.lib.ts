import config from "@/config";
import axios from "axios";

const selfOrderService = axios.create({
    baseURL: config.selfOrderService
})

const axiosInstance = {
    selfOrderService
}

export default axiosInstance