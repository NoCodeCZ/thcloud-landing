"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        let message = `Login failed (${response.status})`;
        if (text) {
          try {
            const data = JSON.parse(text) as { error?: string };
            if (data.error) message = data.error;
          } catch {
            // non-JSON body (HTML error page from proxy/server crash) — keep status-based message
          }
        }
        throw new Error(message);
      }

      router.replace(`/${locale}/crm`);
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-[32px] border border-white/10 bg-white px-6 py-7 text-brand-title shadow-[0_28px_80px_rgba(0,0,0,0.18)]"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/70">
          Admin Access
        </p>
        <h1 className="text-3xl font-medium text-brand-title">Sign in to the lead CRM</h1>
        <p className="text-sm leading-relaxed text-brand-subtitle">
          This gate protects the admin board and lead management APIs.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Username
          </label>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-navy/30 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-navy/30 focus:bg-white"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-brand-navy px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-navy/92 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
