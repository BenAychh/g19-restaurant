var express = require('express');
var router = express.Router();
var indexLogic = require('./logicHandling/index.js');
var showLogic = require('./logicHandling/show.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', indexLogic());
});
router.get('/show/:restaurant', function(req, res, next) {
  res.render('show', showLogic(req.params.restaurant));
});

module.exports = router;
