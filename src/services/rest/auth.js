const Login = async (payload) => {
    try {
        const res = await fetch("https://galenika.cloud/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(`Error: ${data.error}`);
        }
        window.localStorage.setItem('token', data.access_token);
    } catch (error) {
        console.log('error', error)
    }
};

const ValidateToken = async (payload) => {
    try {
        const res = await fetch("https://galenika.cloud/api/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${payload}`
            }
        });

        const data = await res.json();
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        console.log('error', error);
    }
}

export default {
    Login,
    ValidateToken
}