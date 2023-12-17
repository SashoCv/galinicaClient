import React from 'react';
// styles
import './style.css';

const Switch = (props) => {
    let disabled = false;
    let theme = 'blurple';
    return (
        <label className={`form-switch ${disabled ? "disabled" : ''} ${props.customClassName}`} onClick={props.onClickParent} title={props.title}>
            <input type="checkbox" onChange={props.onChange} checked={props.value} name={props.name} disabled={disabled} />
            <span className={`form-switch__pill ${theme}`}><span className="form-switch__ball"></span></span>
            <span className="form-switch__label">
                {props.img && <img src={props.img} alt='' />}
                {props.label}
            </span>
        </label>
    )
};

export default Switch;