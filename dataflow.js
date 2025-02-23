const fetch = require('node-fetch');

module.exports = class DataFlow {
    async getDataFlow() {
        const routerUrl = 'https://86.87.106.152:443'; // Your DrayTek DDNS/IP
        const username = 'admin'; // Your admin username
        const password = 'Admin123'; // Your admin password

        const login = await fetch(`${routerUrl}/login.htm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        if (!login.ok) throw new Error('Login failed');

        const response = await fetch(`${routerUrl}/dataflow.htm`);
        const html = await response.text();
        return { html };
    }
};
