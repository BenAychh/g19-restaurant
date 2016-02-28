var restaurants = require('./restaurantsdb.js');
var reviews = require('./reviewdb.js');
var res = null;
var listOfRestaurants;
module.exports = function(res, name) {
  var parameters = {name: decodeURI(name)};
  restaurants(startReviewGrabbing, res, parameters);
};
function startReviewGrabbing(res, pListOfRestaurants) {
  listOfRestaurants = pListOfRestaurants;
  var parameters = {
    restaurant_id: listOfRestaurants[0].id
  };
  reviews(display, res, parameters);
}
function display(res, reviews) {
  var name = listOfRestaurants[0].name;
  var params = {
    'title': 'Fake Yelp! - ' + name,
    'header': name,
    'stylesheet': '/stylesheets/show.css',
    'script': '/javascripts/show.js',
    'restaurant': listOfRestaurants[0],
    'reviews': reviews
  };
  res.render('show', params);
}
