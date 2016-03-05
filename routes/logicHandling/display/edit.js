var queries = require('../queries.js');

module.exports = showEditPage;
function showEditPage(req, res) {
  console.log(req.params);
  var promises = [];
  promises.push(queries.getStates());
  promises.push(queries.getCuisines());
  promises.push(queries.getImages());
  promises.push(queries.getRestaurants({
    id: decodeURI(req.params.restaurantID)
  }));
  Promise.all(promises)
  .then(function(results) {
    var restaurant = results[3][0];
    console.log('rest: ', restaurant);
    var params = {
      title: 'Fake Yelp! - Edit Restaurant',
      header: 'Edit ' + restaurant.name,
      stylesheet: '/stylesheets/edit.css',
      script: '/javascripts/edit.js',
      stateOptions: queries.options(results[0], restaurant.state),
      cuisineOptions: queries.options(results[1], restaurant.cuisine_id),
      imageOptions: queries.options(results[2], restaurant.image),
      restaurant: restaurant
    };
    res.render('edit', params);
  })
  .catch(function(err) {
    res.send('Something went wrong: ' + err);
  });
}
