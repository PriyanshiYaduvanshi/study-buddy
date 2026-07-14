import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return setError('Email is required');
    if (!emailRegex.test(email)) return setError('Enter a valid email address');

    setError('');
    setSubmitting(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (err) {
      // Keep this generic on purpose so we don't reveal which emails have accounts.
      toast.error('Could not send the reset email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="text-ink-900 font-medium hover:underline">
          Back to log in
        </Link>
      }
    >
      {sent ? (
        <div className="text-center py-2">
          <div className="w-10 h-10 rounded-full bg-sage-light text-sage-accent flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={18} />
          </div>
          <p className="text-sm text-ink-700 font-medium">Check your inbox</p>
          <p className="text-sm text-ink-500 mt-1 leading-relaxed">
            If an account exists for <span className="font-medium">{email}</span>, a reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="text-xs font-medium text-ink-500 mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                placeholder="you@example.com"
                className={`input-base pl-9 ${error ? 'border-rose-accent focus:ring-rose-accent/10' : ''}`}
              />
            </div>
            {error && (
              <p className="mt-1.5 text-xs text-rose-accent flex items-center gap-1">
                <AlertCircle size={12} /> {error}
              </p>
            )}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center mt-1">
            {submitting ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
