const getAll = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/cities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        return data.allCities;
    } catch (error) {
        console.log('error', error);
    }
};

export default {
    getAll,
};