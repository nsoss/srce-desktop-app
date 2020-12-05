import React from 'react';
import './Input.styles.css';

export default function Input(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <input className='input' {...props} />;
}
