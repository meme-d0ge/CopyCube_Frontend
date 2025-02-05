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
    required: string,
    selectOption: 'public' | 'private' | 'link' | 'none';
}
const TypeSelector = ({disabledOptions, selectOption, register, name, required }: TypeSelectorProps) => {
    const [select, setSelect] = useState('none');
    useEffect(() => {
        setSelect(selectOption);
    }, []);
    return (
        <div className={`${styles['radio-inputs']}`}>
            <label className={styles["radio"]}>
                <input
                    type="radio"
                    {...register(name, {required: required})}
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
                    {...register(name, {required: required})}
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
                    {...register(name, {required: required})}
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