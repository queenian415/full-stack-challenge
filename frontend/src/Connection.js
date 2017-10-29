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

    static getEmployeePerf(employeeId) {
        console.log('Connection: get employee performance');
        return fetch(baseUrl + 'one_employees_perf', {
                method: 'POST',
                body: JSON.stringify({employeeId: employeeId})
            })
            .then((response) => { 
                return response.json() })
    }

    static addEmployeePerf(perfid, employeeId, content) {
        console.log('Connection: add employee performance');
        return fetch(baseUrl + 'add_employees_perf', {
                method: 'POST',
                body: JSON.stringify({
                    id: perfid,
                    employeeId: employeeId,
                    content: content
                })
            })
            .then((response) => { 
                return response.json() })
    }

    static addFeedbacker(id, feedbackerId, empId) {
        console.log('Connection: add feedbacker ' + feedbackerId + ' to perf ' + id);
        return fetch(baseUrl + 'add_feedbacker', {
            method: 'POST',
            body: JSON.stringify({
                perfId: id,
                feedbackerId: feedbackerId,
                employeeId: empId
            })
        })
        .then()
    }

    static removeFeedbacker(id, feedbackerId) {
        console.log('Connection: remove feedbacker ' + feedbackerId + ' to perf ' + id);
        return fetch(baseUrl + 'remove_feedbacker', {
            method: 'POST',
            body: JSON.stringify({
                perfId: id,
                feedbackerId: feedbackerId
            })
        })
        .then()
    }

    static getFeedbackers(id) {
        console.log('Connection: get feedbackers to perf ' + id);
        return fetch(baseUrl + 'get_feedbackers', {
            method: 'POST',
            body: JSON.stringify({
                perfId: id,
            })
        })
        .then((response) => { 
            return response.json() })
    }

    static getPerfsForFeedback(feedbackerId) {
        console.log('Connection: get perf for employee ' + feedbackerId);
        return fetch(baseUrl + 'get_perfs_for_feedback', {
            method: 'POST',
            body: JSON.stringify({
                feedbackerId: feedbackerId,
            })
        })
        .then((response) => { 
            return response.json() })
    }

    static addFeedback(obj) {
        console.log('Connection: add feedback for performance ' + obj.perfId);
        return fetch(baseUrl + 'add_feedback', {
            method: 'POST',
            body: JSON.stringify(obj)
        })
        .then((response) => { 
            return response.json() })
    }

    static addEmployee(obj) {
        console.log('Connection: add employee');
        return fetch(baseUrl + 'add_employee', {
            method: 'POST',
            body: JSON.stringify(obj)
        })
        .then((response) => { 
            return response.json() })
    }
}

export default Connection;