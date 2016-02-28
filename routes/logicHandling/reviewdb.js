var query = require('./databaseInterface.js').query;
var escape = require('pg-escape');
function getReviews(res, listOfRestaurants, callback) {
  var restaurantID = listOfRestaurants[0].id;
  var queryString = 'select * from reviews where restaurant_id = ' +
    restaurantID;
  console.log(queryString);
  query(queryString, '', function(err, results) {
    callback(res, listOfRestaurants, results);
  });
}
module.exports = getReviews;
