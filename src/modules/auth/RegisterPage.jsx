import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function RegisterPage({ onRegister }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role
        })
      });

      const payload = await res.json();
      if (!res.ok || !payload.success) {
        throw new Error(payload.message || 'Registration failed.');
      }

      onRegister(payload.data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="brand-block">
          <span className="eyebrow">Create account</span>
          <h1>Join MultiServicePlatform</h1>
          <p>Open a customer, provider, or admin workspace with your own account.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Register</h2>

          <label>
            Full name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Account type
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="customer">Customer</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Create password"
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Confirm password"
            />
          </label>

          {error && <div className="error-banner">{error}</div>}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Create account'}
          </button>

          <p className="auth-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
