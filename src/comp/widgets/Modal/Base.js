import React from 'react';
import ReactDOM from 'react-dom';

export const ModalBase = (props) => {
    return ReactDOM.createPortal(
        props.children,
        document.getElementById('modal-root')
    )
};