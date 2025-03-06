import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
    baseURL: API_URL
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const auth = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (userData) => api.post('/auth/register', userData),
};

export const bikes = {
    getAll: () => api.get('/bikes'),
    search: (query) => api.get(`/bikes/search?q=${query}`),
    create: (bikeData) => api.post('/bikes', bikeData),
    update: (id, bikeData) => api.put(`/bikes/${id}`, bikeData),
    delete: (id) => api.delete(`/bikes/${id}`),
};

export default api; 