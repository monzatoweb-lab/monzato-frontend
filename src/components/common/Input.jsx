import React from 'react';

/**
 * Reusable Input component for MONZATO design system.
 *
 * @param {string} label
 * @param {string} error
 * @param {boolean} uppercase
 * @param {string} className
 */
export const Input = ({
  label,
  error,
  uppercase = true,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-[11px] font-bold tracking-[0.12em] text-neutral-800 uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`
          w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-neutral-900 
          placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors
          ${uppercase ? 'uppercase' : ''}
          ${error ? 'border-red-500' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      {error && (
        <p className="text-[10px] font-semibold text-red-500 tracking-wide uppercase">
          {error}
        </p>
      )}
    </div>
  );
};
