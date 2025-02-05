import React from 'react';
import styles from './FireflyLoader.module.css';

interface FireflyLoaderProps {
    className?: string;
}
const FireflyLoader = ({className}: FireflyLoaderProps) => {
    return (
        <div className={`${styles.loader} ${className}`}>
            <div className={`${styles.face}`}>
                <div className={`${styles.circle}`}></div>
            </div>
            <div className={`${styles.face}`}>
                <div className={`${styles.circle}`}></div>
            </div>
        </div>
    );
};

export default FireflyLoader;