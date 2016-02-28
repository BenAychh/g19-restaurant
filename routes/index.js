var express = require('express');
var router = express.Router();
var showIndexPage = require('./logicHandling/index.js');
var showRestaurantPage = require('./logicHandling/show.js');
var showEditRestaurantPage = require('./logicHandling/edit.js');
var showNewRestaurantPage = require('./logicHandling/new.js');
var showNewReviewPage = require('./logicHandling/newreview.js');
var showEditReviewPage = require('./logicHandling/editreview.js');
var doEditRestaurant = require('./logicHandling/doedit.js');
var doDeleteRestaurant = require('./logicHandling/dodelete.js');
var doCreateRestaurant = require('./logicHandling/docreate.js');
var doCreateReview = require('./logicHandling/docreatereview.js');
var doEditReview = require('./logicHandling/doeditreview.js');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  showIndexPage(res);
});
router.get('/restaurants/', function(req, res, next) {
  res.redirect('/');
});
router.get('/restaurants/new/', function(req, res, next) {
  showNewRestaurantPage(res);
});
router.get('/restaurants/:restaurant', function(req, res, next) {
  showRestaurantPage(res, req.params.restaurant);
});
router.get('/restaurants/:restaurant/edit', function(req, res, next) {
  showEditRestaurantPage(res, req.params.restaurant);
});
router.get('/restaurants/:restaurant/reviews/:id/edit', function (req, res, next) {
  showEditReviewPage(req, res);
});
router.get('/restaurants/:restaurant/reviews', function(req, res, next) {
  showNewReviewPage(res, req.params.restaurant);
});
router.put('/restaurants/:restaurant/edit', function(req, res, next) {
  doEditRestaurant(req, res);
});
router.post('/restaurants/new', function(req, res, next) {
  doCreateRestaurant(req, res);
});
router.get('/restaurants/:restaurant/delete', function(req, res, next) {
  doDeleteRestaurant(req, res);
});
router.post('/restaurants/addreview/', function(req, res, next) {
  doCreateReview(req, res);
});
router.put('/restaurants/editreview/', function(req, res, next) {
  doEditReview(req, res);
});
router.get('/*', function(req, res, next) {
  var imageIndex = req.path.indexOf('/images/');
  if (imageIndex !== -1) {
    var imageName = req.path.substring(imageIndex + 8);
    res.sendFile(imageName, { root: path.join(__dirname, '../public/images/') });
  } else {
    res.status(404).send('Not Found');
  }
});

module.exports = router;
