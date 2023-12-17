const getAll = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/pharmacies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        console.log('data.data', data.data);
        return data.data;
    } catch (error) {
        console.log('error', error);
    }
};

export default {
    getAll,
};