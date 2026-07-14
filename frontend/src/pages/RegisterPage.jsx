import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import GoogleButton from '../components/auth/GoogleButton';
import { useAuth } from '../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordChecks = (password) => ([
  { label: 'At least 8 characters', pass: password.length >= 8 },
  { label: 'One uppercase letter', pass: /[A-Z]/.test(password) },
  { label: 'One number', pass: /[0-9]/.test(password) },
]);

const RegisterPage = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const checks = passwordChecks(form.password);
  const isStrongEnough = checks.every((c) => c.pass);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!emailRegex.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.password) next.password = 'Password is required';
    else if (!isStrongEnough) next.password = 'Password does not meet the requirements below';
    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password';
    else if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match';
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
      await register(form.name.trim(), form.email.trim(), form.password);
      toast.success('Account created!');
      navigate('/app', { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Could not create your account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Account created!');
      navigate('/app', { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Google sign-up failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start explaining, summarizing, and quizzing in under a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-ink-900 font-medium hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <GoogleButton label="Sign up with Google" onClick={handleGoogle} loading={googleLoading} disabled={submitting} />

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-ink-100" />
        <span className="text-xs text-ink-300">or</span>
        <div className="h-px flex-1 bg-ink-100" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="text-xs font-medium text-ink-500 mb-1.5 block">Full name</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Jamie Rivera"
              className={`input-base pl-9 ${errors.name ? 'border-rose-accent focus:ring-rose-accent/10' : ''}`}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

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
          <label htmlFor="password" className="text-xs font-medium text-ink-500 mb-1.5 block">Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
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
          {form.password.length > 0 && (
            <div className="mt-2 space-y-1">
              {checks.map(({ label, pass }) => (
                <p key={label} className={`text-xs flex items-center gap-1.5 ${pass ? 'text-sage-accent' : 'text-ink-300'}`}>
                  <Check size={12} className={pass ? 'opacity-100' : 'opacity-30'} /> {label}
                </p>
              ))}
            </div>
          )}
          {errors.password && (
            <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
              <AlertCircle size={12} /> {errors.password}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="text-xs font-medium text-ink-500 mb-1.5 block">Confirm password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder="••••••••"
              className={`input-base pl-9 pr-10 ${errors.confirmPassword ? 'border-rose-accent focus:ring-rose-accent/10' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-500"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
              <AlertCircle size={12} /> {errors.confirmPassword}
            </p>
          )}
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center mt-1">
          {submitting ? 'Creating account…' : 'Create account'}
        </button>

        <p className="text-[11px] text-ink-300 text-center leading-relaxed pt-1">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="underline hover:text-ink-500">Terms</Link> and{' '}
          <Link to="/privacy" className="underline hover:text-ink-500">Privacy Policy</Link>.
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
