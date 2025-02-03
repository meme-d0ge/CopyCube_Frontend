'use client'
import React from 'react';
import styles from './TextArea.module.css'
import {TextareaAutosize} from "@mui/material";

const TextArea = (props: any) => {
    const {nameField, className, classNameDiv, ...any} = props
    return (
        <div className={`${styles['input-group']} ${classNameDiv}`}>
            <TextareaAutosize {...any} className={`${styles.input} ${className} resize-none`}></TextareaAutosize>
            <label className={`${styles['user-label']}`}>{`${nameField}`}</label>
        </div>
    );
};
export default TextArea;
