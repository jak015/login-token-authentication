import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login Auth App" },
        { name: "description", content: "dashboard page for the Login Auth App" },
    ];
}

export default function Dashboard() {
    return (
        <div>Dashboard</div>
    );
}