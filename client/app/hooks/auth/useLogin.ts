import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../../services/authService"

type loginCredentials = {
    username: string;
    password: string;
}

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["login"],
        mutationFn: (credentials: loginCredentials) => login(credentials.username, credentials.password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    });
}