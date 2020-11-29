import React, { useState } from 'react';
import Dropdown from './Dropdown';
import FormLabel from './FormLabel';
import Input from './Input';

export default {
  title: 'Components/FormLabel',
  component: FormLabel,
};

export function Default() {
  return (
    <FormLabel label='Default example'>
      <Input placeholder='Placeholder' />
    </FormLabel>
  );
}

export function Required() {
  return (
    <FormLabel label='Required example' required>
      <Input placeholder='Placeholder' />
    </FormLabel>
  );
}

export function WithDropdown() {
  const items = ['Option 1', 'Option 2', 'Option 3'];
  const [choice, setChoice] = useState<string | undefined>();

  return (
    <FormLabel label='Dropdown example'>
      <Dropdown
        items={items}
        itemToLabel={(item) => item}
        onSelect={setChoice}
        value={choice}
      />
    </FormLabel>
  );
}

export function Mixed() {
  return (
    <React.Fragment>
      <Default />
      <Required />
      <WithDropdown />
      <WithDropdown />
      <Default />
    </React.Fragment>
  );
}
