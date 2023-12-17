import React, { useState, useEffect } from 'react';
import Settings from '.';
import Input from 'comp/ui/Input';
import Button from 'comp/ui/Button';
import target from 'services/rest/target';

const Target = () => {
    const [fields, setFields] = useState({yearTargetRx: null, yearTargetOtc: null, yearTargetTender: null, year: null});

    const onChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const onSave = async () => {
        await target.setTarget(fields);
    };

    return (
        <Settings>
            <div className='target'>
                <h1 className='settings-header-label'>Target</h1>
                <div className='target-fields__group'>
                    <Input label="Rx" value={fields.rx} name="yearTargetRx" onChange={onChange}/>
                    <Input label="Otc" value={fields.otc} name="yearTargetOtc" onChange={onChange}/>
                    <Input label="Tender" value={fields.tender} name="yearTargetTender" onChange={onChange}/>
                </div>
                <div className='target-fields__group'>
                    <Input label="Year" customClassName="target-year" name="year" onChange={onChange}/>
                    <Button label="Save" onClick={onSave}/>
                </div>
            </div>
        </Settings>   
    )
}

export default Target