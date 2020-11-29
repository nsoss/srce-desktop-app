import React from 'react';
import './Input.styles.css';

export default function Input(props: React.HTMLProps<HTMLInputElement>) {
  return <input className='input' {...props} />;
}
