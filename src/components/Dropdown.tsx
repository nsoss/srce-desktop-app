import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.styles.css';

interface DropdownProps<TItem> {
    label: string;
    items: Array<TItem>;
    itemToLabel: (item: TItem) => string;
    onSelect: (item: TItem) => void;
}

export default function Dropdown<TItem>({
    label,
    items,
    itemToLabel,
    onSelect,
}: DropdownProps<TItem>) {
    const [dropped, setDropped] = useState(false);
    const container = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: Event) => {
        if (!container.current?.contains(event.target as HTMLDivElement)) {
            setDropped(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="Dropdown" ref={container}>
            <input
                className="form-input toggle-popup"
                onClick={() => {
                    setDropped(true);
                }}
                readOnly
                type="text"
                value={label || 'Izaberi'}
            />
            {dropped && (
                <div className="Dropdown-list">
                    <ul>
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="Dropdown-list-items"
                                onClick={() => {
                                    onSelect(item);
                                    setDropped(false);
                                }}
                            >
                                {itemToLabel
                                    ? itemToLabel(item)
                                    : (item as any).toString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
