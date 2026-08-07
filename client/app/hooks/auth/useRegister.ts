import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "~/services/authService";

type registerCredentials = {
    username: string;
    password: string;
}

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["register"],
        mutationFn: (credentials: registerCredentials) => register(credentials.username, credentials.password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    });
}