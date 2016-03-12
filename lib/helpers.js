var knex = require('../db/knex.js');
function ensureAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.flash('message', {
      status: 'warning',
      text: 'Please login before accessing that page.'
    });
    var redirect = req.flash('redirect');
    if (redirect.length !== 0) {
      req.flash('redirect', redirect);
    } else {
      req.flash('redirect', req.originalUrl);
    }
    res.redirect('/auth/github');
  }
}
function ensureAdmin(req, res, next) {
  if (req.user.local.is_admin) {
    next();
  } else {
    req.flash('message', {
      status: 'warning',
      text: 'Please login with an admin account'
    });
    req.flash('redirect', req.originalUrl);
    res.redirect('/auth/');
  }
}
function checkAlreadyReviewed(req, res, next) {
  knex('reviews').where({
    user_id: req.user.local.id,
    restaurant_id: req.params.restaurantID
  }).then(function(results) {
    if(results.length === 0) {
      next();
    } else {
      req.flash('message');
      req.flash('message', {
        status: 'warning',
        text: 'You already created a review, would you like to edit it?'
      });
      res.redirect('/restaurants/' + results[0].restaurant_id + '/reviews/' + results[0].id + '/edit');
    }
  });
}
function checkReview(req, res, next) {
  console.log(req.user.local.id);
  knex('reviews').where({
    id: req.params.id,
  }).then(function(results) {
    if (req.user.local.id == results[0].user_id) {
      next();
    } else {
      req.flash('message', {
        status: 'warning',
        text: 'You are not authorized to edit that review.'
      });
      res.redirect('/restaurants/' + results[0].restaurant_id);
    }
  });
}
function loginRedirect(req, res, next) {
  if (req.user) {
    req.flash('message', {
      status: 'warning',
      text: 'You are already logged in'
    });
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  ensureAdmin: ensureAdmin,
  checkAlreadyReviewed: checkAlreadyReviewed,
  checkReview: checkReview,
  loginRedirect: loginRedirect
};
