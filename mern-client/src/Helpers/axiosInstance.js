import axios from 'axios';

// const BASE_URL = "http://localhost:5014/api/v1";
// http://localhost:5015/api/v1/user/register
const BASE_URL = "http://localhost:8000/";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;

export default axiosInstance;