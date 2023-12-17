import React from 'react';
// styles
import './style.css';

const Button = (props) => {
    return (
        <button className={`btn ${props.customClassName} ${props.type}`} onClick={props.onClick}>
            {
                props.isLoading
                ? <Spinner />
                : props.label
            }
        </button>
    )
}

const Spinner = () => {
    return <div className="spinner"><div></div></div>
};

export default Button;