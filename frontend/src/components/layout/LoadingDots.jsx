import React from 'react';

const LoadingDots = ({ size = 'md', label = 'Thinking...' }) => {
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  return (
    <div className="flex items-center gap-2 text-ink-300">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`${dotSize} rounded-full bg-current animate-pulse-dot`}
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>
      {label && <span className="text-xs">{label}</span>}
    </div>
  );
};

export default LoadingDots;
