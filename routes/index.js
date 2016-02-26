var express = require('express');
var router = express.Router();
var indexLogic = require('./logicHandling/index.js');
var showLogic = require('./logicHandling/show.js');
var editLogic = require('./logicHandling/edit.js');
var newLogic = require('./logicHandling/new.js');
var newReviewLogic = require('./logicHandling/newreview.js');
var doEdit = require('./logicHandling/doedit.js');
var doDelete = require('./logicHandling/dodelete.js');
var doCreate = require('./logicHandling/docreate.js');
var addReview = require('./logicHandling/docreatereview.js');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  indexLogic(res);
});
router.get('/restaurants/', function(req, res, next) {
  res.redirect('/');
});
router.get('/restaurants/new/', function(req, res, next) {
  newLogic(res);
});
router.get('/restaurants/:restaurant', function(req, res, next) {
  showLogic(res, req.params.restaurant);
});
router.get('/restaurants/:restaurant/edit', function(req, res, next) {
  editLogic(res, req.params.restaurant);
});
router.put('/restaurants/:restaurant/edit', function(req, res, next) {
  doEdit(req, res);
});
router.post('/restaurants/new', function(req, res, next) {
  doCreate(req, res);
});
router.get('/restaurants/:restaurant/delete', function(req, res, next) {
  doDelete(req, res);
});
router.get('/restaurants/:restaurant/reviews', function(req, res, next) {
  newReviewLogic(res, req.params.restaurant);
});
router.post('/restaurants/addreview/', function(req, res, next) {
  addReview(req, res);
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
