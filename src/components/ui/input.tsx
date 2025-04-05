import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'filled' | 'outline';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      variant = 'default',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      default: 'bg-tertiary border border-border-light focus:border-accent',
      filled: 'bg-gray-800 border-0 focus:bg-gray-700',
      outline: 'bg-transparent border-2 border-border-medium focus:border-accent'
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    // Error styles
    const errorStyles = error ? 'border-ruby focus:border-ruby' : '';

    // Disabled styles
    const disabledStyles = disabled ? 'opacity-70 cursor-not-allowed' : '';

    // Base input styles
    const inputStyles = `
      rounded-md px-4 py-2 text-white 
      transition-all duration-300
      focus:outline-none focus:ring-1 focus:ring-accent
      ${variantStyles[variant]}
      ${widthStyles}
      ${errorStyles}
      ${disabledStyles}
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1`}>
        {label && (
          <label className="block text-sm font-medium text-secondary mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled}
            className={inputStyles}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(helperText || error) && (
          <p className={`text-xs ${error ? 'text-ruby' : 'text-tertiary'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
