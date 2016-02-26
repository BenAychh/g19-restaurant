var restaurants = require('./restaurantsdb.js');
var constants = require('./constants.js');
var numberOfASyncFunctions = 2;
var params = {};
var res;
module.exports = function(res) {
  display(res);
};
function display(pRes) {
  res = pRes;
  numberOfASyncFunctions = 2;
  params.title = 'Fake Yelp! - New Restaurant';
  params.header = 'New Restaurant';
  params.stylesheet = '/stylesheets/new.css';
  params.script = '/javascripts/new.js';
  params.stateOptions = options(constants.states, '');
  constants.images(callback);
  constants.cuisines(callback);
}
function callback(results, key, value) {
  console.log(params.restaurant);
  numberOfASyncFunctions--;
  params[key] = options(results, '');
  if (numberOfASyncFunctions === 0) {
    res.render('new', params);
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
