var queries = require('../queries.js');
function addReview(req, res) {
  var restaurant = req.body.restaurantName;
  delete(req.body.restaurantName);
  queries.createReview(req.body)
  .then(function() {
    res.redirect('/restaurants/' + restaurant + '/');
  })
  .catch(function(err) {
    res.send('Something went wrong: ' + err);
  });
}
module.exports = addReview;
