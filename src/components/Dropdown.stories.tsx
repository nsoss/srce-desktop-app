import React, { useState } from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

export function Default() {
  const items = ['Option 1', 'Option 2', 'Option 3'];
  const [choice, setChoice] = useState<string | undefined>();

  return (
    <Dropdown
      items={items}
      itemToLabel={(item) => item}
      onSelect={setChoice}
      value={choice}
    />
  );
}

export function Many() {
  return (
    <React.Fragment>
      <Default />
      <Default />
      <Default />
    </React.Fragment>
  );
}
