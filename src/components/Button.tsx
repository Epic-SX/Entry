import clsx from 'clsx';
import React, { FC } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
}

const Button: FC<ButtonProps> = ({
  className,
  type,
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <button
      className={clsx('btn', `btn-${variant}`, className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
