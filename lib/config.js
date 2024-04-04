//ganti nama filenya jadi config.js
const LocalStrategy = require('passport-local').Strategy;
const { getHashedPassword } = require('./functions');
const fs = require('fs')
let User;

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        async(username, password, done) => {
            const data = fs.readFileSync('./database/database.json')
            User = JSON.parse(data)
            let hashed = getHashedPassword(password)
            let userIndex = User.findIndex((user) => user.username === username && hashed === user.password)
            if (userIndex === -1) {
                return done(null, false, {
                    message: `<div class="alert alert-danger">
                  <button type="button" aria-hidden="true" class="close" data-dismiss="alert" aria-label="Close">
                    <i class="tim-icons icon-simple-remove"></i>
                  </button>
                  <span><b> Username or password not found </span>
                </div>`,
                })
            } else {
                return done(null, User[userIndex]);
            }
        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
          const user = User.find(user => user.id === id);
          done(null, user);
      });
}