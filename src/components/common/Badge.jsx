import React from 'react';

/**
 * Reusable Badge component for MONZATO design system.
 *
 * @param {'success' | 'warning' | 'danger' | 'info' | 'dark' | 'admin'} variant
 * @param {React.ReactNode} children
 * @param {string} className
 */
export const Badge = ({
  variant = 'dark',
  children,
  className = ''
}) => {
  const variantStyles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
    dark: 'bg-neutral-900 text-white border-neutral-900',
    admin: 'bg-purple-50 text-purple-900 border-purple-200'
  };

  const combinedClasses = `
    inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase border
    ${variantStyles[variant] || variantStyles.dark}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <span className={combinedClasses}>
      {children}
    </span>
  );
};
