import clsx from 'clsx';
import React, { ReactNode } from 'react';
import './Button.styles.css';

interface ButtonProps {
  children?: ReactNode;
  danger?: boolean;
}

export default function Button({ children, danger }: ButtonProps) {
  return (
    <button
      className={clsx({
        button: true,
        'button--danger': danger,
      })}>
      {children}
    </button>
  );
}
