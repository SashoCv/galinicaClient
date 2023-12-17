import React, { useState } from 'react';
// ui comps
import Input from '../Input';
// styles
import './style.css';
const InputTag = (props) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const addTag = (e) => {
        // console.log('e', e.target.value)
        props.onChange(e.target.value)
    };

    console.log('props.selectedOptions', props.selectedOptions)

    return (
        <div className='input-tag'>
            <Input 
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {isFocused && 
                <ul className='input-tag__list'>
                    {props.options.map((o, i) => {
                        return (
                            <li key={i} value={o.value} onClick={addTag}>{o.label}</li>
                        )
                    })}
                </ul>
            }
            
            {
                props.options.filter((o, i) => {
                    if (props.selectedOptions.includes(o.id)) {
                        return (
                            <span>{o.label}</span>
                        )
                    }
                })
            }

        </div>
    )
};

export default InputTag;