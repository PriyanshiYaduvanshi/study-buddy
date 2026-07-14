import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import GoogleButton from '../components/auth/GoogleButton';
import { useAuth } from '../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/app';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!emailRegex.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      toast.success('Welcome back!');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Could not log in. Check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Welcome back!');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Log in"
      subtitle="Pick up your notes right where you left them."
      footer={
        <>
          Don't have an account?{' '}
          <Link to="/register" className="text-ink-900 font-medium hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <GoogleButton label="Continue with Google" onClick={handleGoogle} loading={googleLoading} disabled={submitting} />

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-ink-100" />
        <span className="text-xs text-ink-300">or</span>
        <div className="h-px flex-1 bg-ink-100" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="email" className="text-xs font-medium text-ink-500 mb-1.5 block">Email</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="you@example.com"
              className={`input-base pl-9 ${errors.email ? 'border-rose-accent focus:ring-rose-accent/10' : ''}`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-xs font-medium text-ink-500">Password</label>
            <Link to="/forgot-password" className="text-xs text-ink-500 hover:text-ink-900 hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="••••••••"
              className={`input-base pl-9 pr-10 ${errors.password ? 'border-rose-accent focus:ring-rose-accent/10' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
              <AlertCircle size={12} /> {errors.password}
            </p>
          )}
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center mt-1">
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
