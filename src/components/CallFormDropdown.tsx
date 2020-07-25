import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dropdownItemSelected } from '../actions/callFormActions';
import { DropdownData } from '../reducers/callFormReducer';
import { AppDispatch, AppState } from '../store';
import Dropdown from './Dropdown';

interface CallFormDropdownProps {
  dropdownKey: string;
}

export default function CallFormDropdown({
  dropdownKey: key,
}: CallFormDropdownProps) {
  const { items, selectedId } = useSelector<AppState, DropdownData>(
    (state) => state.callForm.dropdowns[key] || emptyDropdown
  );
  const dispatch = useDispatch<AppDispatch>();

  const selectedItem = items.find((item) => item.id === selectedId);
  const label = selectedItem?.label || 'Izaberi';

  return (
    <Dropdown
      label={label}
      items={items}
      itemToLabel={(item) => item.label}
      onSelect={(item) => {
        dispatch(dropdownItemSelected(key, item.id));
      }}
    />
  );
}

const emptyDropdown: DropdownData = {
  items: [],
};
