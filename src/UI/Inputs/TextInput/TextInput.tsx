'use client'
import React from 'react';
import styles from './TextInput.module.css'
const TextInput = (props: any) => {
    const {nameField, type, className, classNameDiv, ...any} = props
    return (
        <div className={`input-group ${styles['input-group']} ${classNameDiv}`}>
            <input {...any} required type={`${type}`} autoComplete="off" className={`${styles['input']} ${className}`}/>
            <label className={`${styles['user-label']} user-label`}>{`${nameField}`}</label>
        </div>
    );
}
export default TextInput;
