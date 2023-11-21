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
        // const token = response.data.token;
        // storeToken(token);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// const storeToken = (token) => {
//     localStorage.setItem('authToken', token);
//     console.log('Storing token:', token);
// };