import React from 'react';

/**
 * Reusable SectionHeader component for MONZATO luxury branding.
 *
 * @param {string} title
 * @param {string} subtitle
 * @param {'center' | 'left' | 'right'} align
 * @param {string} className
 */
export const SectionHeader = ({
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const alignStyles = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col ${alignStyles[align] || alignStyles.center} ${className}`}>
      {title && (
        <h2 className="text-xl sm:text-3xl font-bold tracking-[0.18em] text-neutral-950 uppercase font-serif-luxury">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-neutral-400 uppercase mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};
