var queries = require('../queries.js');
var res = null;
var listOfRestaurants;
module.exports = function(req, res) {
  var promises = [];
  promises.push(queries.getRestaurants({id: req.params.restaurantID}));
  promises.push(queries.getReviews({restaurant_id: req.params.restaurantID}));
  if (req.user) {
    promises.push(queries.getReviews({'reviews.user_id': req.user.local.id, restaurant_id: req.params.restaurantID}));
  }
  Promise.all(promises)
  .then(function(results) {
    var restaurant = results[0][0];
    var reviews = results[1];
    for (var i = 0; i < reviews.length; i++) {
      reviews[i].text = reviews[i].text.split('\n').join('<br>').split('\r')
        .join('<br>');
    }
    var params = {
      title: 'Fake Yelp! - ' + restaurant.name,
      header: restaurant.name,
      stylesheet: '/stylesheets/show.css',
      script: '/javascripts/show.js',
      restaurant: restaurant,
      reviews: reviews,
      user: req.user,
      canCreateReview: true,
      redirect: req.originalUrl
    };
    if (results[2]) {
      if (results[2].length !== 0)
      params.canCreateReview = false;
    }
    res.render('show', params);
  })
  .catch(function(err) {
    res.send('Something went wrong (show.js): ' + err);
  });
};
