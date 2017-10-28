'use strict';

const dbconnect = require('./dbConnect');

module.exports.addEmployeePerf = (event, context, callback) => {
  console.log(event);

  const requestBody = JSON.parse(event.body);

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
    
    dbconnect.addPerformanceReview(conn, requestBody,
        (err, results) => {
            if (err) throw err;
            console.log(results);
            response.body = JSON.stringify(results);
            callback(null, response);
        });
}
