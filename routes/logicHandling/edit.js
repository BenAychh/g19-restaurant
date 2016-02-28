var restaurants = require('./restaurantsdb.js');
var constants = require('./constants.js');
var numberOfASyncFunctions = 2;
var params = {};
var res;
module.exports = function(res, name) {
  params = {};
  var parameters = {name: decodeURI(name)};
  restaurants(display, res, parameters);
};
function display(pRes, listOfRestaurants) {
  res = pRes;
  numberOfASyncFunctions = 2;
  var restaurant = listOfRestaurants[0];
  params.title = 'Fake Yelp! - ' + restaurant.name;
  params.header = 'Editing: ' + restaurant.name;
  params.stylesheet = '/stylesheets/edit.css';
  params.script = '/javascripts/edit.js';
  params.restaurant = restaurant;
  params.stateOptions = options(constants.states, restaurant.state);
  constants.images(callback);
  constants.cuisines(callback);
}
function callback(results, key, value) {
  numberOfASyncFunctions--;
  params[key] = options(results, params.restaurant[value]);
  if (numberOfASyncFunctions === 0) {
    res.render('edit', params);
  }
}
function options(constantsArray, matcher) {
  var optionsArray = [];
  var keys = Object.keys(constantsArray);
  keys.forEach(function(key) {
    if (matcher == key) {
      optionsArray.push('<option selected value="' + key + '">' +
        constantsArray[key] + '</option>');
    } else {
      optionsArray.push('<option value="' + key + '">' +
        constantsArray[key] + '</option>');
    }
  });
  return optionsArray;
}
