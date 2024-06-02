import axios from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const axiosInstance = axios.create({
  headers: {
    authorization: `Bearer ${cookie.get("auth")}`,
  },
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BASE_URL
      : process.env.REACT_APP_BASE_URL,
});

export default axiosInstance;
