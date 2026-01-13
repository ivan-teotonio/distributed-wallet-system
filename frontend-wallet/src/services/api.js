import axios from 'axios'; 

const api = axios.create({
    baseURL: 'http://localhost:3000' //url do gateway
}); 

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers['x-access-token'] = token;
    } 
    return config;
}); 

export default api;