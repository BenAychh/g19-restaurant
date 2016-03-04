var queries = require('../queries.js');
function applyChanges(req, res) {
  var restaurantID = req.params.restaurant;
  var formInfo = req.body;
  queries.updateRestaurant(req.body, req.params.restaurant)
  .then(function() {
    res.send('Changes Made');
  })
  .catch(function(err) {
    res.send('Error: ' + error);
  });
}
module.exports = applyChanges;
