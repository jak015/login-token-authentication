import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/login.tsx"),
    route("/register", "routes/register.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
