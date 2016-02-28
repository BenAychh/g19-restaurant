var restaurants = require('./restaurantsdb.js');
var reviews = require('./reviewdb.js');
var res = null;
module.exports = function(res, name) {
  var parameters = {name: decodeURI(name)};
  restaurants(startReviewGrabbing, res, parameters);
};
function startReviewGrabbing(res, listOfRestaurants) {
  reviews(res, listOfRestaurants, display);
}
function display(res, listOfRestaurants, reviews) {
  var name = listOfRestaurants[0].name;
  var params = {
    'title': 'Fake Yelp! - ' + name,
    'header': name,
    'stylesheet': '/stylesheets/show.css',
    'script': '/javascripts/show.js',
    'restaurant': listOfRestaurants[0],
    'reviews': reviews.rows
  };
  res.render('show', params);
}
