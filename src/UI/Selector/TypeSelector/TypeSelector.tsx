'use client'
import React, {useEffect, useState} from 'react';
import styles from './TypeSelector.module.css';
interface disabledOptions {
    public: boolean;
    private: boolean;
    link: boolean;
}

interface TypeSelectorProps{
    disabledOptions: disabledOptions;
    register: any,
    name: string,
    selectOption: 'public' | 'private' | 'link' | 'none';
}
const TypeSelector = ({disabledOptions, selectOption, register, name }: TypeSelectorProps) => {
    const [select, setSelect] = useState('none');
    useEffect(() => {
        setSelect(selectOption);
    }, []);
    return (
        <div className={`${styles['radio-inputs']}`}>
            <label className={styles["radio"]}>
                <input
                    type="radio"
                    {...register(name)}
                    value="public"
                    disabled={disabledOptions.public}
                    checked={select === 'public'}
                    onClick={()=>{setSelect('public')}}
                />
                <span className={styles["name"]}>Public</span>
            </label>
            <label className={styles["radio"]}>
                <input
                    type="radio"
                    {...register(name)}
                    value="private"
                    disabled={disabledOptions.private}
                    checked={select === 'private'}
                    onClick={()=>{setSelect('private')}}
                />
                <span className={styles["name"]}>Private</span>
            </label>
            <label className={styles["radio"]}>
                <input
                    type="radio"
                    {...register(name)}
                    value="link"
                    disabled={disabledOptions.link}
                    checked={select === 'link'}
                    onClick={()=>{setSelect('link')}}
                />
                <span className={styles["name"]}>Link</span>
            </label>
        </div>
    );
};

export default TypeSelector;