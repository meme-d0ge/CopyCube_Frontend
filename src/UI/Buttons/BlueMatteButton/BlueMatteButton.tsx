'use client'
import React from 'react';
import styles from './BlueMatteButton.module.css';
const BlueMatteButton = (props: any) => {
    const {children, className, ...any} = props;
    return (
        <button className={`${styles.button} ${className}`} {...any}>
            {children}
        </button>
    );
}
export default BlueMatteButton;
