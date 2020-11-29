import React from 'react';
import Dropdown from './Dropdown';

interface CallFormDropdownProps<T extends string> {
  items: Array<EnumOf<T>>;
  dictionary?: Record<T, string>;
}

export default function CallFormDropdown<T extends string>({
  items,
  dictionary,
}: CallFormDropdownProps<T>) {
  return (
    <Dropdown
      label='Izaberi'
      items={items}
      itemToLabel={(item) => (dictionary ? dictionary[item.value] : '')}
      onSelect={() => {}}
    />
  );
}
