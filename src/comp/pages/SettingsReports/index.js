import React, { useState, useEffect } from 'react';
// ui comps
import Input from 'comp/ui/Input';
import Select from 'comp/ui/Select';
import Button from 'comp/ui/Button';
import Settings from '../Settings';
import UploadDoc from 'comp/ui/UploadDoc';
import Pharmacies from 'services/rest/pharmacies';
import MultiSelect from 'comp/ui/MultiSelect';
// styles
import './style.css';

const SettingsReports = () => {

    const [pharmacies, setPharmacies] = useState([]);
    const [data, setData] = useState({
        pharmacy_id: '',
        month: ''
    })

    useEffect(() => {
        (async() => {
            const data = await Pharmacies.getAll();
            console.log('data', data)
            setPharmacies(data.map(d => {
                return {
                    value: d.id,
                    label: d.drugstoreName 
                }
            }));
        })();
    }, []);

    const handleOnChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeMulti = (e, s) => {
        setData({
            ...data,
            [s.name]: e.value
        })
    }

    return (
        <Settings>
            <div className='settings-reports'>
                <h1 className='settings-header-label'>Report info</h1>
                <div className='settings-reports__fields'>
                    <div className='settings-reports__fields-group'>
                        <Input label="Одберете месец за извештајот" type="month" name="month" value={data.month} onChange={handleOnChange} customClassName="settings-report__input"/>
                        <MultiSelect label="Одбери веледрогерија" options={pharmacies} name="pharmacy_id" onChange={handleOnChangeMulti} />
                    </div>
                    <UploadDoc payload={data}/>
                </div>
            </div>
        </Settings>
    )
}

export default SettingsReports;