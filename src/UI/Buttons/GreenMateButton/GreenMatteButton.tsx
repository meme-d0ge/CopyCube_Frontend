'use client'
import React from 'react';
import styles from './GreenMatteButton.module.css';
const GreenMatteButton = (props: any) => {
    const {children, className, ...any} = props;
    return (
        <button className={`${styles.button} ${className}`} {...any}>
            {children}
        </button>
    );
}
export default GreenMatteButton;
