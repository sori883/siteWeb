import clsx from 'clsx';
import React from 'react';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-accent',
  info: 'btn-info',
};

const sizes = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

export const Button = ({
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  ...props
}: ButtonProps,
): JSX.Element => (
  <button
    type={type}
    className={clsx(
      'btn rounded-none',
      variants[variant],
      sizes[size],
      isLoading && 'loading',
      className
    )}
    {...props}
  >
    <span className='mx-2'>{props.children}</span>
  </button>
);

Button.displayName = 'Button';