"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.token);

      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Tidak bisa terhubung ke server");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-3xl border p-8"
      >
        <h1 className="mb-6 text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-xl border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl border p-3"
        />

        {error && (
          <p className="mb-4 text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-teal-600 p-3 font-semibold text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}