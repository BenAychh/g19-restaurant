var express = require('express');
var router = express.Router();
var passport = require('../lib/auth.js');

router.get('/', function(req, res, next) {
  res.send('Auth folder');
});

router.get('/github/', passport.authenticate('github', { scope: 'user:email'}));

router.get('/github/callback/', passport.authenticate('github', { scope: 'user:email', failureRedirect: '/' }), function(req, res, next) {
  console.log('user?: ', req.user);
  res.redirect('/');
});

module.exports = router;
