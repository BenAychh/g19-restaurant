var queries = require('../queries.js');
function addReview(req, res) {
  var restaurantID = req.body.restaurant_id;
  queries.createReview(req.body)
  .then(function() {
    res.redirect('/restaurants/' + restaurantID + '/');
  })
  .catch(function(err) {
    res.send('Something went wrong: ' + err);
  });
}
module.exports = addReview;
