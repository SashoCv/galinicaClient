import React, { useEffect, useState } from 'react';
// services
import Attachments from 'services/rest/attachments';
// icons
import ICON_UPLOAD from 'assets/icons/ico-upload.svg';
import axios from 'axios';
// styles
import './style.css';

const UploadDoc = (props) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [data, setData] = useState({})

    const handleFileChange = async (e) => {
        // console.log('e.target.files[0]', e.target.files[0])
        e.preventDefault();
        if (e.target.files[0].type.includes('spreadsheet')) {
            // setFile(e.target.files[0]);
            await attachFile(e.target.files[0]);
            setError('');
        } else {
            setFile(null);
            setError('Document not valid');
        }
    }
    console.log('file', file)

    // const formData = new FormData();
    const attachFile = async (file) => {
        try {
            console.log('file', file)
            console.log('props.payload', props.payload)
            // return;
            const fd = new FormData();

            fd.append('file', file);
            fd.append('month', props.payload.month);
            fd.append('pharmacy_id', props.payload.pharmacy_id);
            // fd.append('year', "props.payload.year");
            // console.log('fd', fd.get('month'))
            console.log('[first]', [...fd])
            const res = await Attachments.insertAxios(fd);
            console.log('res', res)
            const data = await res.json();
            console.log('data', data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const generateCSRFToken = () => {
        const token = Math.random().toString(36).substring(2);
        return token;
    };

    

    const handleFileChangeTwo = async (e) => {
        try {
            const fd = new FormData();
            fd.append('file', e.target.files[0]);
            fd.append('month', props.payload.month);
            fd.append('pharmacy_id', props.payload.pharmacy_id);
            let b = '---------------------------974767299852498929531610575';


            // let r = await axios.post('https://galenika.cloud/api/importExcelDrugstore', fd, {
            //     headers: {
            //         // ...axios.defaults.headers,
            //         'content-type': `multipart/form-data`,
            //         'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            //     },
            // });
            axios({
                method: 'POST',
                url: 'https://galenika.cloud/api/importExcelDrugstore',
                data: fd,
                headers: {
                    // 'Content-Type': `multipart/form-data`,
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                },
            }).then(res => {
                console.log('res', res);
            }).catch(err => {
                console.log('err', err);
            })

            // console.log('r', r)

            // const res = await fetch('https://galenika.cloud/api/importExcelDrugstore', {

            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            //     },
            //     data: fd
            // });
        // console.log('res', res);
        } catch (error) {
            console.log('error', error);
        }
    }
    
    console.log('file', file);
    
    
    

    return (
        <>
        <label className='upload-doc'>
            <img src={ICON_UPLOAD}/>
            Upload excel
            <input type='file' className='upload-doc__input' onChange={handleFileChangeTwo}/>
            <span className='upload-doc__error'>{error && error}</span>
        </label>
        {/* <button>SAVE</button> */}
        </>
    )
}

export default UploadDoc;