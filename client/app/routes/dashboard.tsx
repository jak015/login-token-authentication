import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login Auth App" },
        { name: "description", content: "Dashboard page for the Login Auth App" },
    ];
}

type DashboardUser = { id: string; username: string };

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [confirming, setConfirming] = useState(false);
    const resetTimer = useRef<number | null>(null);

    const user = (location.state as { user?: DashboardUser } | null)?.user;

    // Clear the pending confirmation timer if the component unmounts (e.g. navigation)
    useEffect(() => {
        return () => {
            if (resetTimer.current !== null) {
                window.clearTimeout(resetTimer.current);
            }
        };
    }, []);

    const handleLogout = () => {
        // Clear any cached user data (e.g. the ["user"] query invalidated on login)
        queryClient.removeQueries({ queryKey: ["user"] });
        // replace: true so the back button doesn't return to the dashboard
        navigate("/", { replace: true });
    };

    const handleLogoutClick = () => {
        if (confirming) {
            handleLogout();
            return;
        }
        setConfirming(true);
        // Auto-cancel the confirmation after 3 seconds if not clicked again
        resetTimer.current = window.setTimeout(() => setConfirming(false), 3000);
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
            <section className="flex flex-col">
                <h2 className="text-xl font-bold">
                    Hello, {user?.username ?? "there"}!
                </h2>
                <p>Your userID: {user?.id ?? "unknown"}</p>
                <button
                    type="button"
                    onClick={handleLogoutClick}
                    className={`self-center mt-6 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                        confirming
                            ? "bg-red-600 text-white hover:bg-red-500"
                            : "bg-white text-gray-900 hover:bg-red-600 hover:text-white"
                    }`}
                >
                    {confirming ? "Confirm logout?" : "Logout"}
                </button>
            </section>
        </main>
    );
}