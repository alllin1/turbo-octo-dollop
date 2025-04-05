import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      href,
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      primary: 'bg-gradient-gold text-black shadow-gold-sm hover:shadow-gold-md',
      secondary: 'bg-gradient-primary text-white shadow-md hover:shadow-lg',
      outline: 'bg-transparent border-2 border-accent text-accent hover:bg-accent/10',
      ghost: 'bg-transparent text-accent hover:bg-accent/10',
      link: 'bg-transparent text-accent hover:underline p-0'
    };

    // Size styles
    const sizeStyles = {
      sm: 'text-sm py-1 px-3',
      md: 'text-base py-2 px-4',
      lg: 'text-lg py-3 px-6'
    };

    // Common styles
    const baseStyles = 'font-accent font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary';
    
    // Disabled styles
    const disabledStyles = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : '';
    
    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';
    
    // Combine all styles
    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`;

    // Loading spinner
    const LoadingSpinner = () => (
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );

    // Button content
    const buttonContent = (
      <>
        {isLoading && <LoadingSpinner />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    // If href is provided, render as Link
    if (href) {
      return (
        <Link href={href} className={buttonStyles}>
          {buttonContent}
        </Link>
      );
    }

    // Otherwise render as button
    return (
      <button
        ref={ref}
        className={buttonStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
