// var pg = require('pg');
// var escape = require('pg-escape');
// var query = require('./databaseInterface.js');
// function applyChanges(req, res) {
//   var restaurantID = req.params.restaurant;
//   var queryString = 'DELETE from restaurants ' +
//     'where id=' + restaurantID;
//   query(queryString, '', function(error, results) {
//     if (error) {
//       console.error('Error: ', error);
//     } else {
//       var secondQueryString = 'DELETE from reviews ' +
//         'where restaurant_id=' + restaurantID;
//       query(secondQueryString, '', function(error, results) {
//         if (error) {
//           console.error('Error: ', error);
//         } else {
//           res.redirect('/');
//         }
//       });
//     }
//   });
// }
// module.exports = applyChanges;
