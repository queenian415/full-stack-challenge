'use strict';

const dbconnect = require('./dbConnect');

module.exports.addEmployeePerf = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);
  
  dbconnect.connect((err, conn) => {
    if (err) console.log(err);
    else addPerf(conn, requestBody, (err, response) => {
      dbconnect.disconnect(conn);
      callback(err, response);
    });
  });
}

function addPerf(conn, requestBody, callback) {
    const response = {
        headers: {
           "Access-Control-Allow-Origin" : "*",
           "Content-Type": "application/json"
        }
    };
    if (requestBody.id == null) {
        dbconnect.insertPerformanceReview(conn, requestBody.employeeId, requestBody.content,
            (err, results) => {
                if (err) throw err;
                console.log(results);
                response.body = JSON.stringify(results);
                callback(null, response);
            });
    } else {
        dbconnect.updatePerformanceReview(conn, requestBody.id, requestBody.content,
            (err, results) => {
                if (err) throw err;
                console.log(results);
                response.body = JSON.stringify(results);
                callback(null, response);
            });
        }
}
