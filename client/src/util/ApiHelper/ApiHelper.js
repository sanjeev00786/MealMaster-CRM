import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig.js';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiHelper = {
    get: async (endpoint) => {
        try {
            const response = await axiosInstance.get(endpoint);
            console.log('*********GET API', response)
            return response.data;
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await axiosInstance.post(endpoint, JSON.stringify(data));
            return response.data;
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await axiosInstance.put(endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await axiosInstance.delete(endpoint);
            console.log(response)
            return response.data;
        } catch (error) {
            throw new Error(`API Error: ${error.message}`);
        }
    },
};

export default apiHelper;