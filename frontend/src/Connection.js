import 'whatwg-fetch';

const baseUrl = "https://0oxbz2l2h2.execute-api.us-east-1.amazonaws.com/dev/full-stack/";
class Connection {
    static getAllEmployees() {
        console.log('Connection: get all employees');
        fetch(baseUrl + 'all_employees')
            .then((response) => {
                console.log(response);
            });
    }
}

export default Connection;