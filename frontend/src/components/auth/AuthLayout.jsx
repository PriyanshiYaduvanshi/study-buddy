import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

/**
 * Shared chrome for Login / Register / Forgot Password.
 * Keeps a single consistent frame so each page only has to define its form.
 */
const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <div className="px-6 py-6">
        <Link to="/" className="inline-flex items-center gap-2.5 w-fit">
          <div className="w-8 h-8 rounded-lg bg-ink-900 flex items-center justify-center">
            <GraduationCap size={16} className="text-cream-50" />
          </div>
          <span className="font-display text-lg font-semibold text-ink-900">Study Buddy</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-[380px] animate-slide-up">
          <div className="mb-7 text-center">
            <h1 className="font-display text-2xl font-semibold text-ink-900">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-ink-500">{subtitle}</p>}
          </div>

          <div className="card p-6 bg-white">{children}</div>

          {footer && <p className="mt-5 text-center text-sm text-ink-500">{footer}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
