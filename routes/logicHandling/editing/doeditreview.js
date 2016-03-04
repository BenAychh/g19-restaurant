var queries = require('../queries.js');
function applyChanges(req, res) {
  var reviewID = req.body.reviewID;
  delete(req.body.reviewID);
  queries.updateReview(req.body, reviewID)
  .then(function() {
    res.send('Changes Made');
  })
  .catch(function(err) {
    res.send('Error: ' + err);
  });
}
module.exports = applyChanges;
