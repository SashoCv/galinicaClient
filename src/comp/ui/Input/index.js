import React from 'react';
// styles
import './style.css';

const Input = (props) => {
    return (
        <div className={`input-container ${props.customClassName}`}>
            <label className='input-label'>{props.label}</label>
            <div className='input-wrapper'>
                <input 
                    className={`input ${props.value && 'value'} ${props.height} ${props.error && 'error'}`}
                    value={props.value}
                    onChange={props.onChange}
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    // defaultValue={props.name === 'phone' ? '+3897' : null}
                    onKeyDown={props.name === 'phone' ? props.onKeyDown : null}
                    disabled={props.disabled}
                />
                {/* {props.value && <span className='input-wrapper-ph'>{props.placeholder}</span>} */}
                {/* <span className={`input-wrapper-ph ${props.value && 'has-value'}`}>{props.placeholder}</span> */}
                {props.img && <img src={props.img}/>}
            </div>
            <span className='input-error'>{props.error}</span>
        </div>
    )
};

export default Input;