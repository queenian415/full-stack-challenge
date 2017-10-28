'use strict';

const dbconnect = require('./dbConnect');

module.exports.getAllEmployees = (event, context, callback) => {
  console.log(event);
  context.callbackWaitsForEmptyEventLoop = false;

  const requestBody = JSON.parse(event.body);
  const adminId = requestBody.adminId;

  dbconnect.connect((err, conn) => {
    if (err) console.log(err);
    else getAll(conn, adminId, (err, response) => {
      dbconnect.disconnect(conn);
      callback(err, response);
    });
  });
}

function getAll(conn, adminId, callback) {
  dbconnect.getAllEmployees(conn, adminId,
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
