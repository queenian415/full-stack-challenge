'use strict';

const dbconnect = require('./dbConnect');

module.exports.getAllEmployees = (event, context, callback) => {
  console.log(event);

  const requestBody = JSON.parse(event.body);
  const adminId = requestBody.adminId;

  dbconnect.connect((err, conn) => {
    if (err) throw err;
    getAllEmployees(conn, adminId, callback);
  });
};

function getAllEmployees(conn, adminId, callback) {
  dbconnect.getAllEmployees(conn, adminId,
    (err, results) => {
      if (err) throw err;
      response(results, callback);
    });
}

function response(results, callback) {
  const response = {
    headers: {
       "Access-Control-Allow-Origin" : "*",
       "Content-Type": "application/json"
    },
    body: JSON.stringify(results)
  };
  callback(null, response);
}
