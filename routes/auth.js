var express = require('express');
var router = express.Router();
var passport = require('../lib/auth.js');
var queries = require('./logicHandling/queries');
router.get('/', function(req, res, next) {
  res.send('Auth folder');
});

router.get('/github/', function(req, res, next) {
  if(req.query.redirect) {
    req.flash('redirect', req.query.redirect);
  }
  passport.authenticate('github')(req, res, next);
});

router.get('/github/callback/', passport.authenticate('github', { failureRedirect: '/'}), function(req, res, next) {
  var redirect = req.flash('redirect');
  console.log('redirect: ', redirect);
  if (redirect) {
    res.redirect(redirect);
  } else {
    res.redirect('/');
  }
});
router.get('/logout', function(req, res, next) {
  req.logOut();
  if (req.query.redirect) {
    res.redirect(req.query.redirect);
  } else {
    res.redirect('/');
  }

});
if (!process.env.NODE_ENV) {
  router.get('/switchAdmin', function(req, res, next) {
    queries.switchAdmin(req.user.local.id)
    .then(function(adminStatus) {
      res.send('Admin: ' + adminStatus + '<br><br><a href="javascript:window.location.href=window.location.href">Change</a>');
    });
  });
}

module.exports = router;
