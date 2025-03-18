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
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
            return response;
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw error;
        }
    },
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            return response;
        } catch (error) {
            console.error('Register error:', error.response?.data || error.message);
            throw error;
        }
    }
};

export const bikes = {
    getAll: () => api.get('/bikes'),
    search: (query) => api.get(`/bikes/search?q=${query}`),
    create: (bikeData) => api.post('/bikes', bikeData),
    update: (id, bikeData) => api.put(`/bikes/${id}`, bikeData),
    delete: (id) => api.delete(`/bikes/${id}`),
};

export const accessories = {
    getAll: () => api.get('/accessories'),
    search: (query) => api.get(`/accessories/search?q=${query}`),
    create: (accessoryData) => api.post('/accessories', accessoryData),
    update: (id, accessoryData) => api.put(`/accessories/${id}`, accessoryData),
    delete: (id) => api.delete(`/accessories/${id}`),
};

export default api; 