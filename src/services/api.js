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
    getAll: async () => {
        return await axios.get(`${API_URL}/bikes`);
    },
    getSellerBikes: async () => {
        const token = localStorage.getItem('token');
        return await axios.get(`${API_URL}/bikes/seller`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    create: async (bikeData) => {
        const token = localStorage.getItem('token');
        return axios.post(`${API_URL}/bikes`, bikeData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    delete: async (id) => {
        const token = localStorage.getItem('token');
        return await axios.delete(`${API_URL}/bikes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    search: async (query) => {
        return await axios.get(`${API_URL}/bikes/search?q=${query}`);
    }
};

export const accessories = {
    create: async (accessoryData) => {
        const token = localStorage.getItem('token');
        return axios.post(`${API_URL}/accessories`, accessoryData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getAll: async () => {
        return axios.get(`${API_URL}/accessories`);
    },
    delete: async (id) => {
        const token = localStorage.getItem('token');
        return axios.delete(`${API_URL}/accessories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    search: (query) => api.get(`/accessories/search?q=${query}`),
    update: (id, accessoryData) => api.put(`/accessories/${id}`, accessoryData),
    getRenterAccessories: async () => {
        const token = localStorage.getItem('token');
        return axios.get(`${API_URL}/accessories/seller`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
};

export default api; 