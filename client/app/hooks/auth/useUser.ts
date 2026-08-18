import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "~/services/authService"

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
    })
}