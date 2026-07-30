import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login Auth App" },
    { name: "description", content: "Welcome to the Login Auth App!" },
  ];
}

export default function Home() {
  return <h1>Hello World!</h1>
}
