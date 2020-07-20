export const dropdownItemSelected = (key: string, id: string) =>
  ({
    type: 'DROPDOWN_ITEM_SELECTED',
    key,
    id,
  } as const);

export type CallFormAction = ReturnType<typeof dropdownItemSelected>;
