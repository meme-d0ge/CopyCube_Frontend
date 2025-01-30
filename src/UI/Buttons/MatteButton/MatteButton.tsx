'use client'
import React from 'react';
import styles from './MatteButton.module.css';
const Button = (props: any) => {
    const {children, className, ...any} = props;
    return (
        <button className={`${styles.button} ${className}`} {...any}>
            {children}
        </button>
    );
}
export default Button;
