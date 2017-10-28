'use strict';

const dbconnect = require('./dbConnect');

module.exports.addFeedbacker = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);

  dbconnect.connect((err, conn) => {
    if (err) console.log(err);
    else addNewFeedbacker(conn, requestBody, (err, response) => {
      dbconnect.disconnect(conn);
      callback(err, response);
    });
  });
}

function addNewFeedbacker(conn, requestBody, callback) {
    const response = {
        headers: {
           "Access-Control-Allow-Origin" : "*",
           "Content-Type": "application/json"
        }
    };
    dbconnect.addFeedbacker(conn, requestBody.feedbackerId, requestBody.perfId,
        (err, results) => {
            if (err) throw err;
            console.log(results);
            response.body = JSON.stringify(results);
            callback(null, response);
        });
}

