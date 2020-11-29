import React from 'react';
import './FormLabel.styles.css';

interface FormLabelProps {
  label: string;
  children?: React.ReactNode;
  required?: boolean;
}

export default function FormLabel({
  label,
  children,
  required,
}: FormLabelProps) {
  return (
    <div className='form-label'>
      <label>
        {label}
        {required && <span>*</span>}:
      </label>
      {children}
    </div>
  );
}
