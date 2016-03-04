var queries = require('../queries.js');

module.exports = function(res) {
  var promises = [];
  promises.push(queries.getStates());
  promises.push(queries.getCuisines());
  promises.push(queries.getImages());
  Promise.all(promises)
  .then(function(results) {
    var params = {
      title: 'Fake Yelp! - New Restaurant',
      header: 'New Restaurant',
      stylesheet: '/stylesheets/new.css',
      stateOptions: queries.options(results[0], ''),
      cuisineOptions: queries.options(results[1], ''),
      imageOptions: queries.options(results[2], '')
    };
    res.render('new', params);
  })
  .catch(function(err) {
    res.send('Something went wrong: ' + err);
  });
};
