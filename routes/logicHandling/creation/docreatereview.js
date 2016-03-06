var queries = require('../queries.js');
var validator = require('../validator.js');
var showEditReviewPage = require('../display/editreview.js');
function addReview(req, res) {
  var restaurantID = req.body.restaurant_id;
  validator.uniqueReviewer({
    restaurant_id: restaurantID,
    'reviewer_name': req.body.reviewer_name
  })
  .then(function() {
    var restaurantID = req.body.restaurant_id;
    queries.createReview(req.body)
    .then(function() {
      res.redirect('/restaurants/' + restaurantID + '/');
    })
    .catch(function(err) {
      res.send('Something went wrong1: ' + err);
    });
  })
  .catch(function(err) {
    queries.getReviews({
      restaurant_id: restaurantID,
      'reviewer_name': req.body.reviewer_name.toLowerCase()
    })
    .then(function(data) {
      console.log(data);
      req.body.id = data[0].id;
      var params = {
        params: {
          restaurantID: restaurantID,
          id: data[0].id
        },
        formInfo: req.body,
      };
      showEditReviewPage(params, res);
    }).
    catch(function(err) {
      res.send('Something went wrong: ' + err);
    });
  });

}
module.exports = addReview;
