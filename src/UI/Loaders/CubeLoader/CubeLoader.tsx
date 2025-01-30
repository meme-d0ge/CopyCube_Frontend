import React from 'react';
import styles from './CubeLoader.module.css'
const CubeLoader = () => {
    return (
        <div className={`${styles.spinner}`}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}

export default CubeLoader;
