var queries = require('../queries.js');
module.exports = renderEdit;
function renderEdit(req, res) {
  var promises = [];
  promises.push(queries.getRestaurants(
    {name: decodeURI(req.params.restaurant)}));
  promises.push(queries.getReviews({ id: req.params.id }));
  promises.all(promises).then(function(results) {
    var restaurant = results[0][0];
    var params = {
      'title': 'Fake Yelp! - ' + restaurant.name,
      'header': restaurant.name,
      'stylesheet': '/stylesheets/editreview.css',
      'script': '/javascripts/editreview.js',
      'restaurant': restaurant,
      'review': results[1]
    };
  });
}
