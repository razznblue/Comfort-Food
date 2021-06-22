const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const addStrategy = (passport, User) => {
    passport.use(new localStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: "User Does not Exist. Incorrect Login Credentials." }); }
    
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) { return done(err); }
                if (res === false) { return done(null, false, { message: "Incorrect Password." }) }
    
                return done(null, user);
            });
        })
    }));
}

module.exports = addStrategy;