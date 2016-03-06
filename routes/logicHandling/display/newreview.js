var queries = require('../queries');
module.exports = showNewReviewPage;
function showNewReviewPage(req, res) {
  queries.getRestaurants({id: req.params.restaurantID})
  .then(function(results) {
    var restaurant = results[0];
    var params = {
      'title': 'Fake Yelp! - New Review',
      'header': 'New Review for ' + restaurant.name,
      'stylesheet': '/stylesheets/newreview.css',
      'restaurant': restaurant
    };
    if (req.formInfo) {
      params['formInfo'] = req.formInfo;
    }
    if (req.originalReview) {
      params['originalReview'] = req.originalReview;
    }
    res.render('newreview', params);
  });
}
