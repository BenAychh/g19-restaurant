var queries = require('../queries.js');
var res = null;
var listOfRestaurants;
module.exports = function(req, res) {
  var parameters = {name: decodeURI(req.params.restaurant)};
  queries.getRestaurants(parameters)
  .then(function(listOfRestaurants) {
    var restaurant = listOfRestaurants[0];
    queries.getReviews({restaurant_id: restaurant.id})
    .then(function(listOfReviews) {
      reviews = listOfReviews.map(function(review) {
        var tempObj = {};
        tempObj.text =
          review.text.split('\n').join('<br>').split('\r').join('<br>');
        tempObj.created_date = review.created_date;
        tempObj.modified_date = review.modified_date;
        tempObj.restaurant_id = review.restaurant_id;
        tempObj.rating = review.rating;
        tempObj.id = review.id;
        return tempObj;
      });
      var params = {
        'title': 'Fake Yelp! - ' + restaurant.name,
        'header': restaurant.name,
        'stylesheet': '/stylesheets/show.css',
        'script': '/javascripts/show.js',
        'restaurant': restaurant,
        'reviews': reviews
      };
      res.render('show', params);
    })
    .catch(function(err) {
      res.send('Something went wrong: ' + err);
    });
  });
};
