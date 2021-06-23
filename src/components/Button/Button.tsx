import React from 'react';
import { Link } from 'react-router-dom';

import './Buttons.styles.scss';

interface IButton {
  label: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className: string;
  disabled?: boolean;
  tag: string;
  to?: string;
  onClick?: (() => void) | ((e: React.FormEvent<HTMLButtonElement>) => void);
}

export const Button = (props: IButton): JSX.Element => {
  const { label, className = '', type = 'button', disabled, onClick } = props;

  return (
    <button
      type={type}
      className={`btn ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
