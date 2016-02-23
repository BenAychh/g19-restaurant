var express = require('express');
var router = express.Router();
var indexLogic = require('./logicHandling/index.js');
var showLogic = require('./logicHandling/show.js');
var editLogic = require('./logicHandling/edit.js');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  indexLogic(res);
});
router.get('/restaurants/', function(req, res, next) {
  res.redirect('/');
});
router.get('/restaurants/new/', function(req, res, next) {
  res.sendFile('new.html', { root: path.join(__dirname, '../public/') });
});
router.get('/restaurants/:restaurant', function(req, res, next) {
  showLogic(res, req.params.restaurant);
});
router.get('/restaurants/:restaurant/edit', function(req, res, next) {
  res.render('edit', editLogic(req.params.restaurant));
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
