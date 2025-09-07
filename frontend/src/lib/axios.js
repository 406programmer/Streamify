import axios from 'axios';

const BASE_URL = import.meta.env.MODE==='develpoment'?"http://localhost:5000/api" : "/api"  

export const axiosInstance = axios .create({
    baseURL : BASE_URL,
    withCredentials:true, // send cookie with every request
})