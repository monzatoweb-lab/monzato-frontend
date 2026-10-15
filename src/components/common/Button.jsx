import React from 'react';

/**
 * Reusable Button component for MONZATO design system.
 *
 * @param {'primary' | 'outline-white' | 'filled-white' | 'outline-dark' | 'subtle' | 'link'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {boolean} fullWidth
 * @param {boolean} isLoading
 * @param {React.ReactNode} children
 * @param {string} className
 * @param {React.ElementType} icon
 * @param {'left' | 'right'} iconPosition
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  className = '',
  type = 'button',
  disabled = false,
  icon: IconComponent,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-xs sm:text-sm',
    lg: 'px-8 py-3.5 text-xs sm:text-sm'
  };

  const variantStyles = {
    primary: 'bg-neutral-950 text-white border border-neutral-950 hover:bg-neutral-800',
    'outline-white': 'border border-white text-white hover:bg-white hover:text-black backdrop-blur-xs',
    'filled-white': 'border border-white bg-white/10 text-white hover:bg-white hover:text-black backdrop-blur-xs',
    'outline-dark': 'border border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-white',
    subtle: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-transparent',
    link: 'text-neutral-900 hover:underline bg-transparent border-0 p-0 tracking-normal normal-case'
  };

  const widthStyle = fullWidth ? 'w-full flex-1' : '';

  const combinedClasses = `
    ${baseStyles}
    ${sizeStyles[size] || sizeStyles.md}
    ${variantStyles[variant] || variantStyles.primary}
    ${widthStyle}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {IconComponent && iconPosition === 'left' && <IconComponent size={16} />}
          <span>{children}</span>
          {IconComponent && iconPosition === 'right' && <IconComponent size={16} />}
        </span>
      )}
    </button>
  );
};
