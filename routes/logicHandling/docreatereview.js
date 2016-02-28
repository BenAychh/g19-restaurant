var query = require('./databaseInterface.js');
var escape = require('pg-escape');
var res;
var restaurant;
function addReview(req, pRes) {
  console.log(req.body);
  res = pRes;
  restaurant = req.body.restaurantName;
  var queryString =
    escape('INSERT INTO reviews (text, created_date, modified_date, ' +
    'restaurant_id, rating) values (%L, now(), now(), '
    + req.body.restaurantID + ', ' + req.body.rating + ')',
    req.body.review);
  console.log(queryString);
  query(queryString, '', finalRender);
}
function finalRender(err, results) {
  if (err) {
    console.log(err);
  }
  res.redirect('/restaurants/' + restaurant);
}
module.exports = addReview;
