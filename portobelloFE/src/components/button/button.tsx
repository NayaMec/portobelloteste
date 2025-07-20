import React from 'react';
import { Spinner } from '../spinner/spinner';
import './button.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  danger?: boolean;
}

export function Button({
  isLoading = false,
  type = 'button',
  disabled = false,
  children,
  danger = false,
  onClick,
  ...rest
}: IButtonProps) {
  return (
    <button
      className={`custom-button ${danger ? '-danger' : ''}`}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={18} />}
    </button>
  );
}
