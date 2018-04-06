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

#### `GET /api/restaurants`

##### Required Parameters:

* `latitude`
* `longitude`

##### Response:

_Returns `restaurant`, the first Yelp business search result. If there were no results, restaurant is `null`. Returns `503` if Yelp API call fails._
