var express = require('express');
var router = express.Router();
var showIndexPage = require('./logicHandling/display/index.js');
var showRestaurantPage = require('./logicHandling/display/show.js');
var showEditRestaurantPage = require('./logicHandling/display/edit.js');
var showNewRestaurantPage = require('./logicHandling/display/new.js');
var showNewReviewPage = require('./logicHandling/display/newreview.js');
var showEditReviewPage = require('./logicHandling/display/editreview.js');
var doEditRestaurant = require('./logicHandling/editing/doedit.js');
var doDeleteRestaurant = require('./logicHandling/deletion/dodelete.js');
var doCreateRestaurant = require('./logicHandling/creation/docreate.js');
var doCreateReview = require('./logicHandling/creation/docreatereview.js');
var doEditReview = require('./logicHandling/editing/doeditreview.js');
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
  showRestaurantPage(req, res);
});
router.get('/restaurants/:restaurant/edit', function(req, res, next) {
  showEditRestaurantPage(res, req);
});
router.get('/restaurants/:restaurant/reviews/:id/edit', function (req, res, next) {
  showEditReviewPage(req, res);
});
router.get('/restaurants/:restaurant/reviews', function(req, res, next) {
  showNewReviewPage(req, res);
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
