import axios from 'axios';

const api = axios.create({
    baseURL: 'https://chandru-digital-services.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Admin instance for admin routes if needed (or just use same api with different token logic)
// For simplicity, we manage tokens via localStorage keys and Context

export default api;
