import React from 'react';
import Button from './Button';
import Icons from './Icons';

export default {
  title: 'Components/Button',
  component: Button,
};

export function Default() {
  return (
    <Button>
      <Icons.Save />
      Default
    </Button>
  );
}

export function Danger() {
  return (
    <Button danger>
      <Icons.Save />
      Danger
    </Button>
  );
}
