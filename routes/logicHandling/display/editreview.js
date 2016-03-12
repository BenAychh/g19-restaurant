var queries = require('../queries.js');
module.exports = renderEdit;
function renderEdit(req, res) {
  var promises = [];
  promises.push(queries.getRestaurants(
    {id: req.params.restaurantID}));
  promises.push(queries.getReviews({ id: req.params.id }));
  Promise.all(promises).then(function(results) {
    var message = req.flash('message')[0];
    var restaurant = results[0][0];
    var params = {
      'title': 'Fake Yelp! - ' + restaurant.name,
      'header': restaurant.name,
      'stylesheet': '/stylesheets/editreview.css',
      'script': '/javascripts/editreview.js',
      'restaurant': restaurant,
      'review': results[1][0],
      user: req.user
    };
    if (message) {
      params['message'] = message;
    }
    res.render('editreview', params);
  });
}
