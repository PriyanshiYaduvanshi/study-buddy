import React from 'react';

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.5 3 24 3 16.3 3 9.7 7.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 45c5.4 0 10.3-1.9 14.1-5.1l-6.5-5.5C29.5 36.4 26.9 37 24 37c-5.3 0-9.6-3.3-11.3-8l-6.6 5.1C9.6 40.5 16.2 45 24 45z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.5 5.5C41.5 35.9 45 30.6 45 24c0-1.4-.1-2.7-.4-3.5z"/>
  </svg>
);

/**
 * Reusable "Continue with Google" button.
 * label: e.g. "Continue with Google" or "Sign up with Google"
 * onClick: async function — parent handles loading/error state
 * loading: disables + shows a subtle pulse while a Google popup is in flight
 */
const GoogleButton = ({ label = 'Continue with Google', onClick, loading = false, disabled = false }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white border border-ink-100 rounded-lg text-sm font-medium text-ink-700
               hover:bg-cream-100 hover:border-ink-300 active:scale-[0.99] transition-all duration-150
               disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? (
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-pulse-dot"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </span>
    ) : (
      <GoogleIcon />
    )}
    <span>{loading ? 'Connecting…' : label}</span>
  </button>
);

export default GoogleButton;
