import axios from "axios";

const insert = async (payload) => {
    try {
        console.log('payload.get("file")', payload.get("file"))
        // console.log('payload', payload)
        const res = await fetch('https://galenika.cloud/api/importExcelDrugstore', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                // 'multipart/form-data': 'boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            body: payload
        });
        console.log('res', res)
        res.text().then(body => console.log(body));
        // const data = await res.json();
        // return data;
    } catch (error) {
        console.log('error', error);
    }
};

const insertAxios = async (payload) => {
    try {
        const res = await axios.post('https://galenika.cloud/api/importExcelDrugstore', payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            },
        });
        console.log('res.json()', await res.json())
    } catch (error) {
        console.log('error', error)
    }
};


export default {
    insert,
    insertAxios
};