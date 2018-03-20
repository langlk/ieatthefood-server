const path = require('path');
const express = require('express');
const axios = require('axios');

require('dotenv').load();
const YELPKEY = process.env.REACT_APP_YELP_ACCESS_KEY;

const app = express();
const port = process.env.PORT || 5000;
// We'll want to make this an env variable so we can change when built for production.
const clientOrigin = "http://localhost:3000";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", clientOrigin);
  next();
});

app.get('/api/restaurant', (req, res, next) => {
  axios({
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/search',
    headers: {
      Authorization: `Bearer ${YELPKEY}`
    },
    params: {
      latitude: req.query.latitude,
      longitude: req.query.longitude
    }
  })
  .then((response) => {
    console.log(response.data.businesses);
    res.send({ restaurant: response.data.businesses[0] });
  })
  .catch((error) => {
    const message = `Yelp Request Failed: ${error.response.status} ${error.response.statusText}`;

    console.error(message);
    res.status(503).send({message: message});
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
