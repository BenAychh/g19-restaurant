var restaurants = require('./restaurantsdb.js');
module.exports = function(res, name) {
  var parameters = {name: decodeURI(name)};
  restaurants(display, res, parameters);
};
function display(res, listOfRestaurants) {
  var name = listOfRestaurants[0].name;
  var params = {
    'title': 'Fake Yelp! - New Review',
    'header': 'New Review for ' + name,
    'stylesheet': '/stylesheets/newreview.css',
    'restaurant': listOfRestaurants[0]
  };
  res.render('newreview', params);
}
