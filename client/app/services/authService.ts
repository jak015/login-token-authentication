import axios from "axios";
import type { Credentials } from "~/types/auth.types";
import type { User } from "~/types/user.types";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL, withCredentials: true })

export const login = async (credentials: Credentials): Promise<User> => {
    const response = await api.post(`${baseURL}/api/auth/login`, {
        username: credentials.username,
        password: credentials.password
    });
    return response.data;
}

export const register = async (credentials: Credentials): Promise<User> => {
    const response = await api.post(`${baseURL}/api/auth/register`, {
        username: credentials.username,
        password: credentials.password
    });
    return response.data;
}

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get(`${baseURL}/api/auth/me`);
    return response.data;
}

export const logout = async (): Promise<void> => {
    await api.post(`${baseURL}/api/auth/logout`);
}