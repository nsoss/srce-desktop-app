import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Dropdown.styles.css';
import Icons from './Icons';
import Input from './Input';

interface DropdownProps<TItem> {
  items: TItem[];
  itemToLabel: (item: TItem) => string;
  onSelect?: (item: TItem) => void;
  value?: TItem;
}

export default function Dropdown<TItem>({
  items,
  itemToLabel,
  onSelect,
  value,
}: DropdownProps<TItem>) {
  const [dropped, setDropped] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (!container.current?.contains(event.target as HTMLDivElement)) {
        setDropped(false);
      }
    },
    [container, setDropped]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className='dropdown' ref={container}>
      <Input
        onClick={() => {
          setDropped(true);
        }}
        readOnly
        value={value ? itemToLabel(value) : 'Izaberi'}
      />
      <div className='dropdown__icon-container'>
        {dropped ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
      </div>
      {dropped && (
        <ul>
          {items.map((item, index) => (
            <React.Fragment>
              <li
                key={index}
                onClick={() => {
                  if (onSelect !== undefined) {
                    onSelect(item);
                  }
                  setDropped(false);
                }}>
                {itemToLabel(item)}
              </li>
              {index !== items.length - 1 && (
                <div className='dropdown__separator' />
              )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
