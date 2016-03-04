var queries = require('../queries');
module.exports = showNewReviewPage;
function showNewReviewPage(req, res) {
  queries.getRestaurants({name: decodeURI(req.params.restaurant)})
  .then(function(results) {
    var restaurant = results[0];
    var params = {
      'title': 'Fake Yelp! - New Review',
      'header': 'New Review for ' + restaurant.name,
      'stylesheet': '/stylesheets/newreview.css',
      'restaurant': restaurant
    };
    res.render('newreview', params);
  });
}
