'use strict';

const dbconnect = require('./dbConnect');

module.exports.getPerfsForFeedback = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);
  
  const feedbackerId = requestBody.feedbackerId;

  dbconnect.connect((err, conn) => {
    if (err) console.log(err);
    else getPerfs(conn, feedbackerId, (err, response) => {
      dbconnect.disconnect(conn);
      callback(err, response);
    });
  });
}

function getPerfs(conn, feedbackerId, callback) {
  dbconnect.getPerfsForFeedback(conn, feedbackerId,
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
