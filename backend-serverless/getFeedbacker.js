'use strict';

const dbconnect = require('./dbConnect');

module.exports.getEmployeePerf = (event, context, callback) => {
  console.log(event);

  const requestBody = JSON.parse(event.body);
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
      console.log(response.body);
      callback(null, response);
    });
}
