'use strict';

module.exports.getAllEmployees = (event, context, callback) => {
  console.log(event);
  const response = {
    statusCode: 200,
    headers: {
       "Access-Control-Allow-Origin" : "*",
       "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  const requestBody = JSON.parse(event.body);
  callback(null, response);
};
