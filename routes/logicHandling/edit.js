var restaurants = require('./restaurantsdb.js');
var constants = require('./constants.js');
module.exports = function(res, name) {
  var parameters = {name: decodeURI(name)};
  restaurants(display, res, parameters);
};
function display(res, listOfRestaurants) {
  var restaurant = listOfRestaurants[0];
  var params = {
    title: 'Fake Yelp! - ' + restaurant.name,
    header: 'Editing: ' + restaurant.name,
    stylesheet: '/stylesheets/new.css',
    restaurant: restaurant,
    stateOptions: options('states', restaurant.state),
    cuisineOptions: options('cuisines', restaurant.cuisine)
  };
  res.render('edit', params);
}
function options(type, matcher) {
  console.log(type, matcher);
  var optionsArray = [];
  var constantsArray = constants[type];
  var keys = Object.keys(constantsArray);
  keys.forEach(function(key) {
    if (matcher === key) {
      optionsArray.push('<option selected value="' + key + '">' +
        constantsArray[key] + '</option>');
    } else {
      optionsArray.push('<option value="' + key + '">' +
        constantsArray[key] + '</option>');
    }
  });
  return optionsArray;
}
