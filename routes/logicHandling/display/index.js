var queries = require('../queries');
module.exports = showIndexPage;
function showIndexPage(req, res) {
  queries.getRestaurants().then(function(results) {
    var options = {
      title: 'Fake Yelp!',
      header: 'gTable',
      stylesheet: '/stylesheets/index.css',
      restaurants: results,
      user: req.user
    };
    if (req.user) {
      options.header = 'gTable - ' + req.user.github.username;
    }
    res.render('index', options);
  });
}
