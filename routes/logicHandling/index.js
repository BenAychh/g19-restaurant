var restaurants = require('./restaurantsdb.js');
module.exports = function(res) {
  restaurants(display, res);
};
function display(res, listOfRestaurants) {
  var options = {
    'title': 'Fake Yelp!',
    'header': 'gTable',
    'stylesheet': '/stylesheets/index.css',
    'restaurants': listOfRestaurants
  };
  res.render('index', options);
}
