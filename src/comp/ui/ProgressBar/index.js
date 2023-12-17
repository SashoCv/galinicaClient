import React from 'react';
// styles
import './style.css';

const ProgressBar = (props) => {
    return (
        <div className='progress-bar__container'>  
            <div className={`progress-bar__header`}>
                <span>{props.label}</span>
                <span>{props.value}</span>
            </div>
            <div className={`progress-bar ${props.type}`}>
                <div className="progress-bar__value" style={{ width: props.value }}>

                </div>
            </div>
        </div>
    )
}

export default ProgressBar