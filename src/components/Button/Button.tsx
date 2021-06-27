import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Buttons.styles.scss';

interface IButton {
  tag: 'button';
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  disabled: boolean;
  onClick: (() => void) | ((e: React.FormEvent<HTMLButtonElement>) => void);
}

interface ILink {
  tag: 'a';
  to: string;
  label: string;
  className?: string;
}

export const Button = (props: IButton | ILink): JSX.Element => {
  const { label, className = '' } = props;

  if (props.tag === 'a') {
    return (
      <Link to={props.to} className={`btn ${className}`}>
        <span className="shadow"></span>
        <span className="btn__edge"></span>
        <span className="btn__label">{label}</span>
      </Link>
    );
  }

  return (
    <button
      type={props.type}
      className={`btn ${className}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <span className="shadow"></span>
      <span className="btn__edge"></span>
      <span className="btn__label">{label}</span>
    </button>
  );
};
