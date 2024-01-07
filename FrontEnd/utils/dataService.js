import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getProductData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getUserData = async (userQuery) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/getUser`, userQuery);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const signInService = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signIn`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signUpService = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signUp`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};