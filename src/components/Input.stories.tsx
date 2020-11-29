import React from 'react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

export function Default() {
  return <Input placeholder='Example <Input>' />;
}

export function Many() {
  return (
    <React.Fragment>
      <Input placeholder='First' />
      <Input placeholder='Second' />
      <Input placeholder='Third' />
    </React.Fragment>
  );
}
