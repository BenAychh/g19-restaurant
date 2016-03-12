var queries = require('../queries.js');
var validator = require('../validator.js');
var showEditReviewPage = require('../display/editreview.js');
function addReview(req, res) {
  var restaurantID = req.body.restaurant_id;
  validator.uniqueReviewer({
    restaurant_id: restaurantID,
    'reviews.user_id': req.body.user_id
  })
  .then(function() {
    var restaurantID = req.body.restaurant_id;
    queries.createReview(req.body)
    .then(function() {
      res.redirect('/restaurants/' + restaurantID + '/');
    })
    .catch(function(err) {
      res.send('Something went wrong (docreatereview.js #1): ' + err);
    });
  })
  .catch(function(err) {
    queries.getReviews({
      restaurant_id: restaurantID,
      'user_id': req.body.user_id
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
      res.send('Something went wrong (docreatereview.js #2): ' + err);
    });
  });

}
module.exports = addReview;
