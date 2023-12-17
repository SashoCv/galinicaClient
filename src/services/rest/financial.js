const getAll = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/generalFilterData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.log('error', error);
    }
};

export default {
    getAll,
};