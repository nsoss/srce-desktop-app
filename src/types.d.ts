type DropdownItem = {
  id: string;
  label: string;
};

type DropdownData = {
  items: Array<DropdownItem>;
  selectedId?: string;
};
