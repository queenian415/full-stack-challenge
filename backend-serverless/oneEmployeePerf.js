'use strict';

const dbconnect = require('./dbConnect');

module.exports.getEmployeePerf = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);
  
  const employeeId = requestBody.employeeId;

  dbconnect.connect((err, conn) => {
    if (err) console.log(err);
    else getPerf(conn, employeeId, (err, response) => {
      dbconnect.disconnect(conn);
      callback(err, response);
    });
  });
}

function getPerf(conn, employeeId, callback) {
  dbconnect.getPerformanceReview(conn, employeeId,
    (err, results) => {
      if (err) throw err;
      const response = {
        headers: {
           "Access-Control-Allow-Origin" : "*",
           "Content-Type": "application/json"
        },
        body: JSON.stringify(results)
      };
      callback(null, response);
    });
}
