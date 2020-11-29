import classNames from 'classnames';
import React, { ReactNode } from 'react';
import './Button.styles.css';

interface ButtonProps {
  children?: ReactNode;
  danger?: boolean;
}

export default function Button({ children, danger }: ButtonProps) {
  return (
    <button
      className={classNames({
        button: true,
        'button--danger': danger,
      })}>
      {children}
    </button>
  );
}
