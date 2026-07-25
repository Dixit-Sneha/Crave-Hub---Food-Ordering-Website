"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Utensils } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Utensils size={32} color="var(--color-primary)" />
        <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>CraveBite</span>
      </div>
      
      <h1 className="auth-form-title">Welcome back</h1>
      <p className="auth-form-subtitle">Enter your details to access your account.</p>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem', background: 'var(--color-card-bg)' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input-glass"
            placeholder="test@cravebite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input-glass"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <span className="error-text" style={{ marginBottom: '1rem' }}>{error}</span>}

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="form-footer-link">
          Don't have an account? <Link href="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
