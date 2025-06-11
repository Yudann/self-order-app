import config from "@/config";
import axios from "axios";

const selfOrderService = axios.create({
    baseURL: config.selfOrderService,
//     headers: {
//         'Content-Type': 'application/json',
//   },
})

const axiosInstance = {
    selfOrderService
}

export default axiosInstance