'use strict';

const dbconnect = require('./dbConnect');

module.exports.getFeedbackers = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);
  
  const perfId = requestBody.perfId;

  dbconnect.connect((err, conn) => {
    if (err) console.log(err);
    else getAllFeedbackers(conn, perfId, (err, response) => {
      dbconnect.disconnect(conn);
      callback(err, response);
    });
  });
}

function getAllFeedbackers(conn, perfId, callback) {
  dbconnect.getFeedbakcers(conn, perfId,
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
