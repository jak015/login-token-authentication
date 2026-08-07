import type { Route } from "./+types/register";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login Auth App" },
        { name: "description", content: "Registration page for the Login Auth App" },
    ];
}

export default function Register() {
    return (<main>Hello, Register!</main>);
}