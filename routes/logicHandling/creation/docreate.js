var queries = require('../queries.js');
function applyChanges(req, res) {
  queries.createRestaurant(req.body)
  .then(function() {
    res.redirect('/restaurants/' + req.body.name + '/');
  })
  .catch(function(err) {
    res.send('Something went wrong: ' + err);
  });
}
module.exports = applyChanges;
