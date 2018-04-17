'use strict';
const YelpService = require('./yelp-service.js');


module.exports.restaurant = (event, context, callback) => {
  const params = {
    latitude: event.queryStringParameters.latitude,
    longitude: event.queryStringParameters.longitude,
    categories: 'restaurants',
    price: event.queryStringParameters.extravagant ? '1, 2, 3, 4' : '1, 2',
    radius: event.queryStringParameters.driving ? 1000 * 10 : 1000
  };

  YelpService.search(params)
    .then((result) => {
      console.log(result);
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          restaurant: result
        }),
      };
      callback(null, response);
    })
    .catch((error) => {
      console.error(error.toString());
      const response = {
        statusCode: 503,
        body: JSON.stringify({
          message: error.toString()
        }),
      };
      callback(null, response);
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.review = (event, context, callback) => {
  const params = {
    businessID: event.queryStringParameters.businessID
  };

  YelpService.review(params)
    .then((result) => {
      console.log(result);
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          review: result
        }),
      };
      callback(null, response);
    })
    .catch((error) => {
      console.error(error.toString());
      const response = {
        statusCode: 503,
        body: JSON.stringify({
          message: error.toString()
        }),
      };
      callback(null, response);
    });
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
