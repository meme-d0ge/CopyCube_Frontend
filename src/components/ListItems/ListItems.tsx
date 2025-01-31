import React from 'react';

export interface ListItemProps{
    key: string;
    keyData: string;
    valueData: string;
}
interface ListItemsProps {
    items: ListItemProps[];
    className?: string;
}
const ListItems = ({items, className}:ListItemsProps) => {
    return (
        <ul className={`grid grid-cols-[auto, 1fr] sm:grid-cols-2 grid-rows-1 sm:gap-y-[5px] gap-y-0 gap-[0, 1em] sm:text-start text-center ${className}`}>
            {
                items.map((item) => {
                    return (
                        <li className={'contents'} key={item.key}>
                            <span className={'mt-[10px] sm:mt-[0] bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-t-[20px]  sm:rounded-l-[20px] sm:rounded-r-[0]'}>{item.keyData}</span>
                            <span className={'bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-[0]'}>{item.valueData}</span>
                        </li>
                    );
                })
            }
        </ul>
    );
};

export default ListItems;