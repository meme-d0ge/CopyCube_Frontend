import React from 'react';

export interface ListItemProps{
    key: string;
    keyData: React.ReactNode;
    keyCustom?: any;
    valueData: React.ReactNode;
    valueCustom?: any;
}
interface ListItemsProps {
    items: ListItemProps[];
    className?: string;
}
const ListItems = ({items, className}:ListItemsProps) => {
    return (
        <ul className={`grid grid-cols-[auto, 1fr] sm:grid-cols-2 grid-rows-1 sm:gap-y-[10px] sm:text-start text-center ${className}`}>
            {
                items.map((item) => {
                    return (
                        <li className={'contents text-white hover:text-lightGray'} key={item.key}>
                            <span {...item.keyCustom}>{item.keyData}</span>
                            <span {...item.valueCustom}>{item.valueData}</span>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default ListItems;