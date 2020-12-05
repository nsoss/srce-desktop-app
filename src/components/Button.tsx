import classNames from 'classnames';
import React, { ReactNode } from 'react';
import './Button.styles.css';

interface ButtonProps {
  children?: ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export default function Button({ children, danger, onClick }: ButtonProps) {
  return (
    <button
      className={classNames({
        button: true,
        'button--danger': danger,
      })}
      onClick={onClick}>
      {children}
    </button>
  );
}
