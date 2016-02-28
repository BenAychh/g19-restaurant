var restaurants = require('./restaurantsdb.js');
var reviews = require('./reviewdb.js');
var res = null;
var listOfRestaurants = null;
var reviewID = null;
module.exports = renderEdit;
function renderEdit(req, res) {
  reviewID = req.params.id;
  var parameters = {name: decodeURI(req.params.restaurant)};
  restaurants(startReviewGrabbing, res, parameters);
}
function startReviewGrabbing(res, pListOfRestaurants) {
  listOfRestaurants = pListOfRestaurants;
  var parameters = {
    id: reviewID
  };
  reviews(display, res, parameters);
}
function display(res, reviews) {
  console.log('reviews: ', reviews);
  console.log(listOfRestaurants[0]);
  var name = listOfRestaurants[0].name;
  var params = {
    'title': 'Fake Yelp! - ' + name,
    'header': name,
    'stylesheet': '/stylesheets/editreview.css',
    'script': '/javascripts/editreview.js',
    'restaurant': listOfRestaurants[0],
    'review': reviews[0]
  };
  res.render('editreview', params);
}
