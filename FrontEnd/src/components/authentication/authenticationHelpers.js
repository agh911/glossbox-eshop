import axios from "axios";

export const checkSignIn = async ({ email, password }) => {
    try {
        const signInReturn = await axios.post(`https://glossbox-eshop.onrender.com/auth/signIn`, { email, password });
        console.log("SignIn Response:", signInReturn);

        const { user, token } = signInReturn.data;

        if (signInReturn.status === 200 && user && token) {
            localStorage.setItem("email", user.email);
            localStorage.setItem("token", token);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
    }
}

// http://localhost:3000/auth/signIn