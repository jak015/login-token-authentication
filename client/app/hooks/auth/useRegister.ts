import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "~/services/authService";
import type { Credentials } from "~/types/auth.types";

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["register"],
        mutationFn: (credentials: Credentials) => register(credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    });
}