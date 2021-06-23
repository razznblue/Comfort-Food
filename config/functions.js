const functions = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) { req.isLogged = true; return next(); }
        res.redirect("/login");
    },
    isLoggedOut(req, res, next) {
        if (!req.isAuthenticated()) { req.isLogged = false; return next(); }
        res.redirect("/");
    }
}

module.exports = functions;