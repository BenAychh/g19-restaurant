var queries = require('../queries.js');
function applyChanges(req, res) {
  queries.updateRestaurant(req.body, req.params.restaurantID)
  .then(function() {
    res.send('Changes Made');
  })
  .catch(function(err) {
    res.send('Error: ' + error);
  });
}
module.exports = applyChanges;
