var queries = require('../queries.js');
function deleteRestaurant(req, res) {
  var restaurantID = req.params.restaurant;
  queries.deleteRestaurant(req.params.restaurant)
  .then(function() {
    res.redirect('/');
  })
  .catch(function(err) {
    res.send('Something went wrong: ' + err);
  });
}
module.exports = deleteRestaurant;
