var knex = require('../../db/knex.js');
var escape = require('pg-escape');
var multiline = require('multiline');
var fs = require('fs');
var path = require('path');

module.exports = {
  getRestaurants: function (parameters) {
    var integerKeys = ['id', 'cuisine_id'];
    var queryString = multiline.stripIndent(function() {/*
      select restaurants.name, image, city, state, avg(reviews.rating) as rating, description, restaurants.id, cuisine_id, cuisines.name as cuisine_name
        from restaurants
        inner join cuisines on restaurants.cuisine_id = cuisines.id
        left join reviews on restaurants.id = reviews.restaurant_id
    */});
    queryString = queryString.replace(/\n/g, '').replace(/\t/g, ' ');
    var first = true;
    if (parameters) {
      var parameterKeys = Object.keys(parameters);
      parameterKeys.forEach(function(key) {
        if (first) {
          queryString += ' WHERE ';
          first = false;
        } else {
          queryString += ' AND ';
        }
        if (integerKeys.indexOf(key) === -1){
          queryString += escape('lower(restaurants.%I) like lower(%L)',
              key, parameters[key]);
        } else {
          queryString += escape('restaurants.%I = %L', key, parameters[key]);
        }
      });
    }
    queryString +=
    ' group by restaurants.name, image, city, state, description, ' +
        'restaurants.id, cuisine_id, cuisines.name';
    return knex.raw(queryString).then(function(results) {
      return results.rows;
    });
  },

  getReviews: function(parameters) {
    return knex('reviews').select(knex.raw('reviews.id, text, created_date, modified_date, rating, reviews.user_id, username'))
    .leftJoin(knex.raw('github_users on (github_users.user_id = reviews.user_id)'))
    .where(parameters);
  },

  getCuisines: function() {
    return knex('cuisines').select().then(function(cuisines) {
      var tempObj = {};
      cuisines.forEach(function(cuisine) {
        tempObj[cuisine.id] = cuisine.name;
      });
      return tempObj;
    });
  },
  createRestaurant: function(parameters) {
    return knex('restaurants').insert(parameters);
  },
  createReview: function(parameters) {
    if (parameters.reviewer_name) {
      parameters.reviewer_name = parameters.reviewer_name.toLowerCase();
    }
    return knex('reviews').insert(parameters);
  },
  updateRestaurant: function(parameters, restaurantID) {
    return knex('restaurants').where({id: restaurantID}).update(parameters);
  },
  updateReview: function(parameters, reviewID) {
    return knex('reviews').where({id: reviewID}).update(parameters);
  },
  deleteRestaurant: function(restaurantID) {
    return knex('restaurants').where({id: restaurantID}).del();
  },
  switchAdmin: function(id) {
    return knex('users').where({id: id}).select('is_admin')
      .then(function(results) {
        var newAdminStatus = !results[0].is_admin;
        return knex('users').where({id: id}).update({is_admin: newAdminStatus})
        .then(function() {
          return newAdminStatus;
        });
      });
  },
  getImages: function() {
    return new Promise(function(resolve, reject) {
      fs.readdir(path.join(__dirname, '../../public/images/restaurants'),
        function(error, list) {
          if (error) {
            reject(error);
          } else {
            var images = {};
            list.forEach(function(file) {
              images['/images/restaurants/' + file] = file;
            });
            resolve(images);
          }
        }
      );
    });
  },

  getStates: function() {
    return new Promise(function(resolve, reject) {
      resolve({
        AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
        CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
        DC: 'District Of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
        ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
        KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
        MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
        MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
        NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
        NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
        OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island',
        SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas',
        UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
        WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming'
      });
    });
  },
  options: function(constantsArray, matcher) {
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
  },
};
