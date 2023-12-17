const getAll = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        console.log('data', data.data)
        return data.data;
    } catch (error) {
        console.log('error', error);
    }
};

const getProductById = async (id) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/products/${id}`, {
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

const updateProductById = async(id, product) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/updateProduct/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(product)
        });
        // no need to return anything
        // const data = await res.json();
        // console.log('data', data)
        // return data.data;
    } catch (error) {
        console.log('error', error);
    }
};

const createProduct = async(product) => {
    try {
        const res = await fetch(`https://galenika.cloud/api/storeProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(product)
        });
        // no need to return anything
        // const data = await res.json();
        // return data.data;
    } catch (error) {
        console.log('error', error);
    }

}

export default {
    getAll,
    getProductById,
    updateProductById,
    createProduct
};