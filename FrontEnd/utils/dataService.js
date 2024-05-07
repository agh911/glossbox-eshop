import axios from "axios";
import { socket } from "./socket.js";

const API_BASE_URL = "https://glossbox-eshop.onrender.com";
// const API_BASE_URL = "http://localhost:3000";

export const getProductData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getSingleProductData = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
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

export const getUserOrderData = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

// Basket
export const addToBasket = async (userId, productId, quantity) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/basket`, { userId, productId, quantity });
        return response.data;
    } catch (error) {
        return error
    }
}

export const updateBasketItemQuantity = async (userId, productId, newQuantity) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/basket/${userId}/${productId}`, {
            quantity: newQuantity
        });

        socket.emit('updateQuantity', { userId, productId, quantity: newQuantity });

        return response.data;
    } catch (error) {
        return error;
    }
}

export const removeBasketItem = async (userId, productId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/basket/${userId}/${productId}`);

        socket.emit('removeItem', { userId, productId });

        return response.data;
    } catch (error) {
        return error;
    }
}

// Checkout 
export const checkout = async (user, total, items) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-checkout-session`, {
            userId: user,
            total: total,
            items: items,
        });
        return response.data;

    } catch (error) {
        return error
    }
}