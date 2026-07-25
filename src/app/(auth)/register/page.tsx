"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Utensils } from "lucide-react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    defaultAddress: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          // Map Zod errors if needed
          const formErrs: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            formErrs[err.path[0]] = err.message;
          });
          setErrors(formErrs);
        } else {
          setErrors({ form: data.message || "An error occurred" });
        }
      } else {
        // Automatically sign in after successful registration
        await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setErrors({ form: "Network error, please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Utensils size={28} color="var(--color-primary)" />
        <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>CraveBite</span>
      </div>
      
      <h1 className="auth-form-title" style={{ fontSize: '1.75rem' }}>Create an account</h1>
      <p className="auth-form-subtitle" style={{ marginBottom: '1.5rem' }}>Start your food journey with us today.</p>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem', background: 'var(--color-card-bg)' }}>
        {errors.form && <span className="error-text" style={{ marginBottom: '1rem', display: 'block' }}>{errors.form}</span>}
        
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            className="input-glass"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="input-glass"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input-glass"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={loading}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number (Optional)</label>
          <input
            id="phone"
            type="tel"
            className="input-glass"
            placeholder="+1 234 567 8900"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={loading}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="form-label" htmlFor="address">Default Address (Optional)</label>
          <input
            id="address"
            type="text"
            className="input-glass"
            placeholder="123 Foodie Lane"
            value={formData.defaultAddress}
            onChange={(e) => setFormData({ ...formData, defaultAddress: e.target.value })}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <div className="form-footer-link">
          Already have an account? <Link href="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
