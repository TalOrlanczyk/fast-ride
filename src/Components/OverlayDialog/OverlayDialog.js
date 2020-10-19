import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './OverlayDialog.module.css';
import  useOnClickOutside from '../../CustomeHooks/useOnClickOutside/useOnClickOutside';
const OverlayDialog = (props) => {
    const wrapperRef = useRef(null);
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });
    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            props.onClose();
        }
    };

   useOnClickOutside( wrapperRef,()=>props.onClose())

    return ReactDOM.createPortal(
        <div className={styles.Dialog}>
            <div className={styles.InnerDialog} tabIndex={1}>
                <div className={styles.DialogCard} tabIndex={-1}>
                    <div className={styles.DialogContent} ref={wrapperRef} data-testid="content">

                        {props.children}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('OverlayDialog')
    )
}

export default OverlayDialog;