var bcrypt = require('bcrypt');
function ensureAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}
function ensureAdmin(req, res, next) {
  if (req.user.admin) {
    next();
  } else {
    req.flash('message', {
      status: 'warning',
      text: 'Please login with an admin account'
    });
    res.redirect('/login');
  }
}

function loginRedirect(req, res, next) {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
}

function hashPromise(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, 8, function(err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function checkPassword(password, hashed) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, hashed, function(error, result) {
      if (error) {
        reject('Passwords do not match');
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  loginRedirect: loginRedirect,
  hashPromise: hashPromise,
  checkPassword: checkPassword
};
