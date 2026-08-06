import { Form, useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { useLogin } from "~/hooks/auth/useLogin";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login Auth App" },
    { name: "description", content: "Welcome to the Login Auth App!" },
  ];
}

export default function Login() {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username !== "string" || typeof password !== "string") {
      return;
    }

    loginMutation.mutate(
      { username, password },
      { onSuccess: () => navigate("/welcome") }
    );
  }

  return (
    <main className="flex mx-auto flex-row items-center gap-10 justify-center min-h-screen bg-gray-900 text-white">
      <section>
        <h1 className="font-bold text-2xl text-center mb-4">Login</h1>
        <Form onSubmit={handleSubmit} method="post" className="flex flex-col gap-2">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" className="bg-white rounded-sm text-black pl-1" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" className="bg-white rounded-sm text-black pl-1" required />

          <button type="submit">Login</button>
        </Form>

        <p>Don't have an account? Register here</p>
      </section >

      <div className="bg-white w-0.5 h-40" />

      <section>
        <h2><strong>Important Info</strong></h2>
        <p>Do to..</p>
      </section>
    </main >
  );
}
