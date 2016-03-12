var queries = require('../queries.js');

module.exports = function(res, info) {
  if (!info) {
    info = {
      userInput: {}
    };
  }
  var promises = [];
  promises.push(queries.getStates());
  promises.push(queries.getCuisines());
  promises.push(queries.getImages());
  Promise.all(promises)
  .then(function(results) {
    console.log('info: ' + info.userInput);
    var params = {
      title: 'Fake Yelp! - New Restaurant',
      header: 'New Restaurant',
      stylesheet: '/stylesheets/new.css',
      stateOptions: queries.options(results[0], info.userInput.state),
      cuisineOptions: queries.options(results[1], info.userInput.cuisine_id),
      imageOptions: queries.options(results[2], info.userInput.image),
      userInput: info.userInput,
      user: req,user
    };
    if (info.message) {
      params['message'] = info['message'];
    }
    res.render('new', params);
  })
  .catch(function(err) {
    res.send('Something went wrong (new.js): ' + err);
  });
};
