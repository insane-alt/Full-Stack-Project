import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Update this to match your backend URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;