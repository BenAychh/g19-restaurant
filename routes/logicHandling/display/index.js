var queries = require('../queries');
module.exports = showIndexPage
function showIndexPage(res) {
  queries.getRestaurants().then(function(results) {
    var options = {
      'title': 'Fake Yelp!',
      'header': 'gTable',
      'stylesheet': '/stylesheets/index.css',
      'restaurants': results
    };
    res.render('index', options);
  });
}
