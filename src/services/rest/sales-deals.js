const getAll = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/deals', {
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

const createDeal = async (payload) => {
    try {
        let res = await fetch("https://galenika.cloud/api/dealStore", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
        }); 
        
        return await res.json();
    } catch (error) {
        console.log('error', error);
    }
};

const addProducts = async (payload) => {
    try {
        let res = await fetch("https://galenika.cloud/api/dealProductStore", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
        });

        return await res.json();
    } catch (error) {
        console.log('error', error);
    }
};

const getOneById = async (id) => {
    try {
        let res = await fetch(`https://galenika.cloud/api/deals/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
        });

        // console.log('res', await res.json());
        let data = await res.json();  
        return data.data;
    } catch (error) {
        console.log('error', error);
    }
};

const getProductsByDealId = async (id) => {
    try {
        let res = await fetch(`https://galenika.cloud/api/dealProduct/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        let data = await res.json();
        // console.log('data', data);
        // console.log('res', res);
        return data.data;
    } catch (error) {
        console.log('error', error);
    }
};

const deleteProductById = async(id) => {
    try {
        let res = await fetch(`https://galenika.cloud/api/dealProductDelete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        let data = await res.json();
        console.log('data', data)
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

const getAllQ = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/quarterlyDeal', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        // console.log('data', data)
        return data.data;
    } catch (error) {
        console.log('error', error);
    }
}

const createDealQ = async (payload) => {
    try {
        let res = await fetch("https://galenika.cloud/api/quarterlyStore", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
        }); 
        
        return await res.json();
    } catch (error) {
        console.log('error', error);
    }
};

export default {
    getAll,
    createDeal,
    addProducts,
    getOneById,
    getProductsByDealId,
    deleteProductById,
    getAllQ,
    createDealQ
};