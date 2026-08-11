import axios from "axios";
import type { Credentials } from "~/types/auth.types";
import type { User } from "~/types/user.types";

const baseURL = import.meta.env.VITE_API_URL;

export const login = async (credentials: Credentials): Promise<User> => {
    const response = await axios.post(`${baseURL}/api/auth/login`, {
        username: credentials.username,
        password: credentials.password
    });
    return response.data;
}

export const register = async (credentials: Credentials): Promise<User> => {
    const response = await axios.post(`${baseURL}/api/auth/register`, {
        username: credentials.username,
        password: credentials.password
    });
    return response.data;
}