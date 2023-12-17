import React from 'react';
// styles
import './style.css';

const Select = (props) => {
    return (
        <label className='select-container'>
            {props.label}
            <select className='select-main' onChange={props.onChange} name={props.name} value={props.value}>
                {props.options.map((o, i) => {
                    return (
                        <option hidden={o.hidden} key={i} value={o.value}>{o.label}</option>
                    )
                })}
            </select>
        </label>
    )
}

export default Select