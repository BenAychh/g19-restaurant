var queries = require('../queries.js');
var validator = require('../validator.js');
function applyChanges(req, res) {
  validator.uniqueRestaurant({name: req.body.name})
  .then(function() {
    queries.createRestaurant(req.body)
    .then(function() {
      res.redirect('/restaurants/' + req.body.name + '/');
    })
    .catch(function(err) {
      res.send('Something went wrong: ' + err);
    });
  })
  .catch(function(err) {
    res.send(err);
  });
}
module.exports = applyChanges;
