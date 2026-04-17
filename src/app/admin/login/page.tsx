"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputField =
  "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500";

const fieldLabel = "block text-sm mb-1 text-gray-600 dark:text-gray-300";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl p-8 shadow-xl border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800">
          <h1 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Admin</h1>
          <p className="text-sm mb-6 text-gray-500 dark:text-gray-400">Sign in to view analytics</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className={fieldLabel}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputField}
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className={fieldLabel}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputField}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
