AddPassportFeatures = (passport, User) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) =>  {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = AddPassportFeatures;