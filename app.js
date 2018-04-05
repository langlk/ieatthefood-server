const path = require('path');
const express = require('express');
const YelpService = require('./yelp-service.js');

const app = express();
const port = process.env.PORT || 5000;
// We'll want to make this an env variable so we can change when built for production.
const clientOrigin = "http://localhost:3000";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", clientOrigin);
  next();
});

app.get('/api/restaurant', (req, res, next) => {
  const params = {
    latitude: req.query.latitude,
    longitude: req.query.longitude
  };

  YelpService.search(params)
    .then((response) => {
      console.log(response);
      res.send({ restaurant: response });
    })
    .catch((error) => {
      console.error(error.toString());
      res.status(503).send({message: error.toString()});
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
