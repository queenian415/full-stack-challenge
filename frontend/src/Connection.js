import 'whatwg-fetch';

const baseUrl = "https://0oxbz2l2h2.execute-api.us-east-1.amazonaws.com/dev/full-stack/";
class Connection {
    static getAllEmployees(adminId) {
        console.log('Connection: get all employees');
        return fetch(baseUrl + 'all_employees', {
                method: 'POST',
                body: JSON.stringify({adminId: adminId})
            })
            .then((response) => { return response.json() })
    }
}

export default Connection;