import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/login.tsx"),
    route("/register", "routes/register.tsx"),
    layout("components/ProtectedRoute.tsx", [
        route("/dashboard", "routes/dashboard.tsx"),
    ]),
] satisfies RouteConfig;
