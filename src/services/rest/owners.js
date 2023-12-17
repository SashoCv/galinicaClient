const getAll = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/owners', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        return data.owners;
    } catch (error) {
        console.log('error', error);
    }
};

const getOneById = async (id) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/owners/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        return data.owner;
    } catch (error) {
        console.log('error', error);
    }
};

const updateOneById = async (id, data) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/ownerUpdate/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log('error', error);
    }
};

const create = async (data) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/ownerStore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
    } catch (error) {   
        console.log('error', error);
    }
}



export default {
    getAll,
    getOneById,
    updateOneById,
    create
};