var queries = require('../queries.js');
var validator = require('../validator.js');
var showEditRestaurantPage = require('../display/edit.js');
function applyChanges(req, res) {
  validator.uniqueRestaurant({name: req.body.name}, req.params.restaurantID)
  .then(function() {
    queries.updateRestaurant(req.body, req.params.restaurantID)
    .then(function() {
      res.send('Changes Made');
    })
    .catch(function(err) {
      res.send('Error: ' + error);
    });
  })
  .catch(function(err) {
    res.send('Error: ' + err);
  });

}
module.exports = applyChanges;
