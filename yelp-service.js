const axios = require('axios');

require('dotenv').load();
const YELPKEY = process.env.REACT_APP_YELP_ACCESS_KEY;

const yelpDefaults = {
  sortBy: "rating",
  categories: "restaurants",
  openNow: true,
  price: "1, 2",
  radius: 1000
};

class YelpService {
  static async search(params) {
    try {
      let response = await axios({
        method: 'get',
        url: 'https://api.yelp.com/v3/businesses/search',
        headers: {
          Authorization: `Bearer ${YELPKEY}`
        },
        params: {
          latitude: params.latitude,
          longitude: params.longitude,
          categories: params.categories || yelpDefaults.categories,
          sort_by: params.sortBy || yelpDefaults.sortBy,
          open_now: params.openNow || yelpDefaults.openNow,
          price: params.price || yelpDefaults.price,
          radius: params.radius || yelpDefaults.radius
        }
      });
      return response.data.businesses.length > 0 ? response.data.businesses[0] : null;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  static async reviews(params) {
    try {
      let response = await axios({
        method: 'get',
        url: `https://api.yelp.com/v3/businesses/${params.businessID}/reviews`,
        headers: {
          Authorization: `Bearer ${YELPKEY}`
        }
      });
      return response.data.reviews.length > 0 ? response.data.reviews[0] : null;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  static handleErrors(error) {
    let errorMessage = "Yelp Request Failed\n";
    errorMessage += error.response ?
      `Status: ${error.response.status} ${error.response.statusText}` :
      `${error.message || error.toString()}`;

    throw errorMessage;
  }
}

module.exports = YelpService;
