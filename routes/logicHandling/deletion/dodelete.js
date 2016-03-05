var queries = require('../queries.js');
function deleteRestaurant(req, res) {
  queries.deleteRestaurant(req.params.restaurantID)
  .then(function() {
    res.redirect('/');
  })
  .catch(function(err) {
    res.send('Something went wrong: ' + err);
  });
}
module.exports = deleteRestaurant;
