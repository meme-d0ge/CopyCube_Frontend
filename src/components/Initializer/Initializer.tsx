'use client'
import './Initializer.css'
import {userStore} from "@/store/userStore";
import Cube from "@/UI/Loaders/CubeLoader/CubeLoader";
import {CSSTransition} from "react-transition-group";
import {useEffect, useRef, useState} from "react";

export const Initializer = () => {
    const {initialized, timeInitialized, initialize} = userStore(state => state)
    const [frozen, setFrozen] = useState(true)
    const nodeRef = useRef(null);
    useEffect(() => {
        if (!initialized){
            initialize();
        } else {
            const delay = Math.max(0, 600 - timeInitialized);
            setTimeout(() => {setFrozen(false)}, delay);
        }
    }, [initialized]);
    return (
        <>
            <CSSTransition nodeRef={nodeRef} in={frozen} timeout={{exit: 400}} unmountOnExit={true} classNames="loader">
                <div className={'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-neutral-900 z-50'} ref={nodeRef}>
                    <Cube/>
                </div>
            </CSSTransition>
        </>
    );
};
