const setTarget = async (payload) => {
    try {
        let res = await fetch("https://galenika.cloud/api/yearTarget", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
        });

        console.log('res',await res.json());
        // return await res.json();
    } catch (error) {
        console.log('error', error);
    }
};

export default {
    setTarget
}