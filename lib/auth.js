var passport = require('passport');
var GitHubStrategy = require('passport-github2');
// var LocalStrategy = require('passport-local');
var knex = require('../db/knex.js');
var helpers = require('./helpers.js');

function Users() {
  return knex('users');
}
function GitHubUsers() {
  return knex('github_users');
}

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    GitHubUsers().where({
      github_id: profile.id
    })
    .then(function(results) {
      if (results.length !== 0) {
        Users().where({
          id: results[0].user_id
        }).then(function(user) {
          return done(null, user[0].id);
        });
      } else {
        console.log('here1!');
        Users().insert({
          email: 'null'
        }).returning('*')
        .then(function(user) {
          if (user) {
            var params = {
              github_id: profile.id,
              display_name: profile.displayName,
              profile_url: profile.profileUrl,
              username: profile.username,
              user_id: user[0].id
            };
            console.log(params);
            GitHubUsers().insert(params)
            .then(function() {
              return done(null, user[0].id);
            })
            .catch(function(err) {

            });
          } else {
            console.log('fail!!');
          }
        });
      }
    });
  }
));


passport.serializeUser(function(id, done) {
  console.log('trying to serialize ' + id);
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  var userObject = {};
  Users().where({id: id}).select().
  then(function(results) {
    if (results.length !== 0) {
      userObject['local'] = results[0];
      var promises = [];
      var github = GitHubUsers().where({user_id: id})
      .then(function(ghResults) {
        userObject['github'] = ghResults[0];
      });
      promises.push(github);
      Promise.all(promises).then(function() {
        done(null, userObject);
      });
    } else {
      done(null, false);
    }
  });
});

// passport.use(new LocalStrategy( {
//   usernameField: 'email',
//   },
//   function(email, password, done) {
//     knex('users').where({email: email}).select()
//     .then(function(results) {
//       if(results.length !== 0) {
//         helpers.checkPassword(password, results[0].password)
//         .then(function() {
//           console.log(results);
//           return done(null, results[0]);
//
//         })
//         .catch(function(err) {
//           return done(err);
//         });
//       } else {
//         return done(null, false, { message: 'Incorrect username.'});
//       }
//     })
//     .catch(function(err) {
//       return done(err);
//     });
//   }
// ));
module.exports = passport;
