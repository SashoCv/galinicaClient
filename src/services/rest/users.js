const create = async (data) => {
    try {
        let res = await fetch("https://galenika.cloud/api/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }); 
        
        return await res.json();
    } catch (error) {
        console.log('error', error);
    }
};

const getAll = async () => {
    try {
        let res = await fetch("https://galenika.cloud/api/users", {
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
    create,
    getAll
};