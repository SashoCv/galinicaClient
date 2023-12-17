const getAll = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/drugstores', {
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

const getOneById = async (id) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/drugstores/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        console.log('data', data)
        return data.data;
    } catch (error) {
        console.log('error', error);
    }
};

const updateById = async(id, drugstore) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/drugstoreUpdate/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(drugstore)
        });

        const data = await res.json();
        console.log('data', data)
        // return data.data;
    } catch (error) {
        console.log('error', error);
    }
}

const create = async(drugstore) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/drugstoreStore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(drugstore)
        });

        const data = await res.json();
        console.log('data', data)
        // return data.data;
    } catch (error) {
        console.log('error', error);
    }

}

export default {
    getAll,
    getOneById,
    updateById,
    create
};