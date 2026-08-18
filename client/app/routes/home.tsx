import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login Auth App" },
    { name: "description", content: "Welcome to the Login Auth App!" },
  ];
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 min-h-screen bg-gray-900 text-white">
      <article className="flex flex-col items-center gap-6 rounded-2xl border border-white bg-gray-800 p-10 shadow-lg">
        <section className="text-center">
          <h1 className="font-bold text-3xl mb-2">Welcome to the Login Auth App</h1>
          <p className="text-gray-300">Get started by creating an account</p>
        </section>

        <nav className="flex gap-4">
          <Link to="/login" className="w-48 bg-white text-black rounded-sm px-4 py-2 text-center transition-colors hover:bg-gray-300 active:bg-gray-400">Login</Link>
          <Link to="/register" className="w-48 border border-white text-white rounded-sm px-4 py-2 text-center transition-colors hover:bg-white hover:text-black active:bg-gray-300 active:text-black">Register</Link>
        </nav>
      </article>

      <article className="max-w-md rounded-md border border-blue-500 bg-blue-950 p-4 text-sm">
        <p className="font-semibold text-blue-300 mb-1">Note</p>
        <p className="text-blue-100">
          <strong>Please note:</strong> The app may load slowly on first visit due to a free Render subscription cold start. Expected load time on first request is about 20 seconds. Thank you for your patience!
        </p>
      </article>
    </main>
  );
}
