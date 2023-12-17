import React from 'react';
import Select from 'react-select';
// styles
import './style.css';

const MultiSelect = (props) => {
    // console.log('props', props)
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border: '1px solid #D9D9D9',
          borderRadius: '5px',
          minHeight: '55px',
        //   boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 0, 0, 0.2)' : null, // Optional: Add focus styles
        })
    };

    return (
        <div className='multi-select'>
            <span>{props.label}</span>
            <Select value={props.value} styles={customStyles} options={props.options} isMulti={props.isMulti} onChange={props.onChange} name={props.name} className={`multi-sselect-main ${props.customClassName}`} isDisabled={props.disabled}/>
        </div>
    )
};

export default MultiSelect;