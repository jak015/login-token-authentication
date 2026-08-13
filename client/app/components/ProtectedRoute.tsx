import { Navigate, Outlet } from "react-router";
import { useUser } from "~/hooks/auth/useUser";

export default function ProtectedRoute() {
    const { data: user, isLoading, isError } = useUser();

    if (isLoading) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Loading...</p>
            </main>
        );
    }

    if (isError || !user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
