'use client'
import React from 'react';
import styles from './TextArea.module.css'
const TextArea = (props: any) => {
    const {nameField, type, className, classNameDiv, ...any} = props
    return (
        <div className={`${styles['input-group']} ${classNameDiv}`}>
            <textarea {...any} required type={`${type}`} autoComplete="off" className={`${styles['input']} ${className}`}/>
            <label className={`${styles['user-label']} user-label`}>{`${nameField}`}</label>
        </div>
    );
}
export default TextArea;
