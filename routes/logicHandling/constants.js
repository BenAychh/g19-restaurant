var fs = require('fs');
var path = require('path');
var pg = require('pg');
var query = require('./databaseInterface');
module.exports = {
  states: {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
    CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
    DC: 'District Of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
    ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
    KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
    MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
    NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
    NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
    OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
    VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin',
    WY: 'Wyoming'
  },
  cuisines: getCuisines,
  images: getImages
};
function getCuisines(callback) {
  var queryString = 'select * from cuisines';
  query(queryString, '', function(error, results) {
    var resultsObject = {};
    results.rows.forEach(function(row) {
      resultsObject[row.id] = row.name;
    });
    callback(resultsObject, 'cuisineOptions', 'cuisine_id');
  });
}
function getImages(callback) {
  fs.readdir(path.join(__dirname, '../../public/images/restaurants'), function(error, list) {
    var images = {};
    list.forEach(function(file) {
      images['/images/restaurants/' + file] = file;
    });
    callback(images, 'imageOptions', 'image');
  });
}
