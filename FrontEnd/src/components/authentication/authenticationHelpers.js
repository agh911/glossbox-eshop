import axios from "axios";

export const checkSignIn = async ({ email, password }) => {
    const signInReturn = await axios.post(`http://localhost:3000/auth/signIn`, { email, password });

    const signInStatus = signInReturn.status === 200;

    return signInStatus;
}