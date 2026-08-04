import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${baseURL}/api/auth/login`, { username, password });
    return response.data;
}