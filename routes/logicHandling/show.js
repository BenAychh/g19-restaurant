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
  reviews = reviews.map(function(review) {
    var tempObj = {};
    tempObj.text = review.text.split('\n').join('<br>').split('\r').join('<br>');
    tempObj.created_date = review.created_date;
    tempObj.modified_date = review.modified_date;
    tempObj.restaurant_id = review.restaurant_id;
    tempObj.rating = review.rating;
    tempObj.id = review.id;
    return tempObj;
  });
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
