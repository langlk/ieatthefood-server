# I Eat The Food API

## Setup Instructions

* Clone this repository.
* Create a .env file in the project root with the following content:
  ```
  REACT_APP_YELP_ACCESS_KEY="{YOUR YELP API KEY}"
  ```
* Run the following commands from the project root:

  ```
  yarn
  nodemon app.js
  ```
* The API will be available at `localhost:5000`

## API Endpoints

#### `GET /api/restaurant`

##### Required Parameters:

* `latitude`
* `longitude`

##### Optional Parameters:

* `extravagant`: Boolean, defaults to false. When true, price limit on restaurants is removed.
* `driving`: Boolean, defaults to false. Sets search radius to 1km if false, 10km if true.

##### Response:

_Returns `restaurant`, the first Yelp business search result. If there were no results, restaurant is `null`. Returns `503` if Yelp API call fails._
