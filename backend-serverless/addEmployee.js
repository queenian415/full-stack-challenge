'use strict';

const dbconnect = require('./dbConnect');

module.exports.addEmployee = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);
  
  dbconnect.connect((err, conn) => {
    if (err) console.log(err);
    else addNewEmployee(conn, requestBody, (err, response) => {
      dbconnect.disconnect(conn);
      callback(err, response);
    });
  });
}

function addNewEmployee(conn, obj, callback) {
  dbconnect.addEmployee(conn, obj,
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
