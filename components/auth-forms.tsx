"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        startTransition(async () => {
          const result = await signIn("credentials", {
            email: form.get("email"),
            password: form.get("password"),
            callbackUrl: "/dashboard",
            redirect: false
          });
          if (result?.error) setError("Invalid email or password");
          if (result?.url) window.location.href = result.url;
        });
      }}
    >
      <Input name="email" type="email" placeholder="founder@startup.com" required />
      <Input name="password" type="password" placeholder="Password" required />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <Button type="submit" disabled={isPending}>{isPending ? "Signing in..." : "Login"}</Button>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="button" variant="secondary" onClick={() => signIn("github", { callbackUrl: "/dashboard" })}><Github className="h-4 w-4" />GitHub</Button>
        <Button type="button" variant="secondary" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}><Mail className="h-4 w-4" />Google</Button>
      </div>
      <p className="text-center text-sm text-slate-400">New here? <Link className="text-cyan" href="/register">Create an account</Link></p>
    </form>
  );
}

export function RegisterForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        startTransition(async () => {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.get("name"),
              email: form.get("email"),
              password: form.get("password"),
              role: form.get("role")
            })
          });
          if (!response.ok) {
            const data = await response.json();
            setError(data.error ?? "Unable to register");
            return;
          }
          await signIn("credentials", {
            email: form.get("email"),
            password: form.get("password"),
            callbackUrl: "/dashboard"
          });
        });
      }}
    >
      <Input name="name" placeholder="Founder name" required />
      <Input name="email" type="email" placeholder="founder@startup.com" required />
      <Input name="password" type="password" placeholder="Minimum 8 characters" required minLength={8} />
      <select name="role" className="h-11 rounded-md border border-border bg-slate-950/70 px-3 text-sm text-white">
        <option value="FOUNDER">Founder</option>
        <option value="COFOUNDER">Co-founder</option>
        <option value="INVESTOR">Investor</option>
        <option value="MENTOR">Mentor</option>
      </select>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <Button type="submit" disabled={isPending}>{isPending ? "Creating..." : "Create account"}</Button>
      <p className="text-center text-sm text-slate-400">Already registered? <Link className="text-cyan" href="/login">Login</Link></p>
    </form>
  );
}
