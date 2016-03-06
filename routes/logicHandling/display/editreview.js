var queries = require('../queries.js');
module.exports = renderEdit;
function renderEdit(req, res) {
  var promises = [];
  promises.push(queries.getRestaurants(
    {id: req.params.restaurantID}));
  promises.push(queries.getReviews({ id: req.params.id }));
  Promise.all(promises).then(function(results) {
    var restaurant = results[0][0];
    console.log(results[1]);
    var params = {
      'title': 'Fake Yelp! - ' + restaurant.name,
      'header': restaurant.name,
      'stylesheet': '/stylesheets/editreview.css',
      'script': '/javascripts/editreview.js',
      'restaurant': restaurant,
      'review': results[1][0]
    };
    if (req.formInfo) {
      params.review = req.formInfo;
      params['originalReview'] = results[1][0].text;

    }
    res.render('editreview', params);
  });
}
