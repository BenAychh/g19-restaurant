var queries = require('../queries.js');
var validator = require('../validator.js');
var showNewRestaurantPage = require('../display/new.js');
function applyChanges(req, res) {
  validator.uniqueRestaurant({name: req.body.name})
  .then(function() {
    queries.createRestaurant(req.body)
    .then(function() {
      res.redirect('/restaurants/' + req.body.name + '/');
    })
    .catch(function(err) {
      res.send('Something went wrong (docreate.js): ' + err);
    });
  })
  .catch(function(err) {
    var params = {
      message: 'That restaurant already exists',
      userInput: req.body
    };
    showNewRestaurantPage(res, req);
  });
}
module.exports = applyChanges;
