import axios from 'axios';
import { Product } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Products API
export const productApi = {
    // Get all products with filters
    getAll: async (params?: {
        category?: string;
        brand?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
        featured?: boolean;
        sort?: string;
        page?: number;
        limit?: number;
    }) => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    // Get featured products
    getFeatured: async (limit = 8) => {
        const response = await api.get('/products/featured', { params: { limit } });
        return response.data;
    },

    // Get single product
    getById: async (id: string) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Get categories
    getCategories: async () => {
        const response = await api.get('/products/categories');
        return response.data;
    },

    // Get brands
    getBrands: async () => {
        const response = await api.get('/products/brands');
        return response.data;
    },
};

// Auth API
export const authApi = {
    login: async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: any) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    }
};

// User API (Cart & Wishlist)
export const userApi = {
    // Get user profile
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },

    // Cart
    getCart: async () => {
        const response = await api.get('/users/cart');
        return response.data;
    },
    addToCart: async (productId: string, quantity: number = 1) => {
        const response = await api.post('/users/cart', { productId, quantity });
        return response.data;
    },
    removeFromCart: async (productId: string) => {
        const response = await api.delete(`/users/cart/${productId}`);
        return response.data;
    },

    // Wishlist
    getWishlist: async () => {
        const response = await api.get('/users/wishlist');
        return response.data;
    },
    toggleWishlist: async (productId: string) => {
        const response = await api.post('/users/wishlist', { productId });
        return response.data;
    },

    // Orders
    getOrders: async () => {
        const response = await api.get('/orders/myorders');
        return response.data;
    }
};

// Add interceptor to include token in requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
